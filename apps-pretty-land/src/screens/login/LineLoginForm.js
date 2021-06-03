import React, { memo, useState, useEffect, useContext } from "react"
import { WebView } from "react-native-webview"
import uuid from "react-native-uuid"

import { Context as AuthContext } from "../../context/AuthContext"
import { lineConfig } from "../../../util/appConfig"

const state = uuid.v4()
const query = `response_type=code&client_id=${lineConfig.client_id}&redirect_uri=${lineConfig.redirect_uri}&state=${state}&scope=${lineConfig.scope}`
const linkUri = `https://access.line.me/oauth2/v2.1/authorize?${query}`

const LineLoginForm = ({ navigation, route }) => {
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

export default memo(LineLoginForm)
