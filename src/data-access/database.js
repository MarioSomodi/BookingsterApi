import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from './firebaseServiceAccount.json';

const getDb = () => {
  initializeApp({
    credential: cert(serviceAccount),
  });
  return getFirestore();
};

export { getDb };
