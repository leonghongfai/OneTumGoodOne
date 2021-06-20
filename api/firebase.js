import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyCa2R9x2lIVE5HEAnyd4ZsUBFQU_kFiEDA",
  authDomain: "orbitalshit.firebaseapp.com",
  projectId: "orbitalshit",
  storageBucket: "orbitalshit.appspot.com",
  messagingSenderId: "677821659279",
  appId: "1:677821659279:web:6ac349d292b6e3f30b18fa",
  measurementId: "G-ZZM1KMXS0J"
  };
  // Initialize Firebase
const app = (!firebase.apps.length)
    ?firebase.initializeApp(firebaseConfig)
    :firebase.app()

export default app;
