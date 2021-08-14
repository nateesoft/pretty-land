import base64 from "base-64"
import firebase from "../util/firebase"

import { AppConfig } from "../Constants"


const clearOldFiles = (partnerId) => {
  return new Promise((resolve, reject) => {
    const storage = firebase.storage()
    const storageRef = storage.ref(`${AppConfig.env}/images/member/partner`)
    storageRef
      .listAll()
      .then((res) => {
        res.items.forEach((itemRef) => {
          if (itemRef.name.startsWith(partnerId)) {
            itemRef
              .delete()
              .then(() => {
                console.log("delete files success")
              })
              .catch((err) => console.error("delete error:", err))
          }
        })
      })
      .catch((err) => console.error(err))
    resolve(true)
  })
}

const getConfigList = () => {
  return new Promise((resolve, reject) => {
    const ref = firebase.database().ref(`${AppConfig.env}/appconfig`)
    ref.once("value", (snapshot) => {
      const dataItems = []
      const appconfig = snapshot.val()
      dataItems.push({ ...appconfig.partner1 })
      dataItems.push({ ...appconfig.partner2 })
      dataItems.push({ ...appconfig.partner3 })
      dataItems.push({ ...appconfig.partner4 })
      resolve(dataItems)
    })
  })
}

const loginApp = (username, password) => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`${AppConfig.env}/members`)
      .once("value", (snapshot) => {
        const members = { ...snapshot.val() }
        let result = false
        let memberMaster = {}
        for (let key in members) {
          const member = members[key]
          if (
            member.username === username &&
            base64.decode(member.password) === password
          ) {
            memberMaster = member
            result = true
          }
        }
        resolve({ valid: result, member: memberMaster })
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

const getMemberProfile = (userId) => {
  return new Promise((resolve, reject) => {
    const ref = firebase.database().ref(`${AppConfig.env}/members/${userId}`)
    ref.once("value", (snapshot) => {
      const data = { ...snapshot.val() }
      resolve(data)
    })
  })
}

const updateWorkingStatus = (userId, isEnabled) => {
  firebase
    .database()
    .ref(`${AppConfig.env}/members/${userId}`)
    .update({
      work_status: isEnabled ? "working" : "available"
    })
}

export {
  loginApp,
  saveNewPartner,
  validUserExist,
  getMemberProfile,
  getConfigList,
  updateWorkingStatus,
  clearOldFiles
}
