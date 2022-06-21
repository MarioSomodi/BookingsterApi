import notFound from './notFound';
import {
  exportConfiguration,
  createUser,
  listEstablishment,
  createEstablishment,
  fetchUserInfo,
} from '../use-cases';
import makeGetConfiguration from './configuration/getConfiguration';
import makePostUser from './user/postUser';
import makeGetEstablishments from './establishment/getEstablishments';
import makePostEstablishment from './establishment/postEstablishment';
import makeGetUser from './user/getUser';

const getConfiguration = makeGetConfiguration({ exportConfiguration });
const postUser = makePostUser({ createUser });
const getUser = makeGetUser({ fetchUserInfo });
const getEstablishments = makeGetEstablishments({ listEstablishment });
const postEstablishment = makePostEstablishment({ createEstablishment });

export {
  getConfiguration,
  getUser,
  notFound,
  postUser,
  getEstablishments,
  postEstablishment,
};
