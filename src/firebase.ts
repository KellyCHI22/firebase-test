// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD1Ej_e1mCsj5kkqR6up145geJxx_dNz6s',
  authDomain: 'fir-test-8f52c.firebaseapp.com',
  projectId: 'fir-test-8f52c',
  storageBucket: 'fir-test-8f52c.appspot.com',
  messagingSenderId: '353390848974',
  appId: '1:353390848974:web:a822b07def76d1a95e199f',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
