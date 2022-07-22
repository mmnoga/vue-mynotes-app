import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVBOpUB26Wh6qKIZDRWAt_Kj-Gel1ATVc",
  authDomain: "mynotes-828b5.firebaseapp.com",
  projectId: "mynotes-828b5",
  storageBucket: "mynotes-828b5.appspot.com",
  messagingSenderId: "556964037890",
  appId: "1:556964037890:web:b56c6f7c777e5137c06e1b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
