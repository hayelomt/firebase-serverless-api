import { RequestExtended } from '../types/interfaces';
import catchAsync from '../util/catch-async';
import { IWritableService } from '../service/i-writable-service';
import { Response } from 'express';
import { IUpdatableService } from '../service/i-updatable-service';

const createData = <CreateDto>(writerService: IWritableService<CreateDto>) =>
  catchAsync(async (req: RequestExtended, res: Response) => {
    const data = await writerService.create(req.body);

    res.status(201).json({ data });
  });

const updateData = <UpdateDto>(
  updaterService: IUpdatableService<UpdateDto>,
  paramField = 'id'
) =>
  catchAsync(async (req: RequestExtended, res: Response) => {
    const data = await updaterService.update(req.params[paramField], req.body);

    res.status(200).json({ data });
  });

export default {
  createData,
  updateData,
};
