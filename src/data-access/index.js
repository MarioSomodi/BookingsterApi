import makeConfigurationDb from './configuration/configurationDb';
import makeCRUDDb from './CRUD/CRUDDb';
import { getDb } from './database';

const db = getDb();

const configurationCollection = db.collection('configuration');
const usersCollection = db.collection('users');
const establishmentsCollection = db.collection('establishments');
const logsCollection = db.collection('logs');

const configurationDb = makeConfigurationDb({ configurationCollection });
const CRUDDb = makeCRUDDb();

export {
  configurationDb,
  usersCollection,
  CRUDDb,
  establishmentsCollection,
  logsCollection,
};
