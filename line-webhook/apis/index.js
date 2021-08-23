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
    case "register":
      if (source.userId) {
        return client
          .getProfile(source.userId)
          .then((profile) =>
            replyText(
              replyToken,
              [`${profile.displayName} ลงทะเบียนเรียบร้อยแล้ว`],
              client
            )
          )
      }
    case "buttons":
      return client.replyMessage(replyToken, {
        type: "template",
        altText: "Buttons alt text",
        template: {
          type: "buttons",
          thumbnailImageUrl: null,
          title: "My button sample",
          text: "Hello, my button",
          actions: [
            { label: "Go to line.me", type: "uri", uri: "https://line.me" },
            {
              label: "Say hello1",
              type: "postback",
              data: "hello こんにちは"
            },
            {
              label: "言 hello2",
              type: "postback",
              data: "hello こんにちは",
              text: "hello こんにちは"
            },
            { label: "Say message", type: "message", text: "Rice=米" }
          ]
        }
      })
    case "confirm":
      return client.replyMessage(replyToken, {
        type: "template",
        altText: "Confirm alt text",
        template: {
          type: "confirm",
          text: "Do it?",
          actions: [
            { label: "Yes", type: "message", text: "Yes!" },
            { label: "No", type: "message", text: "No!" }
          ]
        }
      })
    case "carousel":
      return client.replyMessage(replyToken, {
        type: "template",
        altText: "Carousel alt text",
        template: {
          type: "carousel",
          columns: [
            {
              thumbnailImageUrl: null,
              title: "hoge",
              text: "fuga",
              actions: [
                {
                  label: "Go to line.me",
                  type: "uri",
                  uri: "https://line.me"
                },
                {
                  label: "Say hello1",
                  type: "postback",
                  data: "hello こんにちは"
                }
              ]
            },
            {
              thumbnailImageUrl: null,
              title: "hoge",
              text: "fuga",
              actions: [
                {
                  label: "言 hello2",
                  type: "postback",
                  data: "hello こんにちは",
                  text: "hello こんにちは"
                },
                { label: "Say message", type: "message", text: "Rice=米" }
              ]
            }
          ]
        }
      })
    case "image carousel":
      return client.replyMessage(replyToken, {
        type: "template",
        altText: "Image carousel alt text",
        template: {
          type: "image_carousel",
          columns: [
            {
              imageUrl: buttonsImageURL,
              action: {
                label: "Go to LINE",
                type: "uri",
                uri: "https://line.me"
              }
            },
            {
              imageUrl: buttonsImageURL,
              action: {
                label: "Say hello1",
                type: "postback",
                data: "hello こんにちは"
              }
            },
            {
              imageUrl: buttonsImageURL,
              action: {
                label: "Say message",
                type: "message",
                text: "Rice=米"
              }
            },
            {
              imageUrl: buttonsImageURL,
              action: {
                label: "datetime",
                type: "datetimepicker",
                data: "DATETIME",
                mode: "datetime"
              }
            }
          ]
        }
      })
    case "datetime":
      return client.replyMessage(replyToken, {
        type: "template",
        altText: "Datetime pickers alt text",
        template: {
          type: "buttons",
          text: "Select date / time !",
          actions: [
            {
              type: "datetimepicker",
              label: "date",
              data: "DATE",
              mode: "date"
            },
            {
              type: "datetimepicker",
              label: "time",
              data: "TIME",
              mode: "time"
            },
            {
              type: "datetimepicker",
              label: "datetime",
              data: "DATETIME",
              mode: "datetime"
            }
          ]
        }
      })
    case "imagemap":
      return client.replyMessage(replyToken, {
        type: "imagemap",
        baseUrl: `${baseURL}/static/rich`,
        altText: "Imagemap alt text",
        baseSize: { width: 1040, height: 1040 },
        actions: [
          {
            area: { x: 0, y: 0, width: 520, height: 520 },
            type: "uri",
            linkUri: "https://store.line.me/family/manga/en"
          },
          {
            area: { x: 520, y: 0, width: 520, height: 520 },
            type: "uri",
            linkUri: "https://store.line.me/family/music/en"
          },
          {
            area: { x: 0, y: 520, width: 520, height: 520 },
            type: "uri",
            linkUri: "https://store.line.me/family/play/en"
          },
          {
            area: { x: 520, y: 520, width: 520, height: 520 },
            type: "message",
            text: "URANAI!"
          }
        ],
        video: {
          originalContentUrl: `${baseURL}/static/imagemap/video.mp4`,
          previewImageUrl: `${baseURL}/static/imagemap/preview.jpg`,
          area: {
            x: 280,
            y: 385,
            width: 480,
            height: 270
          },
          externalLink: {
            linkUri: "https://line.me",
            label: "LINE"
          }
        }
      })
    case "bye":
      switch (source.type) {
        case "user":
          return replyText(replyToken, "Bot can't leave from 1:1 chat", client)
        case "group":
          return replyText(replyToken, "Leaving group", client).then(() =>
            client.leaveGroup(source.groupId)
          )
        case "room":
          return replyText(replyToken, "Leaving room", client).then(() =>
            client.leaveRoom(source.roomId)
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
