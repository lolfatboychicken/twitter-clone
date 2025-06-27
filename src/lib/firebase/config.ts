import type { FirebaseOptions } from 'firebase/app';

const config: FirebaseOptions = {
  apiKey: 'AIzaSyD_hz1uDLweZyF2vdH5_XIjH5AE3MheO80',
  authDomain: 'hhhmhvn.firebaseapp.com',
  projectId: 'hhhmhvn',
  storageBucket: 'hhhmhvn.appspot.com',
  messagingSenderId: '699200122926',
  appId: '699200122926:web:920be98a6cd547999f6fbf',
  measurementId: 'G-XBWRH9KKG7' // optional; remove this line if you do not use analytics
};

export function getFirebaseConfig(): FirebaseOptions {
  const requiredKeys: (keyof FirebaseOptions)[] = [
    'apiKey',
    'authDomain',
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId'
  ];
  for (const key of requiredKeys) {
    if (!config[key]) {
      throw new Error(`Firebase config is missing required key: ${key}`);
    }
  }
  return config;
}
