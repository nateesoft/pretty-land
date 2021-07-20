import React, { useEffect, useState } from "react"
import "./styles.css"

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

export default function FacebookProfile() {
  const [payload, setPayload] = useState({})

  useEffect(() => {
    const { id, name, email } = getQueryStringParams(
      window.location.search.split("?")[1]
    )
    setPayload({
      id,
      name,
      email
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>id: {payload.id}</p>
        <p>name: {payload.name}</p>
        <p>email: {payload.email}</p>
      </header>
    </div>
  )
}
