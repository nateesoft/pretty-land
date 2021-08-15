import React from "react"
import FacebookLogin from "react-facebook-login"
import "./styles.css"

export default function FacebookLoginForm() {
  const responseFacebook = ({ id, name, email }) => {
    if (id && name && email) {
      console.log(id, name, email)
    }
  }

  return (
    <div className="container">
      <div className="vertical-center">
        <FacebookLogin
          appId="131663412466397"
          autoLoad={true}
          fields="name,email"
          scope="public_profile"
          callback={responseFacebook}
        />
      </div>
    </div>
  )
}
