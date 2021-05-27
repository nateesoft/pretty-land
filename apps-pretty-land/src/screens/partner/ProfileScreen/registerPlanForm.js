import React, { useState, useEffect } from "react"
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  SafeAreaView,
} from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { Button, CheckBox } from "react-native-elements"
import RadioButtonRN from "radio-buttons-react-native"
import { FontAwesome } from "react-native-vector-icons"

import firebase from "../../../../util/firebase"
import { GetIcon } from "../../../components/GetIcons"

const radioData = [
  { label: "พริตตี้ Event / Mc", value: "1" },
  { label: "โคโยตี้ / งานเต้น", value: "2" },
  { label: "พริตตี้ En / Env.", value: "3" },
  { label: "พริตตี้ นวดแผนไทย", value: "4" },
]

const sexData = [
  { label: "หญิง", value: "female" },
  { label: "ชาย", value: "male" },
  { label: "อื่น ๆ", value: "other" },
]

const RegisterPlanForm = ({ navigation, route }) => {
  const { navigate } = navigation
  const { userId, status } = route.params

  const [type1, setType1] = useState(true)
  const [type2, setType2] = useState(false)
  const [type3, setType3] = useState(false)
  const [type4, setType4] = useState(false)

  const [workType, setWorkType] = useState("")
  const [sex, setSex] = useState("female")
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [stature, setStature] = useState("")
  const [price4, setPrice4] = useState("")

  const handleNexData = () => {
    if (!type1 && !type2 && !type3 && !type4) {
      Alert.alert("กรุณาระบุประเภทงานที่ต้องการรับบริการ !!!")
      return
    }
    if (!age) {
      Alert.alert("กรุณาระบุอายุ")
      return
    }
    if (!height) {
      Alert.alert("กรุณาระบุส่วนสูง")
      return
    }
    if (!weight) {
      Alert.alert("กรุณาระบุน้ำหนัก")
      return
    }
    if (!stature) {
      Alert.alert("กรุณาระบุสัดส่วน")
      return
    }
    if (type4 && !price4) {
      Alert.alert("กรุณาระบุราคา สำหรับประเภทนวดแผนไทย")
      return
    }

    if (!type4) {
      setPrice4(0)
    }

    let dataWorkType = ""
    if (type1) {
      dataWorkType = dataWorkType + "1,"
    }
    if (type2) {
      dataWorkType = dataWorkType + "2,"
    }
    if (type3) {
      dataWorkType = dataWorkType + "3,"
    }
    if (type4) {
      dataWorkType = dataWorkType + "4,"
    }
    setWorkType(dataWorkType)

    // save data
    firebase
      .database()
      .ref(`members/${userId}`)
      .update({
        id: userId,
        workType: dataWorkType,
        sex,
        name,
        age,
        height,
        stature,
        weight,
        price4: !price4 ? 0 : price4,
      })
    navigate("Register-Partner-Form", { userId, status, workType: dataWorkType })
  }

  useEffect(() => {
    const onChangeValue = firebase
      .database()
      .ref(`members/${userId}`)
      .on("value", (snapshot) => {
        const data = { ...snapshot.val() }
        setName(data.name || "")
        setAge(data.age || "")
        setHeight(data.height || "")
        setStature(data.stature || "")
        setWeight(data.weight || "")
        setWorkType(data.workType || "")
      })

    return () =>
      firebase.database().ref(`members/${userId}`).off("value", onChangeValue)
  }, [])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={styles.textFormInfo}>รายละเอียดงานที่รับ</Text>
          </View>

          <View style={{ alignItems: "center", width: "80%" }}>
            <Text
              style={{
                fontSize: 16,
                padding: 5,
                marginTop: 10,
                alignSelf: "flex-start",
              }}
            >
              ประเภทงาน
            </Text>
            <CheckBox
              containerStyle={{ width: "100%", backgroundColor: "#fff" }}
              title={radioData[0].label}
              checked={type1}
              onPress={() => setType1(!type1)}
            />
            <CheckBox
              containerStyle={{ width: "100%", backgroundColor: "#fff" }}
              title={radioData[1].label}
              checked={type2}
              onPress={() => setType2(!type2)}
            />
            <CheckBox
              containerStyle={{ width: "100%", backgroundColor: "#fff" }}
              title={radioData[2].label}
              checked={type3}
              onPress={() => setType3(!type3)}
            />
            <CheckBox
              containerStyle={{ width: "100%", backgroundColor: "#fff" }}
              title={radioData[3].label}
              checked={type4}
              onPress={() => setType4(!type4)}
            />
            {type4 && (
              <>
                <Text
                  style={{
                    fontSize: 16,
                    padding: 5,
                    marginTop: 10,
                    alignSelf: "flex-start",
                  }}
                >
                  ค่าบริการ สำหรับนวดแผนไทย
                </Text>
                <View style={styles.formControlPrice}>
                  <GetIcon type="fa" name="money" />
                  <TextInput
                    value={`${price4}`}
                    onChangeText={(value) => setPrice4(value)}
                    style={[styles.textInput, { width: 300 }]}
                    placeholder="จำนวนเงิน"
                  />
                </View>
              </>
            )}
          </View>

          <View style={{ width: "80%", alignSelf: "center" }}>
            <Text style={{ fontSize: 16, padding: 5, marginTop: 10 }}>
              เลือกเพศ
            </Text>
            <RadioButtonRN
              data={sexData}
              selectedBtn={(e) => setSex(e.value)}
              icon={
                <FontAwesome name="check-circle" size={25} color="#2c9dd1" />
              }
              initial={1}
            />
            <Text
              style={{
                width: "80%",
                padding: 10,
                fontSize: 16,
              }}
            >
              รายละเอียดส่วนตัว
            </Text>
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
              title="บันทึก/ถัดไป"
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
                paddingHorizontal: 15,
                height: 45,
                borderWidth: 0.5,
                marginBottom: 20,
              }}
              onPress={() => handleNexData()}
            />
          </View>
        </SafeAreaView>
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
    borderColor: "#ccc",
    backgroundColor: "white",
    marginTop: 5,
    height: 50,
    borderRadius: 5,
  },
  formControlPrice: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    paddingHorizontal: 10,
    borderColor: "#2c9dd1",
    backgroundColor: "white",
    marginTop: 5,
    height: 50,
    borderRadius: 5,
  },
})

export default RegisterPlanForm
