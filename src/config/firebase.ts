
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWO-OJkiMT_MeDuOKK0zsUKaCAFKyw7tM",
  authDomain: "synq-corp.firebaseapp.com",
  projectId: "synq-corp",
  storageBucket: "synq-corp.firebasestorage.app",
  messagingSenderId: "656567212862",
  appId: "1:656567212862:web:d07ef26c7d81acfe7d2a6f",
  measurementId: "G-XMVY6212HC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
