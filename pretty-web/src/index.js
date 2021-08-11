import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import "./index.css"
import App from "./App"
import Home from "../src/apps/containers/home"
import RegisterForm from "../src/apps/containers/register"
import RegisterDetail1Form from "../src/apps/containers/register/RegisterDetail1"
import RegisterDetail2Form from "../src/apps/containers/register/RegisterDetail2"
import RegisterDetail3Form from "../src/apps/containers/register/RegisterDetail3"
import RegisterDetail4Form from "../src/apps/containers/register/RegisterDetail4"
import LoginForm from "../src/apps/containers/login"

import reportWebVitals from "./reportWebVitals"
import Profile from "./Profile"
import Support from "./Support"
import Privacy from "./Privacy"
import FacebookForm from "./pages/FacebookLogin"
import FacebookProfile from "./pages/FacebookProfile"
import HelpPage from "./pages/help"

function getOS() {
  var userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"],
    os = null

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "Mac OS"
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = "iOS"
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "Windows"
  } else if (/Android/.test(userAgent)) {
    os = "Android"
  } else if (!os && /Linux/.test(platform)) {
    os = "Linux"
  }

  return os
}

// if (getOS() !== "iOS" || getOS() !== "Android") {
//   window.location.href = "http://google.co.th"
// }

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/register">
        <RegisterForm />
      </Route>
      <Route path="/registerDetail1">
        <RegisterDetail1Form />
      </Route>
      <Route path="/registerDetail2">
        <RegisterDetail2Form />
      </Route>
      <Route path="/registerDetail3">
        <RegisterDetail3Form />
      </Route>
      <Route path="/registerDetail4">
        <RegisterDetail4Form />
      </Route>
      <Route path="/login">
        <LoginForm />
      </Route>
      {/* <Route path="/apps">
        <App />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/support">
        <Support />
      </Route>
      <Route path="/privacy">
        <Privacy />
      </Route>
      <Route path="/facebook">
        <FacebookForm />
      </Route>
      <Route path="/facebook-profile">
        <FacebookProfile />
      </Route>
      <Route path="/help">
        <HelpPage />
      </Route> */}
    </Switch>
  </Router>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
