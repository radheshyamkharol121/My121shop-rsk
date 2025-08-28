// src/firebase.js
// हिंदी: Firebase की settings यहाँ आएंगी, Auth और Firestore initialize करेंगे।

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ⚠️ अपनी Firebase Config यहां डालना
const firebaseConfig = {
  apiKey: "आपकी_API_KEY",
  authDomain: "आपका_PROJECT_ID.firebaseapp.com",
  projectId: "आपका_PROJECT_ID",
  storageBucket: "आपका_PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);