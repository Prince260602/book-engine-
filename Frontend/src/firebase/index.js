// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFZ4MIRRdV0sFT-5csVu0fAWcgQI71Aa8",
  authDomain: "ebook-generator-387fa.firebaseapp.com",
  projectId: "ebook-generator-387fa",
  storageBucket: "ebook-generator-387fa.appspot.com",
  messagingSenderId: "165143967856",
  appId: "1:165143967856:web:c19768b1c3bc2caa569cb5",
  measurementId: "G-HGW46Q164X",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
