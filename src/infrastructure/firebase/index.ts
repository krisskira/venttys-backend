import { credential, firestore, initializeApp } from "firebase-admin";

const serviceAccount = require("./quickstartsample-opvsxj-5d9f20ff1907.json");

const app = initializeApp({
    credential: credential.cert(serviceAccount),
});

export const firebaseDB = firestore(app);
