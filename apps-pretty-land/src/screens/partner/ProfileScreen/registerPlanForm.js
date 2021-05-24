import React, { useState } from "react"
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native"
import { Fontisto, Foundation, MaterialIcons } from "@expo/vector-icons"
import { Button, CheckBox } from "react-native-elements"
import { RadioButton } from "react-native-paper"

import { GetIcon } from "../../../components/GetIcons"
import bg from "../../../../assets/login.png"

const RegisterPlanForm = (props) => {
  const { navigate } = props.navigation
  const [type1, setType1] = useState(false)
  const [type2, setType2] = useState(false)
  const [type3, setType3] = useState(false)
  const [type4, setType4] = useState(false)
  const [sexType, setSexType] = useState("female")
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [stature, setStature] = useState("")
  const [price4, setPrice4] = useState(0)

  const handleNexData = () => {
    if (!type1 && !type2 && !type3 && !type4) {
      Alert.alert("กรุณาระบุประเภทงานที่ต้องการรับบริการ !!!")
      return
    }
    if(!age){
      Alert.alert("กรุณาระบุอายุ")
      return
    }
    if(!height){
      Alert.alert("กรุณาระบุส่วนสูง")
      return
    }
    if(!weight){
      Alert.alert("กรุณาระบุน้ำหนัก")
      return
    }
    if(!stature){
      Alert.alert("กรุณาระบุสัดส่วน")
      return
    }
    navigate("Register-Partner-Form", {
      partnerData: {
        workType1: type1 ? "Y" : "N",
        workType2: type2 ? "Y" : "N",
        workType3: type3 ? "Y" : "N",
        workType4: type4 ? "Y" : "N",
        sex: sexType,
        name,
        age,
        height,
        stature,
        weight,
        typePrice4: price4,
      },
    })
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={styles.container}>
          <Image style={styles.image} source={bg} />
          <Text style={styles.textFormInfo}>เพิ่มข้อมูลส่วนตัว</Text>
          <Text style={{ marginBottom: 10, fontSize: 16 }}>
            ประเภทงานที่รับ
          </Text>
          <View style={{ width: "80%" }}>
            <CheckBox
              title="พริตตี้ (Pretty)/ MC"
              checked={type1}
              onPress={() => setType1(!type1)}
            />
            <CheckBox
              title="โคโยตี้ (Coyote)"
              checked={type2}
              onPress={() => setType2(!type2)}
            />
            <CheckBox
              title="พริตตี้ (Pretty) Entertain"
              checked={type3}
              onPress={() => setType3(!type3)}
            />
            <CheckBox
              title="พริตตี้ (Pretty) นวดแผนไทย"
              checked={type4}
              onPress={() => setType4(!type4)}
            />
            {type4 && (
              <View style={styles.formControl}>
                <GetIcon type="fa" name="money" />
                <TextInput
                  value={`${price4}`}
                  onChangeText={(value) => setPrice4(value)}
                  style={styles.textInput}
                  placeholder="ค่าบริการ"
                />
              </View>
            )}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              width: "80%",
              margin: 5,
              padding: 10,
            }}
          >
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
          <View style={styles.formControl}>
            <GetIcon type="mci" name="card-account-details" />
            <TextInput
              value={`${name}`}
              onChangeText={(value) => setName(value)}
              style={styles.textInput}
              placeholder="ชื่อเล่น/ชื่อในวงการ"
            />
          </View>
          <View style={styles.formControl}>
            <GetIcon type="mci" name="timeline-clock" />
            <TextInput
              value={`${age}`}
              onChangeText={(value) => setAge(value)}
              style={styles.textInput}
              placeholder="อายุ"
            />
          </View>
          <View style={styles.formControl}>
            <GetIcon type="mci" name="human-male-height" />
            <TextInput
              value={`${height}`}
              onChangeText={(value) => setHeight(value)}
              style={styles.textInput}
              placeholder="ส่วนสูง"
            />
          </View>
          <View style={styles.formControl}>
            <GetIcon type="ii" name="md-woman-outline" />
            <TextInput
              value={stature}
              onChangeText={(value) => setStature(value)}
              style={styles.textInput}
              placeholder="สัดส่วน 32-24-35"
            />
          </View>
          <View style={styles.formControl}>
            <GetIcon type="fa5" name="weight" />
            <TextInput
              value={weight}
              onChangeText={(value) => setWeight(value)}
              style={styles.textInput}
              placeholder="น้ำหนัก"
            />
          </View>
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
            onPress={() => handleNexData()}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 100,
    width: 100,
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
    width: 300,
  },
})

export default RegisterPlanForm
