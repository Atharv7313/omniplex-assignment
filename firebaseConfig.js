import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Firebase Config
export const firebaseConfig = {
 apiKey: "AIzaSyCpgMQXE6DiTYY8uVM-kvLvquvNEViYd60",
  authDomain: "omniplex-b4704.firebaseapp.com",
  projectId: "omniplex-b4704",
  storageBucket: "omniplex-b4704.firebasestorage.app",
  messagingSenderId: "263715858679",
  appId: "1:263715858679:web:0410815c69557b33c24bf2",
  measurementId: "",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

export const initializeFirebase = () => {
  return app;
};
