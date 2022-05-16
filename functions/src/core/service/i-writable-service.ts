import { Model } from '../model';

export interface IWritableService<CreateDto> {
  create(data: any): Promise<CreateDto & Model>;
}
