import firebase from "firebase/app"
import "firebase/database"
import "firebase/storage"
import "firebase/auth"
import "firebase/messaging"

const config = {
  apiKey: "AIzaSyBGL9A2kCwZgdeaaCuFjjhHfqHdT3XBJ0c",
  authDomain: "pretty-land.firebaseapp.com",
  databaseURL:
    "https://pretty-land-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pretty-land",
  storageBucket: "pretty-land.appspot.com",
  messagingSenderId: "1012685908059",
  appId: "1:1012685908059:web:bb016f1e98d7f3ced4777e",
  measurementId: "G-SC20Q2SELV"
}

let messaging = null
if (firebase.messaging.isSupported) {
  firebase.initializeApp(config)
  messaging = firebase.messaging()
  console.log("messaging:", messaging)
} else {
  alert("firebase messaging not support")
}

export default firebase

// export const askForPermissionToReceiveNotifications = async () => {
//   try {
//     const messaging = firebase.messaging()
//     await messaging.requestPermission()
//     const token = await messaging.getToken()
//     console.log("Your token is:", token)

//     return token
//   } catch (error) {
//     console.error(error)
//   }
// }
