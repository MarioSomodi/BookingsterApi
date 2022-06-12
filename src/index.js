import express from 'express';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import {
  getConfiguration,
  notFound,
  postUser,
  getEstablishments,
  postEstablishment,
} from './controllers';
import makeExpressCallback from './adapters/expressCallback';
import { getAuthentication } from './data-access/database';
import swaggerDocumentation from '../swagger.json';

dotenv.config();

const auth = getAuthentication();

const authorizeRequest = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    res
      .status(401)
      .send({ errorMessage: 'Autorizacijski header nije postavljen' });
    return;
  }
  if (req.originalUrl.includes('admin')) {
    if (process.env.ADMIN_TOKEN === token) next();
    else {
      res.status(403).send({
        errorMessage: 'Pristup administracijskom dijelu api-a nije dozvoljen',
      });
    }
  } else {
    auth
      .verifyIdToken(token)
      .then(() => next())
      .catch(() => {
        if (process.env.ADMIN_TOKEN === token) next();
        else {
          res.status(401).send({
            errorMessage: 'Autorizacijski token je neispravan',
          });
        }
      });
  }
};
const userRouter = express.Router({
  strict: true,
});
userRouter.get('/', (req, res) => {
  res.send('Welcome to the REST API of bookingster app.');
});
userRouter.get('/establishments', makeExpressCallback(getEstablishments));
userRouter.post('/establishments', makeExpressCallback(postEstablishment));

const adminRouter = express.Router({
  strict: true,
});
adminRouter.get('/configuration', makeExpressCallback(getConfiguration));
adminRouter.post('/user', makeExpressCallback(postUser));

const app = express();
app.use(express.json());
app.use('/bookingster/api', authorizeRequest, userRouter);
app.use('/bookingster/admin', authorizeRequest, adminRouter);
app.use(
  '/bookingster/docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocumentation)
);
app.use(makeExpressCallback(notFound));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Bookingster REST API setup done, listening on port ${PORT}`);
});

export default app;
