import React, { useState } from "react"
import { View, StyleSheet, Text, Image, TextInput, Alert } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { Button } from "react-native-elements/dist/buttons/Button"
import base64 from "react-native-base64"
import uuid from "react-native-uuid"

import firebase from "../../../util/firebase"
import { GetIcon } from "../../components/GetIcons"
import bg from "../../../assets/login.png"

const RegisterLoginForm = ({ navigation, route }) => {
  const { navigate } = navigation
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")

  const encryptPassword = (password) => {
    return base64.encode(password)
  }

  const saveAndGoLoginForm = () => {
    if (!username) {
      Alert.alert("กรุณาระบุชื่อเข้าใช้งาน")
      return
    }
    if (!password) {
      Alert.alert("กรุณาระบุรหัสผ่าน เพื่อเข้าใช้งาน")
      return
    }
    if (!rePassword) {
      Alert.alert("กรุณายืนยันรหัสผ่าน")
      return
    }
    if (password !== rePassword) {
      Alert.alert("รหัสผ่าน และรหัสยืนยันจะต้องตรงกัน !!!")
      return
    }

    // save data to firebase
    const newId = uuid.v4()
    const data = {
      id: newId,
      username,
      password: encryptPassword(password),
      memberType: "partner",
      status: "new_register",
      statusText: "สมัครเป็น Partner ใหม่",
    }
    firebase.database().ref(`members/${newId}`).set(data)

    Alert.alert("บันทึกข้อมูลเรียบร้อย สามารถ login เข้าสู่ระบบได้")
    navigation.popToTop()
    navigate("Login-Form")
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={bg} />
      <Text style={styles.textLogo}>PRETTY LAND</Text>
      <Text style={styles.textFormInfo}>ข้อมูลสำหรับเข้าใช้งานระบบ</Text>
      <View style={styles.formControl}>
        <GetIcon type="ad" name="user" />
        <TextInput
          style={styles.textInput}
          placeholder="ข้อมูลผู้ใช้งาน"
          value={username}
          onChangeText={(value) => setUsername(value)}
        />
      </View>
      <View style={styles.formControl}>
        <GetIcon type="mci" name="form-textbox-password" />
        <TextInput
          style={styles.textInput}
          placeholder="กำหนดรหัสผ่าน"
          secureTextEntry={true}
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
      </View>
      <View style={styles.formControl}>
        <GetIcon type="mci" name="form-textbox-password" />
        <TextInput
          style={styles.textInput}
          placeholder="ยืนยันรหัสผ่านอีกครั้ง"
          secureTextEntry={true}
          value={rePassword}
          onChangeText={(value) => setRePassword(value)}
        />
      </View>
      <Button
        title="บันทึกข้อมูล"
        iconLeft
        icon={
          <AntDesign
            name="save"
            color="white"
            size={24}
            style={{ marginHorizontal: 8 }}
          />
        }
        buttonStyle={{
          backgroundColor: "#ff2fe6",
          marginTop: 20,
          borderRadius: 25,
          width: 250,
          paddingHorizontal: 15,
          height: 45,
          borderWidth: 0.5,
        }}
        onPress={() => saveAndGoLoginForm()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "snow",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -120,
  },
  image: {
    height: 100,
    width: 100,
    marginBottom: 10,
  },
  textLogo: {
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "purple",
  },
  textDetail: {
    fontSize: 12,
    fontWeight: "bold",
    color: "gray",
    marginBottom: 20,
  },
  btnFacebook: {
    marginHorizontal: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    backgroundColor: "blue",
    paddingVertical: 2,
    borderRadius: 23,
  },
  textOr: {
    fontSize: 14,
    color: "gray",
    marginTop: 50,
  },
  textInput: {
    backgroundColor: "white",
    width: 250,
    textAlign: "center",
    fontSize: 16,
    marginVertical: 5,
  },
  textRegister: {
    color: "purple",
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  textFooter: {
    position: "absolute",
    bottom: 80,
    width: "90%",
    textAlign: "center",
    flexWrap: "wrap",
    fontSize: 12,
    color: "gray",
  },
  textFormInfo: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
  },
  formControl: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    paddingHorizontal: 10,
    borderColor: "#00716F",
    backgroundColor: "white",
    marginTop: 5,
    height: 40,
    borderRadius: 50,
  },
})

export default RegisterLoginForm
