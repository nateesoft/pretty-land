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

import HomeAdmin from "../src/apps/containers/homeAdmin/Dashboard"
import HomePartner from "../src/apps/containers/homePartner/Dashboard"
import HomeCustomer from "../src/apps/containers/homeCustomer/Dashboard"

import CustomerPosts from "../src/apps/containers/homeCustomer/Posts"
import CustomerContactAdmin from "../src/apps/containers/homeCustomer/ContactAdmin"

import MemberProfile from "../src/apps/containers/homeAdmin/members/Profile"
import ProfileEditForm from "../src/apps/containers/homePartner/edit/RegisterDetail1"
import ProfileEditForm2 from "../src/apps/containers/homePartner/edit/RegisterDetail2"
import ProfileEditForm3 from "../src/apps/containers/homePartner/edit/RegisterDetail3"
import ProfileEditForm4 from "../src/apps/containers/homePartner/edit/RegisterDetail4"

import CustomerCreateWork from "../src/apps/containers/homeCustomer/work/CreateWorkForm"
import PlaceForm from "../src/apps/containers/homeCustomer/work/PlaceForm"
import TimePriceForm from "../src/apps/containers/homeCustomer/work/TimePriceForm"
import CustomerCreateWork4 from "../src/apps/containers/homeCustomer/work/CreateWorkForm4"
import LineLoginForm from "../src/apps/containers/lineLogin"

import AdminCustomerPosts from "../src/apps/containers/homeAdmin/posts"
import AdminMemberList from "../src/apps/containers/homeAdmin/Members"
import AdminProfile from "../src/apps/containers/homeAdmin/ProfileSetting"
import SystemConfig from "../src/apps/containers/homeAdmin/SystemConfig"
import CustomerPostDetail from "../src/apps/containers/homeAdmin/posts/PostDetail"

import PartnerCustomerPosts from "../src/apps/containers/homePartner/posts"
import CustomerPostDetailForPartner from "../src/apps/containers/homePartner/posts/PostDetail"
import PartnerConfrimPriceForm from "../src/apps/containers/homePartner/posts/ConfirmPriceForm"

import CustomerReviewTask from "../src/apps/containers/homeCustomer/ReviewTask"
import CustomerSelectPartner from "../src/apps/containers/homeCustomer/PartnerListSelect"
import CustomerPartnerItem from "../src/apps/containers/homeCustomer/PartnerListItem"
import PaymentForm from "../src/apps/containers/homeCustomer/work/PaymentForm"

import PartnerRequest from "../src/apps/containers/homePartner/WorkRequest"
import PartnerRequestDetail from "../src/apps/containers/homePartner/WorkRequestDetail"
import PartnerMyWork from "../src/apps/containers/homePartner/MyWork"
import PartnerProfile from "../src/apps/containers/homePartner/Profile"

import FacebookForm from "./pages/FacebookLogin"

import reportWebVitals from "./reportWebVitals"
// import Profile from "./Profile"
// import Support from "./Support"
// import Privacy from "./Privacy"
// import HelpPage from "./pages/help"

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

if (getOS() !== "iOS" && getOS() !== "Android") {
  console.log("application support only, iOS and Android")
  // window.location.href = "http://google.co.th"
}

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
      <Route path="/line-login">
        <LineLoginForm />
      </Route>
      <Route path="/admin">
        <HomeAdmin />
      </Route>
      <Route path="/admin-members">
        <AdminMemberList />
      </Route>
      <Route path="/admin-profile">
        <AdminProfile />
      </Route>
      <Route path="/admin-customer-posts">
        <AdminCustomerPosts />
      </Route>
      <Route path="/admin-customer-post-detail">
        <CustomerPostDetail />
      </Route>
      <Route path="/admin-config-system">
        <SystemConfig />
      </Route>
      <Route path="/partner-customer-posts">
        <PartnerCustomerPosts />
      </Route>
      <Route path="/member-profile">
        <MemberProfile />
      </Route>
      <Route path="/partner-customer-post-detail">
        <CustomerPostDetailForPartner />
      </Route>
      <Route path="/partner-confirm-price-form">
        <PartnerConfrimPriceForm />
      </Route>
      <Route path="/partner">
        <HomePartner />
      </Route>
      <Route path="/partner-request">
        <PartnerRequest />
      </Route>
      <Route path="/partner-request-Detail">
        <PartnerRequestDetail />
      </Route>
      <Route path="/partner-my-work">
        <PartnerMyWork />
      </Route>
      <Route path="/partner-profile">
        <PartnerProfile />
      </Route>
      <Route path="/partner-edit-form">
        <ProfileEditForm />
      </Route>
      <Route path="/partner-edit-form-2">
        <ProfileEditForm2 />
      </Route>
      <Route path="/partner-edit-form-3">
        <ProfileEditForm3 />
      </Route>
      <Route path="/partner-edit-form-4">
        <ProfileEditForm4 />
      </Route>
      <Route path="/customer">
        <HomeCustomer />
      </Route>
      <Route path="/customer-posts">
        <CustomerPosts />
      </Route>
      <Route path="/customer-admin">
        <CustomerContactAdmin />
      </Route>
      <Route path="/customer-create-work">
        <CustomerCreateWork />
      </Route>
      <Route path="/customer-review-task">
        <CustomerReviewTask />
      </Route>
      <Route path="/customer-select-partner">
        <CustomerSelectPartner />
      </Route>
      <Route path="/customer-partner-item">
        <CustomerPartnerItem />
      </Route>
      <Route path="/payment-form">
        <PaymentForm />
      </Route>
      <Route path="/place-form">
        <PlaceForm />
      </Route>
      <Route path="/time-price-form">
        <TimePriceForm />
      </Route>
      <Route path="/customer-create-work4">
        <CustomerCreateWork4 />
      </Route>
      <Route path="/apps">
        <App />
      </Route>
      <Route path="/facebook">
        <FacebookForm />
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
