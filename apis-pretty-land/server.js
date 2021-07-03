const express = require("express")
const fetch = require("node-fetch")

const app = express()

app.get("/", (req, res) => {
  res.json({
    say: "Hello, world",
  })
})

app.get('/verify', (req, res) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify({
      grant_type: "authorization_code",
      code: req.query.code,
      redirect_uri: "https://29c360671caf.ngrok.io/get_line_data",
      client_id: "1656048839",
      client_secret: "dc3d2f749eabc0069f8dd0988e5bf836",
    }),
    redirect: "follow",
  }

  fetch("https://api.line.me/oauth2/v2.1/token", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error))

  res.json({ status: "verify", code: req.query.code })
})

app.get("/get_line_data", (req, res) => {
  res.json({ status: "success", code: req.query.code })
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`server is running at port:${process.env.PORT || 5000}`)
})
