import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, type Auth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, type Firestore } from 'firebase/firestore';
import { getStorage, connectStorageEmulator, type FirebaseStorage } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator, type Functions } from 'firebase/functions';
import { isUsingEmulator } from '@lib/env';
import { getFirebaseConfig } from './config';

type Firebase = {
  auth: Auth;
  storage: FirebaseStorage;
  firestore: Firestore;
  functions: Functions;
  firebaseApp: FirebaseApp;
};

function initialize(): Firebase {
  const firebaseApp = initializeApp(getFirebaseConfig());
  const auth = getAuth(firebaseApp);
  const storage = getStorage(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  const functions = getFunctions(firebaseApp);
  return { firebaseApp, auth, firestore, storage, functions };
}

function connectToEmulator(firebase: Firebase): Firebase {
  connectAuthEmulator(firebase.auth, 'http://localhost:9099', { disableWarnings: true });
  connectStorageEmulator(firebase.storage, 'localhost', 9199);
  connectFirestoreEmulator(firebase.firestore, 'localhost', 8080);
  connectFunctionsEmulator(firebase.functions, 'localhost', 5001);
  return firebase;
}

export function getFirebase(): Firebase {
  const firebase = initialize();
  if (isUsingEmulator) return connectToEmulator(firebase);
  return firebase;
}

export const { firestore: db, auth, storage } = getFirebase();
