// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChKkz4I20Ock996kTzXL2MtixLEsUhIfs",
  authDomain: "finanzas-personales-d348d.firebaseapp.com",
  projectId: "finanzas-personales-d348d",
  storageBucket: "finanzas-personales-d348d.firebasestorage.app",
  messagingSenderId: "73569342532",
  appId: "1:73569342532:web:69d108ec5db0f2dd4ed811"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); 