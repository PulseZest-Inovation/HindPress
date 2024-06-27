import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD7sWuMmd1AIpn7UO64GOzLKXMvDdDBi2k",
  authDomain: "hindpress-c820f.firebaseapp.com",
  projectId: "hindpress-c820f",
  storageBucket: "hindpress-c820f.appspot.com",
  messagingSenderId: "538656687532",
  appId: "1:538656687532:web:f1b26adc8e2634854b6609",
  measurementId: "G-FTY0NQ9X67"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth  };