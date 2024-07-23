// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "property-navigator-87cae.firebaseapp.com",
  projectId: "property-navigator-87cae",
  storageBucket: "property-navigator-87cae.appspot.com",
  messagingSenderId: "437964873905",
  appId: "1:437964873905:web:3ee9d9744ba2946092c290",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
