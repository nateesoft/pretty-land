import React from "react"
import { View, StyleSheet, Text, Image, TextInput } from "react-native"
import Icon from "@expo/vector-icons/AntDesign"
import { Button } from "react-native-elements/dist/buttons/Button"
import { MaterialCommunityIcons, FontAwesome5, FontAwesome } from "@expo/vector-icons"

import bg from "../../../assets/login.png"

const RegisterPartnerBankForm = (props) => {
  const { navigate } = props.navigation

  const InputForm = ({ label, icon, type = "i" }) => (
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
        borderRadius: 50,
      }}
    >
      {type === "a" && <FontAwesome5 name={icon} size={24} color="black" />}
      {type === "i" && <Icon name={icon} color="#00716F" size={20} />}
      {type === "m" && (
        <MaterialCommunityIcons name={icon} size={24} color="black" />
      )}
      <TextInput style={styles.textInput} placeholder={label} />
    </View>
  )

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={bg} />
      <Text style={styles.textLogo}>PRETTY LAND</Text>
      <Text style={styles.textDetail}>Love Your Moments</Text>
      <Text style={styles.textFormInfo}>ลงทะเบียนผู้ร่วมงาน</Text>
      <Text style={{ marginBottom: 5, color: "gray" }}>เพิ่มข้อมูลธนาคาร</Text>
      <InputForm icon="bank" label="เลือกธนาคาร" type="m" />
      <InputForm icon="money-check" label="ใส่เลขบัญชี" type='a' />
      <Button
        title="เพิ่มรูป และวิดีโอ"
        iconLeft
        icon={
          <Icon
            name="picture"
            color="white"
            size={24}
            style={{ marginHorizontal: 8 }}
          />
        }
        buttonStyle={{
          backgroundColor: "#4BA754",
          marginTop: 20,
          borderRadius: 25,
          width: 250,
          paddingHorizontal: 15,
          height: 45,
          borderWidth: 0.5,
        }}
        onPress={() => navigate("Partner-Register-Image-Form")}
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
})

export default RegisterPartnerBankForm
