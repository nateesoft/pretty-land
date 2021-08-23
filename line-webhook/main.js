const express = require("express")

const line = require("@line/bot-sdk")
const middleware = require("@line/bot-sdk").middleware

const app = express()

const config = {
  channelAccessToken:
    "IKm27jsJjRzk+CLdx9Vqj4VRJlF3B1Sq8lIJXeYRgBYeUg8ZjyzBjkK1zT9l/kNdl08AZfex5ClgWSlGrQv8pJdKY3O5d586G3xqkWJsZpIdWN5hK199J37Cc//sQj16szAnimNOlhsWwhvOhHdBowdB04t89/1O/w1cDnyilFU=",
  channelSecret: "717f3b55e0285699a184527358624e4e"
}

// create LINE SDK client
const client = new line.Client(config)
const LineAPI = require("./apis")(client)

app.get("/", (req, res) => {
  res.send("Pretty Land @ 2021 - Line/SDK")
})

app.post("/api/webhook", middleware(config), (req, res) => {
  Promise.all(req.body.events.map(LineAPI.handleEvent))
    .then(() => res.end())
    .catch((err) => {
      console.error(err)
      res.status(500).end()
    })

  res.status(200).send("Success")
})

app.listen(5000)
