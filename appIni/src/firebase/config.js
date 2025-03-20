import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyBGMj0wtk_qvRrK4qL8JkyZlLMIVo-kl9g",
    authDomain: "projeto-1-4d5b5.firebaseapp.com",
    projectId: "projeto-1-4d5b5",
    storageBucket: "projeto-1-4d5b5.firebasestorage.app",
    messagingSenderId: "783114605160",
    appId: "1:783114605160:web:6d2a4a50b10216ebc0a1dd"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const db = getFirestore(app);
