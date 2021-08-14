import { Button } from "@material-ui/core"
import React from "react"
import { useHistory } from "react-router-dom"

export default function LineLogin() {
  const history = useHistory()

  const backHome = () => {
    history.push("/")
  }
  return (
    <div align="center" style={{ fontSize: 18 }}>
      <h3>... LINE LOGIN ... is Loading...</h3>
      <Button onClick={backHome}>Back Home</Button>
    </div>
  )
}
