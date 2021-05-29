import React, { useState } from "react"
import { StyleSheet, View, ImageBackground, Alert } from "react-native"
import { Button, Text, Input, CheckBox } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"
import base64 from "react-native-base64"
import uuid from "react-native-uuid"

import { snapshotToArray } from "../../../../util"
import firebase from "../../../../util/firebase"
import bgImage from "../../../../assets/bg.png"

const AddNewAdminForm = ({ navigation, route }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")
  const [isSuperAdmin, setSuperAdmin] = useState(false)

  const saveNewAdmin = () => {
    if (!password) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุข้อมูลรหัสผ่านเดิม")
      return
    }
    if (!rePassword) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุข้อมูยืนยันรหัสใหม่")
      return
    }
    if (password !== rePassword) {
      Alert.alert("แจ้งเตือน", "รหัสผ่านใหม่ และรหัสผ่านใหม่่ไม่ตรงกัน")
      return
    }

    const dataNewAdmin = {
      id: uuid.v4(),
      username,
      password: base64.encode(password),
      memberType: isSuperAdmin ? "superadmin" : "admin",
      status_priority: 10,
    }
    firebase
      .database()
      .ref(`members`)
      .orderByChild("username")
      .equalTo(username)
      .once("value", (snapshot) => {
        const data = snapshotToArray(snapshot)
        if (data.length === 0) {
          firebase.database().ref(`members/${dataNewAdmin.id}`).set(dataNewAdmin)
          Alert.alert("สำเร็จ", "บันทึกข้อมูลเรียบร้อยแล้ว")
          setUsername("")
          setPassword("")
          setRePassword("")
          setSuperAdmin(false)
        } else {
          const user = data[0]
          Alert.alert(
            "แจ้งเตือน",
            `ข้อมูลผู้ใช้งาน: ${user.username} มีอยู่แล้ว`,
            [{ text: "OK" }]
          )
        }
      })
  }

  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <View style={styles.cardDetail}>
        <Text style={styles.textTopic}>เพิ่มข้อมูล Admin</Text>
        <View style={styles.viewCard}>
          <Text style={{ fontSize: 18 }}>ข้อมูลชื่อผู้ใช้งาน (admin) ในระบบ</Text>
          <Input
            placeholder="ข้อมูลผู้ใช้งานใหม่"
            leftIcon={{ type: "font-awesome", name: "address-book" }}
            style={styles.inputForm}
            onChangeText={(value) => setUsername(value)}
            value={username}
          />
          <Text style={{ fontSize: 18 }}>กำหนดรหัสผ่าน</Text>
          <Input
            placeholder="รหัสผ่าน"
            leftIcon={{ type: "font-awesome", name: "lock" }}
            style={styles.inputForm}
            onChangeText={(value) => setPassword(value)}
            value={password}
            secureTextEntry={true}
          />
          <Text style={{ fontSize: 18 }}>ยืนยันรหัสผ่านใหม่</Text>
          <Input
            placeholder="ยืนยันรหัสผ่าน"
            leftIcon={{ type: "font-awesome", name: "lock" }}
            style={styles.inputForm}
            onChangeText={(value) => setRePassword(value)}
            value={rePassword}
            secureTextEntry={true}
          />
          <CheckBox
            title="กำหนดเป็นผู้ดูแลระบบหลัก"
            checked={isSuperAdmin}
            onPress={() => setSuperAdmin(!isSuperAdmin)}
            textStyle={{ fontSize: 16 }}
            containerStyle={{ backgroundColor: null, borderColor: "#ff2fe6" }}
          />
        </View>
        <Button
          icon={
            <Icon
              name="save"
              size={20}
              color="white"
              style={{ marginRight: 5 }}
            />
          }
          iconLeft
          buttonStyle={styles.btnSave}
          title="เพิ่มข้อมูล"
          onPress={() => saveNewAdmin()}
        />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  btnSave: {
    margin: 15,
    paddingHorizontal: 50,
    borderRadius: 55,
    backgroundColor: "#ff2fe6",
  },
  cardDetail: {
    flex: 1,
    alignItems: "center",
    padding: 5,
    margin: 10,
  },
  optionsNameDetail: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginBottom: 15,
    marginTop: 10,
  },
  optionsNameDetail2: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginBottom: 15,
    marginTop: 10,
  },
  viewCard: {
    width: "100%",
    borderRadius: 20,
    padding: 5,
  },
  textTopic: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginBottom: 15,
    marginTop: 10,
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  inputForm: {
    marginLeft: 10,
  },
})

export default AddNewAdminForm
