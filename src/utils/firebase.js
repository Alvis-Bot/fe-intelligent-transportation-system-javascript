// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {onAuthStateChanged} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDoaMkk0TFAy0WuNunJbHb47duVPFzAjlw",
    authDomain: "giao-thong-thong-minh.firebaseapp.com",
    projectId: "giao-thong-thong-minh",
    storageBucket: "giao-thong-thong-minh.appspot.com",
    messagingSenderId: "235233114898",
    appId: "1:235233114898:web:ccf1abd775034cf68511cb",
    measurementId: "G-5TRD59D55V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);