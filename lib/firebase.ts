import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCU3qaS_d7wvnSKQ3XTJIUwQVJ8VjL5c-I",
  authDomain: "internshipprogram-3963a.firebaseapp.com",
  projectId: "internshipprogram-3963a",
  storageBucket: "internshipprogram-3963a.appspot.com",
  messagingSenderId: "818007050620",
  appId: "1:818007050620:web:e40760070c565131eb3cf9",
  measurementId: "G-5RHC2X77W3"
};

// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);

let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, db, auth, analytics };

