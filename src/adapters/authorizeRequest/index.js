import dotenv from 'dotenv';
import { getAuthentication } from '../../data-access/database';

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

export default authorizeRequest;
