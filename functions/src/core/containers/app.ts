import * as express from 'express';
import * as bearer from 'express-bearer-token';
import * as cors from 'cors';
import notFoundHandler from '../errors/page-not-found-error';
import errorHandler from '../middleware/error-handler';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(bearer());
// TODO: Configure cors
app.use(cors({ origin: true }));

app.use(routes);

app.use((req, _res, next) => {
  console.log('Not found', req.url);
  next(notFoundHandler);
});

app.use(errorHandler);

export default app;
