import makeExportConfiguration from './configuration/exportConfiguration';
import makeCreateUser from './user/createUser';
import makeListEstablishments from './establishment/listEstablishment';
import makeCreateEstablishment from './establishment/createEstablishment';
import makeFetchOwnersEstablishments from './establishment/fetchOwnersEstablishments';
import {
  configurationDb,
  usersCollection,
  CRUDDb,
  establishmentsCollection,
  establishmentsTablesCollection,
  authenticationActions,
  storageActions,
  usersReservationsCollection,
} from '../data-access';
import makeFetchUserInfo from './user/fetchUserInfo';
import makeAddReservation from './reservation/addReservation';

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
  establishmentsTablesCollection,
});

const fetchOwnersEstablishments = makeFetchOwnersEstablishments({
  establishmentsCollection,
  CRUDDb,
  usersReservationsCollection,
  establishmentsTablesCollection,
});

const createEstablishment = makeCreateEstablishment({
  establishmentsCollection,
  establishmentsTablesCollection,
  CRUDDb,
  storageActions,
  usersCollection,
});

const addReservation = makeAddReservation({
  CRUDDb,
  establishmentsTablesCollection,
  usersReservationsCollection,
  establishmentsCollection,
});

export {
  addReservation,
  exportConfiguration,
  fetchUserInfo,
  createUser,
  fetchOwnersEstablishments,
  listEstablishment,
  createEstablishment,
};
