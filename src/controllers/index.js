import notFound from './notFound';
import {
  exportConfiguration,
  createUser,
  listEstablishment,
} from '../use-cases';
import makeGetConfiguration from './configuration/getConfiguration';
import makePostUser from './user/postUser';
import makeGetEstablishments from './establishment/getEstablishments';

const getConfiguration = makeGetConfiguration({ exportConfiguration });
const postUser = makePostUser({ createUser });
const getEstablishments = makeGetEstablishments({ listEstablishment });

export { getConfiguration, notFound, postUser, getEstablishments };
