import express from 'express';
import { getConfiguration, notFound, postUser } from './controllers';
import makeExpressCallback from './adapters/expressCallback';
import { getAuthentication } from './data-access/database';
import dotenv from 'dotenv';

dotenv.config();

const auth = getAuthentication();

const authorizeRequest = (req, res, next) => {
  var token =
    req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (!token) {
    res.status(401).send({ erorr: 'Autorizacijski header nije postavljen' });
    return;
  }
  if (req.originalUrl.includes('admin')) {
    if (process.env.ADMIN_TOKEN == token) next();
    else
      res.status(403).send({
        erorr: 'Pristup administracijskom dijelu api-a nije dozvoljen',
      });
  } else {
    auth
      .verifyIdToken(token)
      .then((claims) => {
        next();
      })
      .catch((error) => {
        res.status(401).send({ erorr: 'Autorizacijski token je neispravan' });
        console.log(error.message);
      });
  }
};

const userRouter = express.Router({
  strict: true,
});
userRouter.get('/', (req, res) => {
  res.send('Welcome to the REST API of bookingster app.');
});
userRouter.post('/user', makeExpressCallback(postUser));

const adminRouter = express.Router({
  strict: true,
});
adminRouter.get('/configuration', makeExpressCallback(getConfiguration));

const app = express();
app.use(express.json());
app.use('/bookingster/api', authorizeRequest, userRouter);
app.use('/bookingster/admin', authorizeRequest, adminRouter);
app.use(makeExpressCallback(notFound));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Bookingster REST API setup done, listening on port ${PORT}`);
});

export default app;
