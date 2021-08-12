import firebase from "../util/firebase"
import base64 from "base-64"

import { AppConfig } from "../Constants"

const loginApp = (username, password) => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`${AppConfig.env}/members`)
      .once("value", (snapshot) => {
        const members = { ...snapshot.val() }
        let result = false
        for (let key in members) {
          const member = members[key]
          if (
            member.username === username &&
            base64.decode(member.password) === password
          ) {
            if (
              member.memberType === "admin" ||
              member.memberType === "superadmin"
            ) {
              result = true
            }
          }
        }
        resolve(result)
      })
  }).catch((err) => alert(`${err}`))
}

const validUserExist = (username) => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`${AppConfig.env}/members`)
      .once("value", (snapshot) => {
        const members = { ...snapshot.val() }
        let result = false
        for (let key in members) {
          const member = members[key]
          if (member.username === username) {
            result = true
          }
        }
        resolve(result)
      })
  }).catch((err) => alert(`${err}`))
}

const saveNewPartner = (newData) => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`${AppConfig.env}/members/${newData.userId}`)
      .set({
        ...newData,
        password: base64.encode(newData.password),
        id: newData.userId
      })
    resolve(true)
  }).catch((err) => alert(`${err}`))
}

export { loginApp, saveNewPartner, validUserExist }
