// import { Repo } from '../repo/rtdb-repo';
// import { DtoFactory } from '../types/types';

// export default abstract class Service {
// constructor(protected repo: Repo) {}
// async createRtdb<Dto>(createRequestData: any, dtoFactory: DtoFactory<Dto>) {
//   const filteredData = dtoFactory(createRequestData);
//   return this.repo.createRtdb(filteredData);
// }
// async updateRtdb<Dto>(
//   id: string,
//   updateRequestData: any,
//   dtoFactory: DtoFactory<Dto>
// ) {
//   const filteredData = dtoFactory(updateRequestData);
//   return this.repo.updateRtdb(id, filteredData);
// }
// }
