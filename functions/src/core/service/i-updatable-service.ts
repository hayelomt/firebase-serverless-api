export interface IUpdatableService<UpdateDto> {
  update(id: string, data: UpdateDto): Promise<any>;
}
