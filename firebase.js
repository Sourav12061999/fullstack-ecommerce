import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getApp, getApps } from "@firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeLyohh4F9yfgcsfsRpHIg8baxH6e6nf0",
  authDomain: "fir-tut-330511.firebaseapp.com",
  projectId: "firebase-tut-330511",
  storageBucket: "firebase-tut-330511.appspot.com",
  messagingSenderId: "244361504672",
  appId: "1:244361504672:web:eb65c62f1e508072aa66c5",
  measurementId: "G-46920XH34G",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
export { db };
