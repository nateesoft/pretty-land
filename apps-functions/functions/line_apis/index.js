function handleText(message, replyToken, source, client) {
  switch (message.text) {
    case "profile":
      if (source.userId) {
        return client
          .getProfile(source.userId)
          .then((profile) =>
            replyText(
              replyToken,
              [
                `Display name: ${profile.displayName}`,
                `Status message: ${profile.statusMessage}`
              ],
              client
            )
          )
      } else {
        return replyText(
          replyToken,
          "Bot can't use profile API without user ID",
          client
        )
      }
    default:
      console.log(`Echo message to ${replyToken}: ${message.text}`)
      return replyText(replyToken, message.text, client)
  }
}

function replyText(token, texts, client) {
  texts = Array.isArray(texts) ? texts : [texts]
  return client.replyMessage(
    token,
    texts.map((text) => ({ type: "text", text }))
  )
}

module.exports = (client) => {
  const module = {}

  module.handleEvent = (event) => {
    if (event.replyToken && event.replyToken.match(/^(.)\1*$/)) {
      return console.log("Test hook recieved: " + JSON.stringify(event.message))
    }

    switch (event.type) {
      case "message":
        const message = event.message
        switch (message.type) {
          case "text":
            return handleText(message, event.replyToken, event.source, client)
          default:
            throw new Error(`Unknown message: ${JSON.stringify(message)}`)
        }
      default:
        throw new Error(`Unknown event: ${JSON.stringify(event)}`)
    }
  }

  return module
}
