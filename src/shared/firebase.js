import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAi5XCiOEpOs3ayfF49EIwrK1eSA4piCCw",
    authDomain: "authex-e7ceb.firebaseapp.com",
    projectId: "authex-e7ceb",
    storageBucket: "authex-e7ceb.appspot.com",
    messagingSenderId: "559650335850",
    appId: "1:559650335850:web:16f6a4752944aa4975ee13",
    measurementId: "G-374VQEGNF3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;