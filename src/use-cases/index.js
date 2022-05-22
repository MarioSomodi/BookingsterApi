import makeExportConfiguration from './configuration/exportConfiguration';
import makeCreateUser from './user/createUser';
import { configurationDb, usersCollection, CRUDDb } from '../data-access';

const exportConfiguration = makeExportConfiguration({ configurationDb });
const createUser = makeCreateUser({
  usersCollection,
  CRUDDb,
});

export { exportConfiguration, createUser };
