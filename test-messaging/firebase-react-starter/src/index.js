import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import firebase from "firebase"

var config = {
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

firebase.initializeApp(config)

const messaging = firebase.messaging()
messaging
  .requestPermission()
  .then(() => {
    alert("Have permission")
    return messaging.getToken()
  })
  .then((token) => {
    alert(token)
  })
  .catch((err) => {
    alert("Error Occured.", err)
  })

// firebase
//   .database()
//   .ref("test/appconfig")
//   .once("value", (snapshot) => {
//     console.log(snapshot.val())
//   })

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
