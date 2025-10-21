// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdvKgLTypxjd5DSI4MW3TexcCFFaBwBy8",
  authDomain: "bps-social.firebaseapp.com",
  projectId: "bps-social",
  storageBucket: "bps-social.firebasestorage.app",
  messagingSenderId: "802082766493",
  appId: "1:802082766493:web:caed380bdbdfb68414de74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, signInAnonymously, onAuthStateChanged, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, ref, uploadBytes, getDownloadURL };

