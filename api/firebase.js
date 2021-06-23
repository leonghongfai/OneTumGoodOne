import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKwaiPrr_ENZdkyPaTLkDN-owQn63CSuk",
  authDomain: "orbital-21837.firebaseapp.com",
  databaseURL: "https://orbital-21837-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "orbital-21837",
  storageBucket: "orbital-21837.appspot.com",
  messagingSenderId: "685879920678",
  appId: "1:685879920678:web:4eef086d8a3721c117fee7",
  measurementId: "G-XHCD2EP5HK"
};
  // Initialize Firebase
const app = (!firebase.apps.length)
    ?firebase.initializeApp(firebaseConfig)
    :firebase.app()

export default app;
