import uuid from "react-native-uuid"
import { Alert } from "react-native"

import firebase from "../../util/firebase"
import { snapshotToArray } from "../../util"
import { AppConfig } from "../Constants"

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
}

export const updatePosts = (postId, data) => {
  firebase.database().ref(`posts/${postId}`).update(data)
}

export const partnerAcceptJobWaitCustomerReview = (item, profile) => {
  const { id: postId } = item

  // update post status
  updatePosts(postId, {
    status: AppConfig.PostsStatus.waitCustomerSelectPartner,
    statusText: "รอลูกค้าเลือกผู้ร่วมงาน",
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
    selectStatusText: "เสนอรับงาน",
  }
  firebase
    .database()
    .ref(`posts/${postId}/partnerSelect/${profile.id}`)
    .update(data)
}
