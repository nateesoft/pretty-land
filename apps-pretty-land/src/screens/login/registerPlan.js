import React from "react"
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  ScrollView,
} from "react-native"
import { AntDesign, Fontisto, Foundation, MaterialIcons } from "@expo/vector-icons"
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons"
import { Button, CheckBox } from "react-native-elements"
import { RadioButton } from "react-native-paper"

import bg from "../../../assets/login.png"

const RegisterPlanForm = (props) => {
  const { navigate } = props.navigation
  const [type1, setType1] = React.useState(false)
  const [type2, setType2] = React.useState(false)
  const [type3, setType3] = React.useState(false)
  const [type4, setType4] = React.useState(false)
  const [sexType, setSexType] = React.useState("female")

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
        <Text style={styles.textFormInfo}>เพิ่มข้อมูลส่วนตัว</Text>
        <Text style={{ marginBottom: 10, fontSize: 16 }}>ประเภทงานที่รับ</Text>
        <View style={{ width: "80%", marginHorizontal: 20, padding: 10 }}>
          <CheckBox
            title="พริตตี้ (Pretty)/ MC"
            checked={type1}
            onPress={() => setType1(!type1)}
          />
          {type1 && <InputForm icon="money" label="ค่าบริการ Pretty/MC" type="a" />}
          <CheckBox
            title="โคโยตี้ (Coyote)"
            checked={type2}
            onPress={() => setType2(!type2)}
          />
          {type2 && <InputForm icon="money" label="ค่าบริการ Coyote" type="a" />}
          <CheckBox
            title="พริตตี้ (Pretty) Entertain"
            checked={type3}
            onPress={() => setType3(!type3)}
          />
          {type3 && <InputForm icon="money" label="ค่าบริการ Pretty Entertain" type="a" />}
          <CheckBox
            title="พริตตี้ (Pretty) นวดแผนไทย"
            checked={type4}
            onPress={() => setType4(!type4)}
          />
          {type4 && <InputForm icon="money" label="ค่าบริการ Pretty นวดแผนไทย" type="a" />}
        </View>
        <View style={{ flexDirection: "row", width: "90%", backgroundColor: "#eee", borderRadius: 25, margin: 5, padding: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <RadioButton
              value="female"
              status={sexType === "female" ? "checked" : "unchecked"}
              onPress={() => setSexType("female")}
              color="black"
            />
            <Fontisto
              name="female"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
            <Text>Female</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <RadioButton
              value="male"
              status={sexType === "male" ? "checked" : "unchecked"}
              onPress={() => setSexType("male")}
              color="black"
            />
            <Fontisto
              name="male"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
            <Text>Male</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <RadioButton
              value="other"
              status={sexType === "other" ? "checked" : "unchecked"}
              onPress={() => setSexType("other")}
              color="black"
            />
            <Foundation
              name="torsos-all-female"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
            <Text>Other</Text>
          </View>
        </View>
        <InputForm icon="timeline-clock" label="อายุ" type="m" />
        <InputForm icon="human-male-height" label="ส่วนสูง" type="m" />
        <InputForm icon="md-woman-outline" label="สัดส่วน 32-24-35" type="i2" />
        <InputForm icon="weight" label="น้ำหนัก" type="a5" />
        <Button
          title="เพิ่มข้อมูลถัดไป"
          iconLeft
          icon={
            <MaterialIcons
              name="meeting-room"
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
          onPress={() => navigate("Register-Partner-Form")}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "white",
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

export default RegisterPlanForm
