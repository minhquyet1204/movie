// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBInlQdopFenOQ2pAbTmm4O4w4XU3_VnKo",
  authDomain: "movie-112c0.firebaseapp.com",
  projectId: "movie-112c0",
  storageBucket: "movie-112c0.appspot.com",
  messagingSenderId: "651410275371",
  appId: "1:651410275371:web:6b09e1b7d96800eab2fe6e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
