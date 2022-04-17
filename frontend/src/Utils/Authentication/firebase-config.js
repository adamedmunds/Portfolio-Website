import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'auth.adamedmunds.dev',
  projectId: 'portfolio-pokedex',
  storageBucket: 'portfolio-pokedex.appspot.com',
  messagingSenderId: '209479522848',
  appId: '1:209479522848:web:ea77ec50d9c653b7a63a45',
  measurementId: 'G-2QNF0N8LQJ',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
