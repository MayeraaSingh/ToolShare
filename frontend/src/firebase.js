// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "tool-share-de5fc.firebaseapp.com",
  projectId: "tool-share-de5fc",
  storageBucket: "tool-share-de5fc.firebasestorage.app",
  messagingSenderId: "405305514253",
  appId: "1:405305514253:web:ebc06c17b3c2a973dd3844"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);