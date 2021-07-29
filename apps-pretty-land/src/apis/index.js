import uuid from "react-native-uuid"

import firebase from "../../util/firebase"
import { getDocument } from "../../util"
import { AppConfig } from "../Constants"

export const saveNewMember = (memberId, memberData) => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(getDocument(`members/${memberId}`))
      .set(memberData)
      .catch((err) => {
        reject(err)
      })

    // create message alert to admin
    createMessageAlert({
      func_type: "new_member",
      msg_alert_to: "admin",
      msg_alert_person: "all_admin",
      msg_detail: "partner register member",
      type: "badge"
    })
    resolve(true)
  })
}

export const saveNewPosts = (postData) => {
  const newId = uuid.v4()
  const saveData = {
    id: newId,
    sys_create_date: new Date().toUTCString(),
    sys_update_date: new Date().toUTCString(),
    ...postData
  }
  firebase
    .database()
    .ref(getDocument(`posts/${newId}`))
    .set(saveData)

  // create message alert to admin
  createMessageAlert({
    func_type: "new_post",
    msg_alert_to: "admin",
    msg_alert_person: "all_admin",
    msg_detail: "customer create new post",
    type: "badge"
  })
  createMessageAlert({
    func_type: `new_post_type_${postData.partnerType}`,
    msg_alert_to: "admin",
    msg_alert_person: "all_admin",
    msg_detail: "customer create new post",
    type: "dashboard"
  })
}

export const updatePosts = (postId, data) => {
  firebase
    .database()
    .ref(getDocument(`posts/${postId}`))
    .update(data)
}

export const partnerAcceptJobWaitCustomerReview = (item, profile) => {
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
    sex: profile.sex,
    character: profile.character,
    telephone: profile.mobile,
    selectStatus: AppConfig.PostsStatus.waitCustomerSelectPartner,
    selectStatusText: "เสนอรับงาน"
  }
  firebase
    .database()
    .ref(getDocument(`posts/${postId}/partnerSelect/${profile.id}`))
    .update(data)
}

export const getConfigList = () => {
  return new Promise((resolve, reject) => {
    const ref = firebase.database().ref(getDocument(`appconfig`))
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

export const savePaymentSlip = (dataPayment, item) => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(getDocument(`posts/${item.id}`))
      .update(dataPayment)

    // create message alert to admin
    createMessageAlert({
      func_type: "validate_slip",
      msg_alert_to: "admin",
      msg_alert_person: "all_admin",
      msg_detail: "customer upload slip payment for partner",
      type: "badge"
    })
    createMessageAlert({
      func_type: `validate_slip_type_${item.partnerType}`,
      msg_alert_to: "admin",
      msg_alert_person: "all_admin",
      msg_detail: `customer update slip payment type ${item.partnerType}`,
      type: "dashboard"
    })

    // create message alert to both customer and partner
    createMessageAlert({
      func_type: "post_approve",
      msg_alert_to: "customer,partner",
      msg_alert_person: `customer=${item.customerId},all_partner_type_${item.partnerType}`,
      msg_detail: "customer upload slip payment for partner",
      type: "badge"
    })

    resolve(true)
  })
}

export const adminConfirmNewPost = (item) => {
  return new Promise((resolve, reject) => {
    updatePosts(item.id, {
      status: AppConfig.PostsStatus.adminConfirmNewPost,
      statusText: "อนุมัติโพสท์",
      sys_update_date: new Date().toUTCString()
    })

    resolve(true)
  })
}

export const adminSaveConfirmPayment = (item, listPartner) => {
  return new Promise((resolve, reject) => {
    // save to firebase
    firebase
      .database()
      .ref(getDocument(`posts/${item.id}`))
      .update({
        status: AppConfig.PostsStatus.adminConfirmPayment,
        statusText: "ชำระเงินเรียบร้อยแล้ว",
        sys_update_date: new Date().toUTCString()
      })

    // update status partner in list
    listPartner.forEach((obj) => {
      firebase
        .database()
        .ref(getDocument(`posts/${item.id}/partnerSelect/${obj.partnerId}`))
        .update({
          selectStatus: AppConfig.PostsStatus.customerPayment,
          selectStatusText: "ชำระเงินเรียบร้อยแล้ว",
          sys_update_date: new Date().toUTCString()
        })

      // send to partner
      createMessageAlert({
        func_type: "validate_slip",
        msg_alert_to: "partner",
        msg_alert_person: `parnter=${obj.partnerId}`,
        msg_detail: "customer upload slip payment for partner",
        type: "badge"
      })
    })

    getMemberProfile().then((cust) => {
      // update level to customer
      firebase
        .database()
        .ref(getDocument(`members/${item.customerId}`))
        .update({
          customerLevel: cust.customerLevel + 1
        })
    })

    // send to customer
    createMessageAlert({
      func_type: "validate_slip",
      msg_alert_to: "customer",
      msg_alert_person: `customer=${item.customerId}`,
      msg_detail: "admin approve slip payment for partner",
      type: "badge"
    })

    resolve(true)
  })
}

export const createMessageAlert = ({
  func_type,
  msg_alert_person,
  msg_alert_to,
  msg_detail,
  type
}) => {
  const msg_id = uuid.v4()
  firebase
    .database()
    .ref(getDocument(`message_alert/${msg_id}`))
    .update({
      func_type,
      msg_alert_person,
      msg_alert_to,
      msg_detail,
      msg_id,
      sys_date: new Date().toUTCString(),
      type
    })
}

export const updateReadMessageAlert = (userId, msg_id) => {
  firebase
    .database()
    .ref(getDocument(`message_alert/${msg_id}/read/${uuid.v4()}`))
    .update({
      member_id: userId
    })
}

// for admin notification api
export const getAdminNewPostFromDb = (userId) => {
  return new Promise((resolve, reject) => {
    const ref = firebase.database().ref(getDocument(`message_alert`))
    ref.once("value", (snapshot) => {
      const data = snapshot.val()
      let count = 0
      for (let key in data) {
        const obj = data[key]
        if (
          obj.msg_alert_to === "admin" &&
          (obj.func_type === "new_post" || obj.func_type === "validate_slip") &&
          obj.type === "badge"
        ) {
          const arr = obj.read
          for (let a in arr) {
            if (arr[a].member_id !== userId) {
              count = count + 1
            }
          }
          if (!arr) {
            count = count + 1
          }
        }
      }
      resolve(count)
    })
  })
}

export const getAdminNewMemberFromDb = () => {
  return new Promise((resolve, reject) => {
    const ref = firebase.database().ref(getDocument(`message_alert`))
    ref.once("value", (snapshot) => {
      const data = snapshot.val()
      let count = 0
      for (let key in data) {
        const obj = data[key]
        if (
          obj.msg_alert_to === "admin" &&
          obj.func_type === "new_member" &&
          obj.type === "badge"
        ) {
          const arr = obj.read
          for (let a in arr) {
            if (arr[a].member_id !== userId) {
              count = count + 1
            }
          }
          if (!arr) {
            count = count + 1
          }
        }
      }
      resolve(count)
    })
  })
}

export const getAdminDashboardType = (type) => {
  return new Promise((resolve, reject) => {
    const ref = firebase.database().ref(getDocument(`message_alert`))
    ref.once("value", (snapshot) => {
      const data = snapshot.val()
      let count = 0
      for (let key in data) {
        const obj = data[key]
        if (
          obj.msg_alert_to === "admin" &&
          (obj.func_type === `new_post_type_${type}` ||
            obj.func_type === `validate_slip_type_${type}`) &&
          obj.type === "dashboard"
        ) {
          const arr = obj.read
          for (let a in arr) {
            if (arr[a].member_id !== userId) {
              count = count + 1
            }
          }
          if (!arr) {
            count = count + 1
          }
        }
      }
      resolve(count)
    })
  })
}

// for customer notification api
export const getCustomerPostChange = () => {
  return new Promise((resolve, reject) => {
    resolve(0)
  })
}

export const getCustomerDashboardType1 = () => {
  return new Promise((resolve, reject) => {
    resolve(0)
  })
}
export const getCustomerDashboardType2 = () => {
  return new Promise((resolve, reject) => {
    resolve(0)
  })
}
export const getCustomerDashboardType3 = () => {
  return new Promise((resolve, reject) => {
    resolve(0)
  })
}
export const getCustomerDashboardType4 = () => {
  return new Promise((resolve, reject) => {
    resolve(0)
  })
}

// for partner notification api
export const getPartnerRequestChange = () => {
  return new Promise((resolve, reject) => {
    resolve(0)
  })
}
export const getPartnerMyPostChange = () => {
  return new Promise((resolve, reject) => {
    resolve(0)
  })
}
export const getPartnerDashboardType1 = () => {
  return new Promise((resolve, reject) => {
    resolve(0)
  })
}
export const getPartnerDashboardType2 = () => {
  return new Promise((resolve, reject) => {
    resolve(0)
  })
}
export const getPartnerDashboardType3 = () => {
  return new Promise((resolve, reject) => {
    resolve(0)
  })
}
export const getPartnerDashboardType4 = () => {
  return new Promise((resolve, reject) => {
    resolve(0)
  })
}
