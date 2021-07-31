import React, { memo, useContext } from "react"
import { WebView } from "react-native-webview"

import { Context as AuthContext } from "../../context/AuthContext"
const linkUri = `https://pretty-land.web.app/facebook`

const FacebookLoginForm = ({ navigation, route }) => {
  const { signInLine } = useContext(AuthContext)
  
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
    const { url } = data
    const { id, name, picture } = getQueryStringParams(url.toString().split("?")[1])
    if (id && name) {
      signInLine({ id, name, picture })
    }
  }

  return (
    <WebView
      source={{ uri: linkUri }}
      onNavigationStateChange={(data) => verifyLineLogin(data)}
    />
  )
}

export default memo(FacebookLoginForm)
