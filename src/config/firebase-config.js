// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOzCk3h9A57KR4bY5edGEjBDGzCkoZio0",
  authDomain: "expense-tracker-a906a.firebaseapp.com",
  projectId: "expense-tracker-a906a",
  storageBucket: "expense-tracker-a906a.appspot.com",
  messagingSenderId: "72299693967",
  appId: "1:72299693967:web:66be6c90beba9940f1adfa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;
