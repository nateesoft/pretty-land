import React, { useState } from "react"
import { StyleSheet, View, ImageBackground, Alert } from "react-native"
import { Button, Text, Input, CheckBox } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"
import base64 from "react-native-base64"
import uuid from "react-native-uuid"
import DropDownPicker from "react-native-dropdown-picker"

import { snapshotToArray } from "../../../../util"
import firebase from "../../../../util/firebase"
import bgImage from "../../../../assets/bg.png"

const AddNewAdminForm = ({ navigation, route }) => {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")

  const [openMemberType, setOpenMemberType] = useState(false)
  const [memberType, setMemberType] = useState("")
  const [memberTypesLists, setMemberTypeList] = useState([
    { label: "superadmin", value: "superadmin" },
    { label: "admin", value: "admin" },
    { label: "manager", value: "manager" },
    { label: "customer", value: "customer" },
    { label: "partner", value: "partner" },
    { label: "demo", value: "demo" },
  ])

  const saveNewAdmin = () => {
    if (!username) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุข้อมูลผู้ใช้งาน")
      return
    }
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

    let dataNewAdmin = {
      id: uuid.v4(),
      profile: name,
      username,
      password: base64.encode(password),
      memberType,
      status_priority: 10,
      status: "active",
    }

    if (
      memberType !== "admin" &&
      memberType !== "superadmin" &&
      memberType !== "manager"
    ) {
      dataNewAdmin = {
        id: uuid.v4(),
        profile: name,
        username,
        password: base64.encode(password),
        memberType,
        status: "active",
        customerLevel: 0,
        status_priority: 1,
      }
    }

    firebase
      .database()
      .ref(`members`)
      .orderByChild("username")
      .equalTo(username)
      .once("value", (snapshot) => {
        const data = snapshotToArray(snapshot)
        if (data.length === 0) {
          firebase
            .database()
            .ref(`members/${dataNewAdmin.id}`)
            .set(dataNewAdmin)
          Alert.alert("สำเร็จ", "บันทึกข้อมูลเรียบร้อยแล้ว")
          setUsername("")
          setPassword("")
          setRePassword("")
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
          <Text style={{ fontSize: 18 }}>ชื่อผู้ใช้งาน (name)</Text>
          <Input
            leftIcon={{ type: "ant-design", name: "idcard" }}
            style={styles.inputForm}
            onChangeText={(value) => setName(value)}
            value={name}
          />
          <Text style={{ fontSize: 18 }}>
            ข้อมูลชื่อผู้ใช้งาน (username) ในระบบ
          </Text>
          <Input
            leftIcon={{ type: "font-awesome", name: "address-book" }}
            style={styles.inputForm}
            onChangeText={(value) => setUsername(value)}
            value={username}
          />
          <Text style={{ fontSize: 18 }}>กำหนดรหัสผ่าน (password)</Text>
          <Input
            leftIcon={{ type: "font-awesome", name: "lock" }}
            style={styles.inputForm}
            onChangeText={(value) => setPassword(value)}
            value={password}
            secureTextEntry={true}
          />
          <Text style={{ fontSize: 18 }}>ยืนยันรหัสผ่านใหม่ (re-password)</Text>
          <Input
            leftIcon={{ type: "font-awesome", name: "lock" }}
            style={styles.inputForm}
            onChangeText={(value) => setRePassword(value)}
            value={rePassword}
            secureTextEntry={true}
          />
        </View>
        <View style={{ alignSelf: "center", zIndex: 1 }}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            ประเภทผู้ใช้งาน
          </Text>
          <DropDownPicker
            placeholder="ประเภทผู้ใช้งาน"
            open={openMemberType}
            setOpen={setOpenMemberType}
            value={memberType}
            setValue={setMemberType}
            items={memberTypesLists}
            setItems={setMemberTypeList}
            textStyle={{ fontSize: 18 }}
            zIndex={2}
            searchable={false}
            selectedItemContainerStyle={{ backgroundColor: "#facaff" }}
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
    borderRadius: 5,
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
