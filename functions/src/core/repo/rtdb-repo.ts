// import * as dateUtils from '../util/date-utils';
// import { database } from 'firebase-admin';
// import ResourceNotFoundError from '../errors/resource-not-found-error';
// import { rtdb } from '../firebase';
// import { TransactionUpdate } from '../types/types';

// export class Repo {
//   constructor(
//     protected rtdbRef: database.Reference,
//     protected modelName: string = 'Resource'
//   ) {}

//   async createRtdb<CreateDto>(newData: CreateDto) {
//     const newDataRef = this.rtdbRef.push();
//     const currentTime = dateUtils.getDateTimeNow();

//     const createData = {
//       ...newData,
//       id: newDataRef.key as string,
//       createdAt: currentTime,
//       updatedAt: currentTime,
//     };
//     await newDataRef.set(createData);

//     return createData;
//   }

//   async setChild(id: string) {
//     this.rtdbRef = this.rtdbRef.child(id);
//   }

//   async updateRtdb<UpdateDto>(id: string, updateData: Partial<UpdateDto>) {
//     const existingData = await this.findOneRtdb(id);
//     const data = {
//       ...existingData,
//       ...updateData,
//       updatedAt: dateUtils.getDateTimeNow(),
//     };
//     await this.rtdbRef.child(id).update(data);

//     return data;
//   }

//   async findOneRtdb(id: string) {
//     const data = await this.rtdbRef.child(id).once('value');

//     if (!data.exists()) {
//       throw new ResourceNotFoundError(`${this.modelName} not found`);
//     }
//     return data.val();
//   }

//   async transactionUpdate(updates: TransactionUpdate) {
//     await rtdb.ref('/').update(updates);
//   }
// }
