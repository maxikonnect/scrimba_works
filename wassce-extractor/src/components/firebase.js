// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKI7xAmxKZ9EjOh7UDP_l_-jdYG5DCd4g",
  authDomain: "wassce-e030e.firebaseapp.com",
  projectId: "wassce-e030e",
  storageBucket: "wassce-e030e.firebasestorage.app",
  messagingSenderId: "623701421371",
  appId: "1:623701421371:web:29df20276b36312f245b1e",
  measurementId: "G-P8C6JKKDWZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;
