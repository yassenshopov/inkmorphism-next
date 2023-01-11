import firebase from "firebase/app";
import { FirebaseOptions, getApp, initializeApp } from "firebase/app";

const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

function createFirebaseApp(creds) {
    try {
      return getApp();
    } catch {
      return initializeApp(creds);
    }
  }
  
const app = createFirebaseApp(clientCredentials);

export default app;