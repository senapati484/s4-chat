// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBqUc5yjE7iQwZ2s6qqv1INmel9GDkpx_0",
    authDomain: "s4-chat-9eb3d.firebaseapp.com",
    databaseURL: "https://s4-chat-9eb3d-default-rtdb.firebaseio.com",
    projectId: "s4-chat-9eb3d",
    storageBucket: "s4-chat-9eb3d.firebasestorage.app",
    messagingSenderId: "397716231479",
    appId: "1:397716231479:web:7278c4c0ee3212429476b2",
    measurementId: "G-NJEV66YH1F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);