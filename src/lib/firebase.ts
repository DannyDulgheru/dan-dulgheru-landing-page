
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTauUhNkURS_IqyFqpSD-3tcipjP2FH-w",
  authDomain: "dandulgheru-e5fcc.firebaseapp.com",
  projectId: "dandulgheru-e5fcc",
  storageBucket: "dandulgheru-e5fcc.firebasestorage.app",
  messagingSenderId: "1088387489759",
  appId: "1:1088387489759:web:fb0c67f2bb9c2c11b62e6a",
  measurementId: "G-1PRDDP9K6Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };
