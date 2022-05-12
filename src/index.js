import express from 'express';
import { getConfiguration, notFound, postUser, postAdmin } from './controllers';
import makeExpressCallback from './adapters/expressCallback';
import { getAuthentication } from './data-access/database';

const auth = getAuthentication();

const authorizeRequest = (req, res, next) => {
  var token =
    req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (!token) {
    res.status(401).send({ erorr: 'Autorizacijski header nije postavljen' });
    return;
  }
  auth
    .verifyIdToken(token)
    .then((claims) => {
      if (req.originalUrl.includes('admin')) {
        if (claims.admin === true) next();
        else
          res.status(403).send({
            erorr: 'Pristup administracijskom dijelu api-a nije dozvoljen',
          });
      } else {
        next();
      }
    })
    .catch((error) => {
      res.status(401).send({ erorr: 'Autorizacijski token je neispravan' });
      console.log(error.message);
    });
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
app.post('/bookingster/appointAdminClaim', makeExpressCallback(postAdmin));
app.use('/bookingster/api', authorizeRequest, userRouter);
app.use('/bookingster/admin', authorizeRequest, adminRouter);
app.use(makeExpressCallback(notFound));
app.listen(3000, () => {
  console.log('Bookingster REST API setup done, listening on port 3000');
});

export default app;
