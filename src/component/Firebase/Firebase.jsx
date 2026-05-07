// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDI8X9ofrRBnLVHeCEgCH2zajk_h7qnX3Y",
  authDomain: "pawmart-shop-aafc4.firebaseapp.com",
  projectId: "pawmart-shop-aafc4",
  storageBucket: "pawmart-shop-aafc4.firebasestorage.app",
  messagingSenderId: "383488140201",
  appId: "1:383488140201:web:b358b4aac1defecbd7dab8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);