import React, { memo, useState, useEffect, useContext } from "react"
import { WebView } from "react-native-webview"
import uuid from "react-native-uuid"

import { Context as AuthContext } from "../../context/AuthContext"

const LineLoginForm = ({ navigation, route }) => {
  const { navigate } = navigation
  const [lineUrl, setLineUrl] = useState("")
  const { signInLine } = useContext(AuthContext)

  useEffect(() => {
    const client_id = "1656048839"
    const redirect_uri = "https://7a04efa81898.ngrok.io/get_line_data"
    const state = uuid.v4()
    const scope = "profile%20openid%20email"
    const query = `response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}`
    const link_link_connect = `https://access.line.me/oauth2/v2.1/authorize?${query}`
    setLineUrl(link_link_connect)
  }, [])

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

  const verifyLineLogin = (data) => {
    console.log("verifyLineLogin:", data)
    //https://7a04efa81898.ngrok.io/get_line_data?code=34kgDOoih8WERG9BPkfA&state=b7decaf8-3075-468c-8ed1-2d8c069d8446
    const { url } = data
    const { code, state } = getQueryStringParams(url.toString().split('?')[1])
    console.log("code:", code)
    console.log("state", state)
    if (code && state) {
      signInLine({ code, state })
    }
  }

  return (
    <WebView
      source={{ uri: lineUrl }}
      onNavigationStateChange={(data) => verifyLineLogin(data)}
    />
  )
}

export default memo(LineLoginForm)
