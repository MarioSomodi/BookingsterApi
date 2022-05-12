import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import serviceAccount from './firebaseServiceAccount.json';

initializeApp({
  credential: cert(serviceAccount),
});

const getDb = () => {
  return getFirestore();
};

const getAuthentication = () => {
  return getAuth();
};

export { getDb, getAuthentication };
