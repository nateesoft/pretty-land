import React from "react"
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native"
import Icon from "@expo/vector-icons/AntDesign"
import { Button } from "react-native-elements/dist/buttons/Button"

import bg from "../../../assets/login.png"

const partnerTypeList = [
  "Pretty/Mc",
  "Pretty Entertain",
  "Coyote",
  "Pretty Massage",
]

const RegisterPartnerImageForm = ({ navigation }) => {
  const saveAndGoLoginForm = () => {
    navigation.navigate("Partner-Login-Form")
  }

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
      {type === "i" && <Icon name={icon} color="#00716F" size={20} />}
      <TextInput style={styles.textInput} placeholder={label} />
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={bg} />
      <Text style={styles.textLogo}>PRETTY LAND</Text>
      <Text style={styles.textFormInfo}>เพิ่มรูปภาพ และวิดีโอ</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {partnerTypeList.map((item, index) => (
          <View
            key={index}
            style={{
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#eee",
              padding: 10,
              borderRadius: 25,
              marginTop: 5,
              backgroundColor: "pink",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            <Text
              style={{ marginBottom: 5, fontWeight: "bold", color: "blue" }}
            >
              ประเภท {item}
            </Text>
            <InputForm icon="picture" label="รูปภาพ1" />
            <InputForm icon="picture" label="รูปภาพ2" />
            <InputForm icon="picture" label="รูปภาพ3" />
            <InputForm icon="picture" label="รูปภาพ4" />
            <InputForm icon="picture" label="รูปภาพ5" />
            <InputForm icon="videocamera" label="วิดีโอ" />
          </View>
        ))}
      </ScrollView>
      <Button
        title="เพิ่มข้อมูลถัดไป"
        iconLeft
        icon={
          <Icon
            name="lock"
            color="white"
            size={24}
            style={{ marginHorizontal: 8 }}
          />
        }
        buttonStyle={{
          backgroundColor: "#65A3E1",
          marginTop: 20,
          borderRadius: 25,
          width: 250,
          paddingHorizontal: 15,
          height: 45,
          borderWidth: 0.5,
        }}
        onPress={() => saveAndGoLoginForm()}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "snow",
    alignItems: "center",
    justifyContent: "center",
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

export default RegisterPartnerImageForm
