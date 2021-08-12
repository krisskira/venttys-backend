import {
  auth,
  credential,
  firestore,
  initializeApp,
  ServiceAccount,
} from "firebase-admin";

import * as serviceAccount from "./quickstartsample-opvsxj-5d9f20ff1907.json";

const app = initializeApp({
  credential: credential.cert(serviceAccount as ServiceAccount),
});

export const firebaseDB = firestore(app);
export const firebaseAuth: auth.Auth = auth(app);
export type UserRecord = auth.UpdateRequest;
