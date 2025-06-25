// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCD1atx9jXA--gElRFtuUzwKoPuHSBsUJw",
  authDomain: "stayfinder-1e3dd.firebaseapp.com",
  projectId: "stayfinder-1e3dd",
  storageBucket: "stayfinder-1e3dd.firebasestorage.app",
  messagingSenderId: "896683389521",
  appId: "1:896683389521:web:eb11285068b9f0706efe70",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
