import notFound from './notFound';
import {
  exportConfiguration,
  createUser,
  listEstablishment,
  createEstablishment,
} from '../use-cases';
import makeGetConfiguration from './configuration/getConfiguration';
import makePostUser from './user/postUser';
import makeGetEstablishments from './establishment/getEstablishments';
import makePostEstablishment from './establishment/postEstablishment';

const getConfiguration = makeGetConfiguration({ exportConfiguration });
const postUser = makePostUser({ createUser });
const getEstablishments = makeGetEstablishments({ listEstablishment });
const postEstablishment = makePostEstablishment({ createEstablishment });

export {
  getConfiguration,
  notFound,
  postUser,
  getEstablishments,
  postEstablishment,
};
