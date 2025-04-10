
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZQbwC0xGmCtE8vodxEFg07yJdQvpncMo",
  authDomain: "synq-tech-empire.firebaseapp.com",
  projectId: "synq-tech-empire",
  storageBucket: "synq-tech-empire.appspot.com",
  messagingSenderId: "635279332133",
  appId: "1:635279332133:web:b6bfc0cceb39e9b6df5e69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
