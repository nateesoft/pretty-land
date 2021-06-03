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
        redirect: "follow",
      }

      fetch(lineConfig.postToken, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          const token = result.id_token
          const decode = jwtDecode(token)
          setPayload({
            id: decode.sub,
            name: decode.name,
            picture: decode.picture,
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

  return (
    <div className="App">
      <header className="App-header">
        <p>404 - NOT FOUND LINE USER</p>
      </header>
    </div>
  )
}

export default App
