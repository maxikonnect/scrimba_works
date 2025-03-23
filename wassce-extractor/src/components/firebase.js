// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQTTqqMQHXZTlh8GPGxXjqrFeC6Pv9WIQ",
  authDomain: "wassce-analyzer.firebaseapp.com",
  projectId: "wassce-analyzer",
  storageBucket: "wassce-analyzer.firebasestorage.app",
  messagingSenderId: "617879865351",
  appId: "1:617879865351:web:eeb6d05057a0647c2842a2",
  measurementId: "G-3WEVBSR2R1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;
