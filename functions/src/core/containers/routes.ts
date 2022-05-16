import { Router } from 'express';
import authRoutes from '../../features/auth/auth.routes';
import venueRoutes from '../../features/venue/venue.routes';
import testRoutes from '../../features/test.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/venues', venueRoutes);
routes.use('/test', testRoutes);

export default routes;
