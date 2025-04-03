// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJmFRWp-t52Ci6NvpWjTKqCPsj5xYab_E",
  authDomain: "wassceanalyzer.firebaseapp.com",
  projectId: "wassceanalyzer",
  storageBucket: "wassceanalyzer.firebasestorage.app",
  messagingSenderId: "688512028435",
  appId: "1:688512028435:web:332f1910668fc3f1f394e6",
  measurementId: "G-LYZ2WWEQMM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;
