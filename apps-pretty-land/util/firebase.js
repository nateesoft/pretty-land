import firebase from "firebase/app"
import "firebase/database"
import "firebase/storage"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBGL9A2kCwZgdeaaCuFjjhHfqHdT3XBJ0c",
  authDomain: "pretty-land.firebaseapp.com",
  databaseURL:
    "https://pretty-land-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pretty-land",
  storageBucket: "pretty-land.appspot.com",
  messagingSenderId: "1012685908059",
  appId: "1:1012685908059:web:bb016f1e98d7f3ced4777e",
  measurementId: "G-SC20Q2SELV",
}

if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app()
}

export default firebase