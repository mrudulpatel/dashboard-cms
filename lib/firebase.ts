// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpxoJV-FlIXAi4zgZvXlEFuHgl0qePhdQ",
  authDomain: "sundeep-and-company-admin.firebaseapp.com",
  projectId: "sundeep-and-company-admin",
  storageBucket: "sundeep-and-company-admin.appspot.com",
  messagingSenderId: "678632389766",
  appId: "1:678632389766:web:077ed99b36cc935cdfe507",
  measurementId: "G-62ZXZLHF64",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { db, storage };
