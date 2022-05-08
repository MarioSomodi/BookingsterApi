import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "./firebaseServiceAccount.json";

export default function getDb() {
  initializeApp({
    credential: cert(serviceAccount),
  });
  return getFirestore();
}
