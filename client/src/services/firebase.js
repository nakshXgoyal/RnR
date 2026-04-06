import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "roots-n-routes.firebaseapp.com",
  projectId: "roots-n-routes",
  storageBucket: "roots-n-routes.firebasestorage.app",
  messagingSenderId: "268882363865",
  appId: "1:268882363865:web:a6be5f9a100df7f0e845c8",
  measurementId: "G-RT7Q6PNWFS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
