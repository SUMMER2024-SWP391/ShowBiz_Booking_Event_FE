// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBx-VbcleRn5SyZwbZ84g8h2rePZRGrXzk",
  authDomain: "event-booking-3312c.firebaseapp.com",
  projectId: "event-booking-3312c",
  storageBucket: "event-booking-3312c.appspot.com",
  messagingSenderId: "534004646024",
  appId: "1:534004646024:web:0a24144d732f9c8adadf3d",
  measurementId: "G-B53X638S92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const imageDB = getStorage(app);