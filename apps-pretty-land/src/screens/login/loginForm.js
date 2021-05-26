import React, { useState, useContext } from "react"
import { View, StyleSheet, Text, Image, TextInput, Alert } from "react-native"
import Icon from "@expo/vector-icons/AntDesign"
import { Button } from "react-native-elements/dist/buttons/Button"

import bg from "../../../assets/login.png"
import { Context as AuthContext } from "../../context/AuthContext"

const LoginForm = ({ navigation, route }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { signIn } = useContext(AuthContext)

  const validateLogin = () => {
    if (username && password) {
      signIn({ username, password, screen: "admin" })
    } else {
      Alert.alert("กรุณาระบุข้อมูลผู้ใช้งาน และรหัสผ่านให้ครบถ้วน !!!")
    }
  }

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
          borderRadius: 10,
        }}
      >
        <Icon name="user" color="#00716F" size={20} />
        <TextInput
          style={styles.textInput}
          placeholder="ข้อมูลผู้ใช้งาน"
          value={username}
          onChangeText={(value) => setUsername(value)}
        />
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
          borderRadius: 10,
        }}
      >
        <Icon name="lock" color="#00716F" size={20} />
        <TextInput
          secureTextEntry={true}
          style={styles.textInput}
          placeholder="รหัสผาน"
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
      </View>
      <Button
        title="LOGIN"
        buttonStyle={{
          backgroundColor: "#ff2fe6",
          marginTop: 20,
          borderRadius: 25,
          width: 250,
          paddingHorizontal: 15,
          height: 45,
          borderWidth: 0.5,
        }}
        onPress={() => validateLogin()}
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
})

export default LoginForm
