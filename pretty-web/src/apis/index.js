import base64 from "base-64"
import uuid from "react-uuid"
import Moment from "moment"

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

const checkMobileNumberWithLink = (mobileNumber, uid) => {
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
          if (member.mobile === mobileNumber) {
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

const getAppConfig = () => {
  return new Promise((resolve, reject) => {
    const ref = firebase.database().ref(`${AppConfig.env}/appconfig`)
    ref.once("value", (snapshot) => {
      const data = { ...snapshot.val() }
      resolve(data)
    })
  })
}
const updateAppConfig = (data) => {
  return new Promise((resolve, reject) => {
    firebase.database().ref(`${AppConfig.env}/appconfig`).update(data)
    resolve(true)
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

const updateMemberPoint = (workIn = 0, workPoint = 0, partnerId) => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`${AppConfig.env}/members/${partnerId}`)
      .update({
        workIn: parseInt(workIn) + 1,
        workPoint: parseInt(workPoint) + 10,
        sys_update_date: new Date().toUTCString()
      })
      .then((result) => {
        resolve(true)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const saveHistoryStar = (partnerId, postId, rate = 5) => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`${AppConfig.env}/partner_star/${partnerId}/${postId}`)
      .update({
        star: rate,
        sys_update_date: new Date().toUTCString()
      })
      .then((result) => {
        resolve(true)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const filterPostsToUpdate = () => {
  const date1 = Moment()
  /*
  เงื่อนไขการตัดโพสต์ออกจากหน้าจอ ของระบบ ทุกโหมด
    1 กรณี ที่อนุมัติ โพสต์แล้ว ภายใน 4 ชั่วโมงถ้ายังไม่มี Partner เสนองานเข้ามา ระบบจะตัดออก 
    2 กรณี ที่มีการเสนองานแล้วและยังไม่มีการชำระเงินภายใน 4 ชั่วโมงระบบจะตัด โพสต์นั้นออก
    3 กรณี Partner ไม่กดเริ่มงาน หรือ กดเสร็จงาน  หรือ ลูกค้ากดให้คะแนน หลังจาก Admin กดยืนยันการชำระเงิน  24 Hr.
    ระบบจะดำเนินการแทน และให้คะแนน Partner 5 ดาว และให้แต้ม 10 แต้ม ถือว่าโพสต์ เสร็จ สมบูรณ์
    4 กรณีที่ลูกค้าโพสต์ระบบจะไม่ Time Out ให้  Adminจะต้อง อนุมัติกับไม่อนุมัติเท่านั้น
  */
  return new Promise((resolve, reject) => {
    const ref = firebase.database().ref(`${AppConfig.env}/posts`)
    ref.once("value", (snapshot) => {
      const posts = { ...snapshot.val() }
      for (let key in posts) {
        const post = posts[key]
        const date2 = Moment(post.sys_update_date)
        const diffHours = date1.diff(date2, "hours")
        if (post.status === AppConfig.PostsStatus.customerNewPostDone) {
          if (diffHours > 24) {
            updatePosts(post.id, {
              status: AppConfig.PostsStatus.postTimeout,
              statusText: "ข้อมูลการโพสท์ใหม่หมดอายุ",
              sys_update_date: new Date().toUTCString(),
              system_action: "auto"
            })
          }
        } else if (
          post.status === AppConfig.PostsStatus.adminConfirmNewPost ||
          post.status === AppConfig.PostsStatus.waitCustomerSelectPartner
        ) {
          if (diffHours > 4) {
            updatePosts(post.id, {
              status: AppConfig.PostsStatus.postTimeout,
              statusText: "ข้อมูลการโพสท์หมดอายุ หลังจากอนุมัติเกิน 4 ชั่วโมง",
              sys_update_date: new Date().toUTCString(),
              system_action: "auto"
            })
          }
        } else if (post.status === AppConfig.PostsStatus.adminConfirmPayment) {
          if (diffHours > 24) {
            ;(async () => {
              const partnerList = post.partnerSelect
              for (let key1 in partnerList) {
                const partnerObj = partnerList[key1]
                await updateMemberPoint(
                  partnerObj.workIn,
                  partnerObj.workPoint,
                  partnerObj.partnerId
                )
                await saveHistoryStar(partnerObj.partnerId, post.id, 5)
              }

              updatePosts(post.id, {
                status: AppConfig.PostsStatus.closeJob,
                statusText: "ปิดงานด้วยระบบอัตโนมัติ",
                sys_update_date: new Date().toUTCString(),
                system_action: "auto"
              })
            })() // end update
          }
        }
      }
    })
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
  adminSaveConfirmPayment,
  checkMobileNumberWithLink,
  getAppConfig,
  updateAppConfig,
  filterPostsToUpdate,
  updateMemberPoint,
  saveHistoryStar
}
