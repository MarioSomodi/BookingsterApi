import makeExportConfiguration from './configuration/exportConfiguration';
import makeCreateUser from './user/createUser';
import { configurationDb, userCollection, CRUDDb } from '../data-access';

const exportConfiguration = makeExportConfiguration({ configurationDb });
const createUser = makeCreateUser({
  userCollection,
  CRUDDb,
});

export { exportConfiguration, createUser };
