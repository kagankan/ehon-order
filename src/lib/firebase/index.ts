// import { getAnalytics } from "firebase/analytics";
import { connectorConfig } from "@firebasegen/default-connector";
import { getApps, initializeApp } from "firebase/app";
import { getDataConnect } from "firebase/data-connect";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MEASUREMENT_ID,
} from "./env";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage();
export const dataConnect = getDataConnect(app, connectorConfig);
