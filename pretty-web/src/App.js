import React, { useEffect, useState } from "react"
import { Redirect, Link } from "react-router-dom"
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

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundImage: "url(bg.png)" }}>
        <p style={{ fontSize: 50, fontStyle: "italic", fontWeight: "bold" }}>
          Pretty Land
        </p>
        <div>
          <img
            src="logo.png"
            alt="Pretty Land"
            width="150"
            style={{ borderRadius: 5, boxShadow: 20 }}
          />
        </div>
        <div>
          <span style={{ color: "orange" }}>เหงาอยู่รึป่าว!!</span> หาเพื่อนดื่ม
          หาแฟนชั่วคราว หาคนเที่ยว สายปาร์ตี้ ต้อง
          <br />
          PrettyLand เท่านั้น PrettyLand แอพแก้เหงาให้คุณ Match กับคนที่ถูกใจ
          <br />
          <span style={{ backgroundColor: "blue", fontSize: 22 }}>
            นัดเจอ ไปออกเที่ยวกันได้เลย
          </span>{" "}
          <span style={{ color: "red", fontSize: 36, fontStyle: "italic" }}>
            24 ชั่วโมง
          </span>{" "}
          <br />
          <span style={{ color: "yellow", fontSize: 36 }}>
            เจอเพื่อนใหม่ สายปาร์ตี้ ใกล้ตัว ได้ทุกที่ ทุกเวลา
          </span>
        </div>
        <div className="App-footer">
          <Link
            to="/support"
            style={{ color: "chocolate", textDecoration: "none" }}
          >
            Support Us
          </Link>
          <span style={{ color: "gray" }}> | </span>
          <Link to="/privacy" style={{ color: "red", textDecoration: "none" }}>
            Privacy Notices
          </Link>
        </div>
      </header>
    </div>
  )
}

export default App
