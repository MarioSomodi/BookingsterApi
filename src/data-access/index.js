import makeConfigurationDb from './configuration/configurationDb';
import makeCRUDDb from './CRUD/CRUDDb';
import { getDb, getAuthentication, bucket } from './database';
import makeAuthenticationActions from './authentication/authenticationActions';
import makeStorageActions from './storage/storageActions';

const db = getDb();

const configurationCollection = db.collection('configuration');
const usersCollection = db.collection('users');
const establishmentsCollection = db.collection('establishments');
const logsCollection = db.collection('logs');
const establishmentsTablesCollection = db.collection('establishmentsTables');
const usersReservationsCollection = db.collection('usersReservations');

const configurationDb = makeConfigurationDb({ configurationCollection });
const CRUDDb = makeCRUDDb();
const authenticationActions = makeAuthenticationActions({
  auth: getAuthentication(),
});
const storageActions = makeStorageActions({ bucket });

export {
  storageActions,
  establishmentsTablesCollection,
  usersReservationsCollection,
  configurationDb,
  authenticationActions,
  usersCollection,
  CRUDDb,
  establishmentsCollection,
  logsCollection,
};
