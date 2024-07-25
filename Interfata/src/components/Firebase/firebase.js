import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, push, update, ref, child, get } from "firebase/database"
import {doc, setDoc, collection} from "firebase/firestore"
import{getAuth} from "firebase/auth";

const firebaseConfig = {

    apiKey: "AIzaSyBXWn6PpdafKy5nGa0vEAqvW9szaSKXuyk",

    authDomain: "inregistrare-utilizatori-83d29.firebaseapp.com",

    projectId: "inregistrare-utilizatori-83d29",

    storageBucket: "inregistrare-utilizatori-83d29.appspot.com",

    messagingSenderId: "1055621457171",

    appId: "1:1055621457171:web:69926d5b7563822f95a6e6",

    measurementId: "G-S5YXW7HWP5"

};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);

const analytics = getAnalytics(app);

export { ref, child, get, push, update, getDatabase, doc, setDoc, collection };