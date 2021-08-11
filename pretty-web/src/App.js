import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import jwtDecode from "jwt-decode"

import "./App.css"
import { lineConfig } from "./config"

const getQueryStringParams = (query) => {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
        .split("&")
        .reduce((params, param) => {
          let [key, value] = param.split("=")
          params[key] = value
            ? decodeURIComponent(value.replace(/\+/g, " "))
            : ""
          return params
        }, {})
    : {}
}

const App = () => {
  const [payload, setPayload] = useState({})

  useEffect(() => {
    const { code } = getQueryStringParams(window.location.search.split("?")[1])

    if (code) {
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded")

      const urlencoded = new URLSearchParams()
      urlencoded.append("grant_type", "authorization_code")
      urlencoded.append("code", code)
      urlencoded.append("redirect_uri", lineConfig.redirect_uri)
      urlencoded.append("client_id", lineConfig.client_id)
      urlencoded.append("client_secret", lineConfig.client_secret)

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow"
      }

      fetch(lineConfig.postToken, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          const token = result.id_token
          const decode = jwtDecode(token)
          setPayload({
            id: decode.sub,
            name: decode.name,
            picture: decode.picture
          })
        })
        .catch((error) => {
          console.log("error", error)
          setPayload({})
        })
    }
  }, [])

  if (payload.name && payload.id && payload.picture) {
    return (
      <Redirect
        to={`/profile?id=${payload.id}&name=${payload.name}&picture=${payload.picture}`}
      />
    )
  }

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

  const downloadIOS = () => {
    console.log('onClick:downloadIOS')
    const os = getOS()
    console.log("Application running on:", os)
    if (os === "iOS") {
      window.location.href = "https://i.diawi.com/DEqv4p"
    }
  }

  const downloadAndroid = () => {
    console.log('onClick:downloadAndroid')
    const os = getOS()
    console.log("Application running on:", os)
    if (os === "Android") {
      // window.location.href = "https://i.diawi.com/DEqv4p"
    }
  }

  const partnerConnectAdminLine = () => {
    console.log('onClick:partnerConnectAdminLine')
    window.location.href = 'https://lin.ee/8f5kP3x'
  }

  return (
    <div>
      <div
        style={{
          display: "inline-block",
          position: "relative",
          margin: "0 auto",
        }}
      >
        <img src="bg.jpg" alt="" />
        <div style={{ position: "absolute", bottom: "50px", left: "15px" }}>
          <img src="download_ios.png" alt="" style={{ width: 150 }} onClick={downloadIOS} />
        </div>
        <div style={{ position: "absolute", bottom: "50px", left: "170px" }}>
          <img src="download_android.png" alt="" style={{ width: 150 }} onClick={downloadAndroid} />
        </div>
        <div style={{ position: "absolute", bottom: "1px", right: "0px" }}>
          <img src="click_here_line.png" alt="" onClick={partnerConnectAdminLine} />
        </div>
      </div>
    </div>
  )
}

export default App
