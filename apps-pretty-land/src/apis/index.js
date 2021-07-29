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

export const getMemberProfile = (customerId) => {
  return new Promise((resolve, reject) => {
    const ref = firebase
      .database()
      .ref(getDocument(`members/${customerId}`))
    ref.once("value", (snapshot) => {
      const customerData = { ...snapshot.val() }
      resolve(customerData)
    })
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
    })

    getMemberProfile(item.customerId).then((cust) => {
      // update level to customer
      firebase
        .database()
        .ref(getDocument(`members/${item.customerId}`))
        .update({
          customerLevel: cust.customerLevel + 1
        })
    })
    resolve(true)
  })
}

export const createMessageAlert = (data) => {
  // const dataExample = {
  //   func_type: "new_post",
  //   func_detail: "customer create new post",
  //   show_admin: "all||person",
  //   show_admin_id: "",
  //   show_customer: "all||person",
  //   show_customer_id: "",
  //   show_partner: "all||person",
  //   show_partner_type: "1",
  //   show_partner_sex: "female",
  //   show_partner_id: "",
  //   show_dashboard_type: "1",
  //   show_tab_name: "",
  // }
  const msg_id = uuid.v4()
  firebase
    .database()
    .ref(getDocument(`message_alert/${msg_id}`))
    .update({ ...data, sys_date: new Date().toUTCString() })
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
export const getAdminDashboardType = (type) => {
  return new Promise((resolve, reject) => {
    const ref = firebase.database().ref(getDocument(`message_alert`))
    ref.once("value", (snapshot) => {
      const data = snapshot.val()
      let count = 0
      for (let key in data) {
        const obj = data[key]
        if (
          obj.show_admin === "all" &&
          (obj.func_type === `new_post` || obj.func_type === `validate_slip`) &&
          obj.show_dashboard_type === `${type}`
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

// for partner notification api
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
