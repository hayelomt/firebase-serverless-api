import { Router } from 'express';
import { isAuthenticated } from '../../core/middleware/auth-middleware';
import { checkUserType } from '../../core/middleware/check-user-type-middleware';
import validationHandler from '../../core/middleware/validation-handler';
import { UserType } from '../../core/types/enums';
import createVenueVal from './val/create-venue.val';
import updateVenueVal from './val/update-venue.val';
import VenueController from './venue.controller';

const venueRoutes = Router();
const eventController = new VenueController();

venueRoutes.post(
  '/',
  isAuthenticated,
  checkUserType([UserType.Admin]),
  validationHandler(createVenueVal),
  eventController.create()
);

venueRoutes.patch(
  '/:id',
  isAuthenticated,
  checkUserType([UserType.Admin]),
  validationHandler(updateVenueVal),
  eventController.update()
);

export default venueRoutes;
