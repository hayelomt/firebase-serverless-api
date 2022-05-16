import { firestore } from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import ResourceNotFoundError from '../errors/resource-not-found-error';
import { Model } from '../model';
import * as dateUtils from '../util/date-utils';
import { removeUndefined } from '../util/utility';

export class FirestoreRepo {
  constructor(
    protected ref: firestore.CollectionReference,
    protected modelName = ''
  ) {}

  async findOne<T extends Model = any>(id: string): Promise<T> {
    const doc = await this.ref.doc(id).get();
    if (!doc.exists) {
      throw new ResourceNotFoundError(`${this.modelName} not found`);
    }

    return { id: doc.id, ...doc.data() } as T;
  }

  async createFirestore<CreateDto>(data: CreateDto) {
    const docRef = this.ref.doc();
    const currentTime = dateUtils.getDateTimeNow();

    const createData = removeUndefined({
      ...data,
      id: docRef.id,
      createdAt: currentTime,
      updatedAt: currentTime,
      cts: FieldValue.serverTimestamp(),
      uts: FieldValue.serverTimestamp(),
    }) as CreateDto & Model;

    await docRef.set(createData);

    return createData;
  }

  async updateFirestore<UpdateDto, T extends Model = any>(
    id: string,
    data: UpdateDto
  ) {
    const item = await this.findOne<T>(id);
    const updateData: UpdateDto & Partial<Model> = {
      ...item,
      ...(removeUndefined(data) as UpdateDto),
      updatedAt: dateUtils.getDateTimeNow(),
      uts: FieldValue.serverTimestamp(),
    };
    await this.ref.doc(id).update(updateData);

    return updateData;
  }
}
