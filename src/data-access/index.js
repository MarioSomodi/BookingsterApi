import makeConfigurationDb from './configuration/configurationDb';
import makeCRUDDb from './CRUD/CRUDDb';
import { getDb, getAuthentication } from './database';
import makeAuthActions from './users/authActions';

const db = getDb();

const configurationCollection = db.collection('configuration');
const usersCollection = db.collection('users');
const establishmentsCollection = db.collection('establishments');
const logsCollection = db.collection('logs');

const configurationDb = makeConfigurationDb({ configurationCollection });
const CRUDDb = makeCRUDDb();
const authActions = makeAuthActions({ auth: getAuthentication() });

export {
  configurationDb,
  authActions,
  usersCollection,
  CRUDDb,
  establishmentsCollection,
  logsCollection,
};
