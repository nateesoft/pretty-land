import React from "react"
import { View, StyleSheet, Text, Image, TextInput } from "react-native"
import Icon from "@expo/vector-icons/AntDesign"
import Icon2 from "react-native-vector-icons/FontAwesome"
import { Button } from "react-native-elements/dist/buttons/Button"

import bg from "../../../assets/login.png"
import LineLogo from "../../../assets/icons/line-logo.png"

const LoginScreen = (props) => {
  const { navigate } = props.navigation

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={bg} />
      <Text style={styles.textLogo}>PRETTY LAND</Text>
      <Text style={styles.textDetail}>Love Your Moments</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 0.5,
          paddingHorizontal: 10,
          borderColor: "#00716F",
          backgroundColor: "white",
          height: 40,
        }}
      >
        <Icon name="user" color="#00716F" size={20} />
        <TextInput style={styles.textInput} placeholder="ข้อมูลผู้ใช้งาน" />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 0.5,
          paddingHorizontal: 10,
          borderColor: "#00716F",
          backgroundColor: "white",
          marginTop: 5,
          height: 40,
        }}
      >
        <Icon name="lock" color="#00716F" size={20} />
        <TextInput
          secureTextEntry={true}
          style={styles.textInput}
          placeholder="รหัสผาน"
        />
      </View>
      <Button
        title="LOGIN"
        buttonStyle={{
          backgroundColor: "#83ACFF",
          marginTop: 20,
          borderRadius: 25,
          width: 250,
          paddingHorizontal: 15,
          height: 45,
          borderWidth: 0.5,
        }}
      />
      <Text style={styles.textFooter}>
        การล็อกอิน หมายถึงคุณตกลง ข้อกำหนดในการใช้งาน, สัญญาบรอดแคสเตอร์ &
        นโยบายสิทธิส่วนบุคคล (คุณต้องถึงเกณฑ์อายุขั้นต่ำในการใช้ Bigo)
      </Text>
      <Text
        style={{
          position: "absolute",
          bottom: 60,
          fontSize: 12,
          fontWeight: "bold",
          marginTop: 5,
          color: "purple",
        }}
      >
        Copyright © 2020 all right reserved
      </Text>
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
    opacity: 0.65,
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
    marginVertical: 15,
    fontSize: 14,
    color: "gray",
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
})

export default LoginScreen
