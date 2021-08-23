const functions = require("firebase-functions")

const line = require("@line/bot-sdk")
const middleware = require("@line/bot-sdk").middleware

const express = require('express')
const app = express()

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const config = {
  channelAccessToken:
    "IKm27jsJjRzk+CLdx9Vqj4VRJlF3B1Sq8lIJXeYRgBYeUg8ZjyzBjkK1zT9l/kNdl08AZfex5ClgWSlGrQv8pJdKY3O5d586G3xqkWJsZpIdWN5hK199J37Cc//sQj16szAnimNOlhsWwhvOhHdBowdB04t89/1O/w1cDnyilFU=",
  channelSecret: "717f3b55e0285699a184527358624e4e"
}

// create LINE SDK client
const client = new line.Client(config)
const LineAPI = require("./line_apis")(client)

app.get('/', (req, res)=>{
  res.send('Hello, Express on Firebase cloud functions !')
})

app.post('/webhook', middleware(config), (req, res)=>{
  // handle events separately
  Promise.all(req.body.events.map(LineAPI.handleEvent))
    .then(() => res.end())
    .catch((err) => {
      console.error(err)
      res.status(500).end()
    })

  res.status(200).send("Success")
})

exports.api = functions.https.onRequest(app)
