import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyCMC9BdNsV3AFN-IqRbFPweeXr0VHLE2xw",
  authDomain: "orbitalshit-444b0.firebaseapp.com",
  projectId: "orbitalshit-444b0",
  storageBucket: "orbitalshit-444b0.appspot.com",
  messagingSenderId: "539632643952",
  appId: "1:539632643952:web:577493dfa37c12195be9b5",
  measurementId: "G-HWGJRC6R67"
  };
  // Initialize Firebase
const app = (!firebase.apps.length)
    ?firebase.initializeApp(firebaseConfig)
    :firebase.app()

export default app;
