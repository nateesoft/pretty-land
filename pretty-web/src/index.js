import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import "./index.css"
import App from "./App"
import Home from "../src/apps/containers/home"
import reportWebVitals from "./reportWebVitals"
import Profile from "./Profile"
import Support from "./Support"
import Privacy from "./Privacy"
import FacebookForm from "./pages/FacebookLogin"
import FacebookProfile from "./pages/FacebookProfile"

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
      <Route path="/apps">
        <Home />
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
    </Switch>
  </Router>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
