import { FirestoreRepo } from '../repo/firestore-repo';
import { DtoFactory } from '../types/types';

export default abstract class FirestoreService {
  constructor(protected repo: FirestoreRepo) {}

  /**
   * Filter and create new data
   *
   * @param data
   * @param createDtoFactory
   * @returns
   */
  async createFirestore<CreateDto>(
    data: any,
    createDtoFactory: DtoFactory<CreateDto>
  ) {
    return this.repo.createFirestore(createDtoFactory(data));
  }

  /**
   * Filter and update with new data
   *
   * @param id
   * @param data
   * @param updateDtoFactory
   * @returns
   */
  async updateFirestore<UpdateDto>(
    id: string,
    data: any,
    updateDtoFactory: DtoFactory<UpdateDto>
  ) {
    return this.repo.updateFirestore(id, updateDtoFactory(data));
  }
}
