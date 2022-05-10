import express from 'express';
import { getConfiguration, notFound, postUser } from './controllers';
import makeExpressCallback from './adapters/expressCallback';

const router = express.Router({
  strict: true,
});
router.get('/', (req, res) => {
  res.send('Welcome to the REST API of bookingster app.');
});
router.get('/configuration', makeExpressCallback(getConfiguration));
router.post('/user', makeExpressCallback(postUser));

const app = express();
app.use(express.json());
app.use('/bookingster/api', router);
app.use(makeExpressCallback(notFound));
app.listen(3000, () => {
  console.log('Bookingster REST API setup done, listening on port 3000');
});

export default app;
