import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import jwtDecode from "jwt-decode"
import base64 from "base-64"

import firebase from "../../../util/firebase"
import { AppConfig } from "../../../Constants"

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

export default function LineLogin() {
  const history = useHistory()

  const validLineLogin = () => {
    const { code } = getQueryStringParams(window.location.search.split("?")[1])
    if (code) {
      var myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded")

      var urlencoded = new URLSearchParams()
      urlencoded.append("grant_type", "authorization_code")
      urlencoded.append("code", code)
      urlencoded.append(
        "redirect_uri",
        "https://pretty-land.web.app/line-login"
      )
      urlencoded.append("client_id", "1656048839")
      urlencoded.append("client_secret", "dc3d2f749eabc0069f8dd0988e5bf836")

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow"
      }

      fetch("https://api.line.me/oauth2/v2.1/token", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          const token = result.id_token
          const decode = jwtDecode(token)
          const payload = {
            id: decode.sub,
            name: decode.name,
            picture: decode.picture
          }

          const memberData = {
            id: payload.id,
            profile: payload.name || "",
            name: payload.name || "",
            customerType: "line",
            memberType: "customer",
            status: "active",
            email: "",
            username: payload.id,
            password: base64.encode("00000000"),
            loginDate: new Date().toUTCString(),
            photoURL: payload.picture || "",
            phoneNumber: "",
            mobile: "",
            customerLevel: 0,
            sys_create_date: new Date().toUTCString(),
            sys_update_date: new Date().toUTCString()
          }
          firebase
            .database()
            .ref(`${AppConfig.env}/members/${payload.id}`)
            .update(memberData)

          history.push("/customer", { member: memberData })
          window.opener.close();
        })
        .catch((error) => console.log("error", error))
    }
  }

  useEffect(() => {
    validLineLogin()
  }, [])

  return (
    <div align="center">
      <h3 style={{ color: "white" }}>... LINE LOGIN ... is Loading...</h3>
    </div>
  )
}
