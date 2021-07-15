import React, { useEffect, useState } from "react"
import FacebookLogin from "react-facebook-login"
import "./styles.css"

export default function FacebookLoginForm() {
  const [payload, setPayload] = useState({})

  const responseFacebook = ({ id, name, email }) => {
    if (id && name && email) {
      setPayload({ id, name, email })
    }
  }

  useEffect(() => {
    const { id, name, email } = payload
    if (id && name && email) {
      window.location.href = `https://pretty-land.web.app/facebook-profile?id=${id}&name=${name}&email=${email}`
    }
  }, [payload])

  return (
    <div className="container">
      <div className="vertical-center">
        <FacebookLogin
          appId="197019969023037"
          autoLoad={true}
          fields="name,email"
          scope="public_profile"
          callback={responseFacebook}
        />
      </div>
    </div>
  )
}
