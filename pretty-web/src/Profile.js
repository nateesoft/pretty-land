import React, { useEffect, useState } from "react"
import "./App.css"

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

export default function Profile() {
  const [payload, setPayload] = useState({})

  useEffect(() => {
    const { id, name, picture } = getQueryStringParams(
      window.location.search.split("?")[1]
    )
    setPayload({
      id,
      name,
      picture,
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={payload.picture}
          alt="logo"
          style={{ width: 100 }}
        />
        <p>ID: {payload.id}</p>
        <p>NAME: {payload.name}</p>
      </header>
    </div>
  )
}
