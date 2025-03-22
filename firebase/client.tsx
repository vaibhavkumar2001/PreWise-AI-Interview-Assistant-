// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuCTi3W9F2ZBLvnZyc1MKmb-jBklXtRlU",
  authDomain: "prepwise-cf1b7.firebaseapp.com",
  projectId: "prepwise-cf1b7",
  storageBucket: "prepwise-cf1b7.firebasestorage.app",
  messagingSenderId: "724029770775",
  appId: "1:724029770775:web:35647832dd9284684c2052",
  measurementId: "G-43FRKS05S9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);