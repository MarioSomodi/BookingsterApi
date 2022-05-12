import makeConfigurationDb from './configuration/configurationDb';
import makeCRUDDb from './CRUD/CRUDDB';
import { getDb, getAuthentication } from './database';
import makeUsersDb from './users/usersDb';

const db = getDb();

const configurationCollection = db.collection('configuration');
const usersCollection = db.collection('users');

const configurationDb = makeConfigurationDb({ configurationCollection });
const CRUDDb = makeCRUDDb();
const usersDb = makeUsersDb({ usersCollection, getAuthentication });

export { configurationDb, usersCollection, CRUDDb, usersDb };
