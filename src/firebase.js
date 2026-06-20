import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAwfxw4K-p1XWOCK3xRs3em5TYkbYwi6iQ",
  authDomain: "chat-app-79964.firebaseapp.com",
  databaseURL: "https://chat-app-79964-default-rtdb.firebaseio.com/",
  projectId: "chat-app-79964",
  storageBucket: "chat-app-79964.firebasestorage.app",
  messagingSenderId: "934157928550",
  appId: "1:934157928550:web:9f6dd3a413a6e7da1d05a7",
  measurementId: "G-N61PTE9BVF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;
