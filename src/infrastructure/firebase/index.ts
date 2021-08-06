import { credential, firestore, initializeApp } from "firebase-admin";

import serviceAccount from './quickstartsample-opvsxj-5d9f20ff1907.json';

const app = initializeApp({
  credential: credential.cert(JSON.stringify(serviceAccount)),
});

export const firebaseDB = firestore(app);
