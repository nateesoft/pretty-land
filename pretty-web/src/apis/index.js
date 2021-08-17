import base64 from "base-64"
import uuid from "react-uuid"

import firebase from "../util/firebase"
import { AppConfig } from "../Constants"
import { getBankList } from "../data/apis"

const adminSaveConfirmPayment = (item, listPartner) => {
  return new Promise((resolve, reject) => {
    // save to firebase
    firebase.database().ref(`${AppConfig.env}/posts/${item.id}`).update({
      status: AppConfig.PostsStatus.adminConfirmPayment,
      statusText: "ชำระเงินเรียบร้อยแล้ว",
      sys_update_date: new Date().toUTCString()
    })

    // update status partner in list
    listPartner.forEach((obj) => {
      firebase
        .database()
        .ref(`${AppConfig.env}/posts/${item.id}/partnerSelect/${obj.partnerId}`)
        .update({
          selectStatus: AppConfig.PostsStatus.customerPayment,
          selectStatusText: "ชำระเงินเรียบร้อยแล้ว",
          sys_update_date: new Date().toUTCString()
        })
    })

    getMemberProfile(item.customerId).then((cust) => {
      // update level to customer
      firebase
        .database()
        .ref(`${AppConfig.env}/members/${item.customerId}`)
        .update({
          customerLevel: (cust.customerLevel || 0) + 1
        })
    })
    resolve(true)
  })
}

const clearOldFiles = (fileName) => {
  return new Promise((resolve, reject) => {
    const storage = firebase.storage()
    const storageRef = storage.ref(`${AppConfig.env}/images/member/partner`)
    storageRef
      .listAll()
      .then((res) => {
        res.items.forEach((itemRef) => {
          if (itemRef.name.startsWith(fileName)) {
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

const updatePosts = (postId, data) => {
  firebase.database().ref(`${AppConfig.env}/posts/${postId}`).update(data)
}

const adminConfirmNewPost = (item) => {
  return new Promise((resolve, reject) => {
    updatePosts(item.id, {
      status: AppConfig.PostsStatus.adminConfirmNewPost,
      statusText: "อนุมัติโพสท์",
      sys_update_date: new Date().toUTCString()
    })
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
      .catch((err) => alert(`${err}`))
  })
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

const saveNewPosts = (postData) => {
  const newId = uuid()
  const saveData = {
    id: newId,
    ...postData,
    sys_create_date: new Date().toUTCString(),
    sys_update_date: new Date().toUTCString()
  }
  // console.log(saveData)
  firebase.database().ref(`${AppConfig.env}/posts/${newId}`).update(saveData)
}

const getPartnerDashboardType1 = () => {
  return new Promise((resolve, reject) => {
    resolve(0)
  })
}
const getPartnerDashboardType2 = () => {
  return new Promise((resolve, reject) => {
    resolve(0)
  })
}
const getPartnerDashboardType3 = () => {
  return new Promise((resolve, reject) => {
    resolve(0)
  })
}
const getPartnerDashboardType4 = () => {
  return new Promise((resolve, reject) => {
    resolve(0)
  })
}
const getBankName = (bankId) => {
  return getBankList().filter((item, index) => item.value === bankId)
}
const partnerAcceptJobWaitCustomerReview = (item, profile) => {
  const { id: postId } = item
  // update post status
  updatePosts(postId, {
    status: AppConfig.PostsStatus.waitCustomerSelectPartner,
    statusText: "รอลูกค้าเลือกน้องๆ",
    sys_update_date: new Date().toUTCString()
  })

  // update partnerSelect
  const data = {
    partnerId: profile.id,
    partnerName: profile.name,
    amount: profile.amount,
    age: profile.age,
    image: profile.image || null,
    sex: profile.gender,
    character: profile.charactor,
    telephone: profile.mobile,
    selectStatus: AppConfig.PostsStatus.waitCustomerSelectPartner,
    selectStatusText: "เสนอรับงาน",
    bankNo: profile.bankNo,
    bankCode: profile.bank,
    bankName: getBankName(profile.bank)[0].label,
    lineId: profile.lineId
  }

  firebase
    .database()
    .ref(`${AppConfig.env}/posts/${postId}/partnerSelect/${profile.id}`)
    .update(data)
}

const savePaymentSlip = (dataPayment, item) => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`${AppConfig.env}/posts/${item.id}`)
      .update(dataPayment)

    resolve(true)
  })
}

export {
  loginApp,
  saveNewPartner,
  validUserExist,
  getMemberProfile,
  getConfigList,
  updateWorkingStatus,
  clearOldFiles,
  saveNewPosts,
  updatePosts,
  adminConfirmNewPost,
  getPartnerDashboardType1,
  getPartnerDashboardType2,
  getPartnerDashboardType3,
  getPartnerDashboardType4,
  partnerAcceptJobWaitCustomerReview,
  savePaymentSlip,
  adminSaveConfirmPayment
}
