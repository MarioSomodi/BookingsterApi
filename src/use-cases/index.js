import makeExportConfiguration from './configuration/exportConfiguration';
import makeCreateUser from './user/createUser';
import makeListEstablishments from './establishment/listEstablishment';
import makeCreateEstablishment from './establishment/createEstablishment';
import {
  configurationDb,
  usersCollection,
  CRUDDb,
  establishmentsCollection,
  authenticationActions,
  storageActions,
} from '../data-access';
import makeFetchUserInfo from './user/fetchUserInfo';

const exportConfiguration = makeExportConfiguration({ configurationDb });

const createUser = makeCreateUser({
  usersCollection,
  CRUDDb,
  authenticationActions,
});

const fetchUserInfo = makeFetchUserInfo({
  usersCollection,
  CRUDDb,
});

const listEstablishment = makeListEstablishments({
  establishmentsCollection,
  CRUDDb,
});

const createEstablishment = makeCreateEstablishment({
  establishmentsCollection,
  CRUDDb,
  storageActions,
});

export {
  exportConfiguration,
  fetchUserInfo,
  createUser,
  listEstablishment,
  createEstablishment,
};
