import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyBKwaiPrr_ENZdkyPaTLkDN-owQn63CSuk",
    authDomain: "orbital-21837.firebaseapp.com",
    projectId: "orbital-21837",
    storageBucket: "orbital-21837.appspot.com",
    messagingSenderId: "685879920678",
    appId: "1:685879920678:web:4eef086d8a3721c117fee7",
    measurementId: "G-XHCD2EP5HK",
    databaseURL: "https://orbital-21837-default-rtdb.asia-southeast1.firebasedatabase.app"
  };
  // Initialize Firebase
const app = !firebase.apps.length
    ?firebase.initializeApp(firebaseConfig)
    :firebase.app()

export default app;
