import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCuhp-XKUF9D1IZ2xUIL-j0wrsXBVsvngc",
    authDomain: "registration-hwm2.firebaseapp.com",
    projectId: "registration-hwm2",
    storageBucket: "registration-hwm2.firebasestorage.app",
    messagingSenderId: "16926693040",
    appId: "1:16926693040:web:96353d8d8f0c5907fecd75",
    measurementId: "G-Y637R1279R"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
