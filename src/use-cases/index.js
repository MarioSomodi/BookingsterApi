import makeExportConfiguration from './configuration/exportConfiguration';
import makeCreateUser from './user/createUser';
import makeListEstablishments from './establishment/listEstablishment';
import makeCreateEstablishment from './establishment/createEstablishment';
import {
  configurationDb,
  usersCollection,
  CRUDDb,
  establishmentsCollection,
} from '../data-access';

const exportConfiguration = makeExportConfiguration({ configurationDb });

const createUser = makeCreateUser({
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
});

export {
  exportConfiguration,
  createUser,
  listEstablishment,
  createEstablishment,
};
