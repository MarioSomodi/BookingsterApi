/* eslint-disable node/no-missing-import */
/* eslint-disable import/no-unresolved */
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import serviceAccount from './firebaseServiceAccount.json';

initializeApp({
  credential: cert(serviceAccount),
});

const getDb = () => getFirestore();

const getAuthentication = () => getAuth();

export { getDb, getAuthentication };
