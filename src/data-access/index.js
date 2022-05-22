import makeConfigurationDb from './configuration/configurationDb';
import makeCRUDDb from './CRUD/CRUDDB';
import { getDb } from './database';

const db = getDb();

const configurationCollection = db.collection('configuration');
const usersCollection = db.collection('users');

const configurationDb = makeConfigurationDb({ configurationCollection });
const CRUDDb = makeCRUDDb();

export { configurationDb, usersCollection, CRUDDb };
