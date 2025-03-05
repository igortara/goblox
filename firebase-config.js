// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYrlPh11KJDdYj0s4D6HoL0k7VrMYoXmE",
  authDomain: "goblox-forum.firebaseapp.com",
  databaseURL: "https://goblox-forum-default-rtdb.firebaseio.com",
  projectId: "goblox-forum",
  storageBucket: "goblox-forum.firebasestorage.app",
  messagingSenderId: "357827679281",
  appId: "1:357827679281:web:bf7272c4c5147f51987110",
  measurementId: "G-CFW1KJLPPZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);