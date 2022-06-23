import express from 'express';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import { apiController } from './controllers';
import makeExpressCallback from './adapters/expressCallback';
import swaggerDocumentation from '../swagger.json';
import {
  userAdminRouter,
  establishmentRouter,
  configurationRouter,
} from './routes';
import authorizeRequest from './adapters/authorizeRequest';

dotenv.config();

const app = express();

app.use(express.json({ limit: '50mb' }));

app.use('/bookingster/admin/user', authorizeRequest, userAdminRouter);
app.use(
  '/bookingster/admin/configuration',
  authorizeRequest,
  configurationRouter
);

app.use(
  '/bookingster/api/establishment',
  authorizeRequest,
  establishmentRouter
);
app.use(
  '/bookingster/docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocumentation)
);

app.use(makeExpressCallback(apiController.HandleNotFound));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Bookingster REST API setup done, listening on port ${PORT}`);
});

export default app;
