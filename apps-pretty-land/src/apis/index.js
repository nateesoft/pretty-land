import uuid from "react-native-uuid"

import firebase from "../../util/firebase"
import { getDocument } from "../../util"
import { AppConfig } from "../Constants"

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

// for admin notification api
export const getAdminNewPostFromDb = () => {
  return new Promise((resolve, reject) => {
    resolve(1)
  })
}

export const getAdminNewMemberFromDb = () => {
  return new Promise((resolve, reject) => {
    resolve(1)
  })
}

export const getAdminDashboardType1 = () => {
  return new Promise((resolve, reject) => {
    resolve(1)
  })
}
export const getAdminDashboardType2 = () => {
  return new Promise((resolve, reject) => {
    resolve(1)
  })
}
export const getAdminDashboardType3 = () => {
  return new Promise((resolve, reject) => {
    resolve(1)
  })
}
export const getAdminDashboardType4 = () => {
  return new Promise((resolve, reject) => {
    resolve(1)
  })
}

// for customer notification api
export const getCustomerPostChange = () => {
  return new Promise((resolve, reject) => {
    resolve(1)
  })
}

export const getCustomerDashboardType1 = () => {
  return new Promise((resolve, reject) => {
    resolve(1)
  })
}
export const getCustomerDashboardType2 = () => {
  return new Promise((resolve, reject) => {
    resolve(1)
  })
}
export const getCustomerDashboardType3 = () => {
  return new Promise((resolve, reject) => {
    resolve(1)
  })
}
export const getCustomerDashboardType4 = () => {
  return new Promise((resolve, reject) => {
    resolve(1)
  })
}

// for partner notification api
export const getPartnerRequestChange = () => {
  return new Promise((resolve, reject) => {
    resolve(1)
  })
}
export const getPartnerMyPostChange = () => {
  return new Promise((resolve, reject) => {
    resolve(1)
  })
}
export const getPartnerDashboardType1 = () => {
  return new Promise((resolve, reject) => {
    resolve(1)
  })
}
export const getPartnerDashboardType2 = () => {
  return new Promise((resolve, reject) => {
    resolve(1)
  })
}
export const getPartnerDashboardType3 = () => {
  return new Promise((resolve, reject) => {
    resolve(1)
  })
}
export const getPartnerDashboardType4 = () => {
  return new Promise((resolve, reject) => {
    resolve(1)
  })
}
