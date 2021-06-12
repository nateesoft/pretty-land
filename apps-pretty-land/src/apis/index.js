import uuid from "react-native-uuid"
import { Alert } from "react-native"

import firebase from "../../util/firebase"
import { snapshotToArray } from "../../util"

export const saveMemberRegister = (member, navigation) => {
  firebase
    .database()
    .ref("members")
    .orderByChild("username")
    .equalTo(member.username)
    .once("value", (snapshot) => {
      const data = snapshotToArray(snapshot)
      if (data.length === 0) {
        const newId = uuid.v4()
        const saveData = {
          id: newId,
          sys_create_date: new Date().toUTCString(),
          sys_update_date: new Date().toUTCString(),
          ...member,
        }
        firebase.database().ref(`members/${newId}`).set(saveData)
        Alert.alert(
          "กระบวนการสมบูรณ์",
          "บันทึกข้อมูลเรียบร้อย สามารถ login เข้าสู่ระบบได้"
        )
        navigation.popToTop()
        navigation.navigate("Login-Form")
      } else {
        Alert.alert(
          "แจ้งเตือน",
          `ข้อมูลผู้ใช้งาน: ${member.username} มีอยู่แล้ว`,
          [{ text: "OK" }]
        )
      }
    })
}

export const saveNewPosts = (postData, navigation) => {
  const newId = uuid.v4()
  const saveData = {
    id: newId,
    sys_create_date: new Date().toUTCString(),
    sys_update_date: new Date().toUTCString(),
    ...postData,
  }
  firebase.database().ref(`posts/${newId}`).set(saveData)
  navigation.navigate("Partner-Category")
}

export const updatePosts = (postId, data) => {
  firebase.database().ref(`posts/${postId}`).update(data)
}

export const saveProvincesGroupPostPartner = (data, addNumber) => {
  const { province, provinceName, partnerType } = data
  const newUpdateData = {
    provinceId: province,
    provinceName: provinceName,
    partner1: partnerType === "pretty-mc" ? addNumber : 0,
    partner2: partnerType === "coyote" ? addNumber : 0,
    partner3: partnerType === "pretty-entertain" ? addNumber : 0,
    partner4: partnerType === "pretty-massage" ? addNumber : 0,
  }
  firebase
    .database()
    .ref(`group_posts/${province}`)
    .once("value", (data) => {
      if (data.numChildren() > 0) {
        const updateData = {}
        if (partnerType === "pretty-mc") {
          updateData.partner1 = parseInt(data.val().partner1) + addNumber
        }
        if (partnerType === "coyote") {
          updateData.partner2 = parseInt(data.val().partner2) + addNumber
        }
        if (partnerType === "pretty-entertain") {
          updateData.partner3 = parseInt(data.val().partner3) + addNumber
        }
        if (partnerType === "pretty-massage") {
          updateData.partner4 = parseInt(data.val().partner4) + addNumber
        }
        firebase.database().ref(`group_posts/${province}`).update(updateData)
      } else {
        firebase
          .database()
          .ref(`group_posts/${province}`)
          .set({ ...newUpdateData })
      }
    })
}

export const partnerAcceptJobWaitCustomerReview = (item, profile) => {
  const {
    id: postId,
    province,
    provinceName,
    partnerRequest: partnerType,
  } = item

  // update post status
  updatePosts(postId, {
    status: "wait_customer_select_partner",
    statusText: "รอลูกค้าเลือกผู้ร่วมงาน",
  })

  // update partnerSelect
  const data = {
    partnerId: profile.id,
    partnerName: profile.name,
    amount: profile.amount,
    place: profile.place,
    phone: profile.phone,
    age: profile.age,
    image: profile.image || null,
    sex: profile.sex,
    character: profile.character,
    selectStatus: "wait_customer_select",
    selectStatusText: "รอลูกค้าเลือกผู้ร่วมงาน",
  }
  firebase
    .database()
    .ref(`posts/${postId}/partnerSelect/${profile.id}`)
    .update(data)
  saveProvincesGroupPostPartner({ province, provinceName, partnerType }, -1)
}
