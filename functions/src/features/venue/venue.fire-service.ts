import { firestore } from '../../core/firebase';
import { Model } from '../../core/model';
import { FirestoreRepo } from '../../core/repo/firestore-repo';
import FirestoreService from '../../core/service/firestore-service';
import { IUpdatableService } from '../../core/service/i-updatable-service';
import { IWritableService } from '../../core/service/i-writable-service';
import { CreateVenueDto, createVenueDtoFactory } from './dto/create-venue.dto';
import { UpdateVenueDto, updateVenueDtoFactory } from './dto/update-venue.dto';

export default class VenueFireService
  extends FirestoreService
  implements
    IWritableService<CreateVenueDto>,
    IUpdatableService<UpdateVenueDto>
{
  constructor() {
    super(new FirestoreRepo(firestore.collection('venues'), 'Venue'));
  }

  create(data: any): Promise<CreateVenueDto & Model> {
    return this.createFirestore(data, createVenueDtoFactory);
  }

  update(id: string, data: UpdateVenueDto): Promise<any> {
    return this.updateFirestore(id, data, updateVenueDtoFactory);
  }
}
