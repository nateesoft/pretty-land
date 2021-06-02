const express = require("express")

const app = express()

app.get("/", (req, res) => {
  res.json({
    say: "Hello, world",
  })
})

app.get("/get_line_data", (req, res) => {
  console.log("req:", req)
  console.log("res:", res)
  res.send("this is response from line")
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`server is running at port:${process.env.PORT || 5000}`)
})
