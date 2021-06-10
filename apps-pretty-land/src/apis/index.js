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
