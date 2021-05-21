import React from "react"
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  ScrollView,
} from "react-native"
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons"
import { Button, CheckBox } from "react-native-elements"

import bg from "../../../assets/login.png"

const RegisterPartnerForm = (props) => {
  const { navigate } = props.navigation
  const [workIn, setWorkIn] = React.useState(true)
  const [workOut, setWorkOut] = React.useState(false)

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
        width: 300,
      }}
    >
      {type === "m" && (
        <MaterialCommunityIcons name={icon} size={24} color="black" />
      )}
      {type === "m2" && (
        <MaterialIcons name={icon} size={24} color="black" />
      )}
      {type === "a" && <FontAwesome name={icon} size={24} color="black" />}
      {type === "i" && <AntDesign name={icon} color="#00716F" size={20} />}
      {type === "i2" && <Ionicons name={icon} size={24} color="black" />}
      {type === "a5" && <FontAwesome5 name={icon} size={24} color="black" />}
      <TextInput style={styles.textInput} placeholder={label} />
    </View>
  )

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.image} source={bg} />
        <Text style={styles.textFormInfo}>รายละเอียดการรับงาน</Text>
        <InputForm icon="mobile-phone" label="เบอร์โทรศัพท์" type="a" />
        <InputForm icon="home-work" label="จังหวัด" type="m2" />
        <InputForm icon="home-work" label="อำเภอ" type="m2" />
        <InputForm icon="home-work" label="คอนโด/ตึก/หมู่บ้าน" type="m2" />
        <InputForm icon="line" label="LINE ID" type="a5" />
        <Button
          title="เพิ่มข้อมูลถัดไป"
          iconLeft
          icon={
            <AntDesign
              name="bank"
              color="white"
              size={24}
              style={{ marginHorizontal: 15 }}
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
            marginBottom: 20,
          }}
          onPress={() => navigate("Partner-Register-Bank-Form")}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "snow",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 100,
    width: 100,
    // marginBottom: 10,
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

export default RegisterPartnerForm
