import React, { useState } from "react"
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  ImageBackground,
  ScrollView,
  SafeAreaView
} from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { Button } from "react-native-elements/dist/buttons/Button"
import base64 from "react-native-base64"
import RadioButtonRN from "radio-buttons-react-native"
import { FontAwesome } from "react-native-vector-icons"
import { TextInputMask } from "react-native-masked-text"

import { AppConfig } from "../../Constants"
import { GetIcon } from "../../components/GetIcons"

const sexData = [
  { label: "ชาย (Male)", value: "male" },
  { label: "หญิง (Female)", value: "female" },
  { label: "อื่น ๆ (Other)", value: "other" }
]

const RegisterLoginForm = ({ navigation, route }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")

  const [sex, setSex] = useState("male")
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [stature, setStature] = useState("")

  const encryptPassword = (password) => {
    return base64.encode(password)
  }

  const saveMemberDb = (id, data) => {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(getDocument(`members/${id}`))
        .set(data)
        .catch((err) => {
          reject(err)
        })
      resolve(true)
    })
  }

  const saveAndGoLoginForm = () => {
    if (!username) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุชื่อเข้าใช้งาน")
      return
    }
    if (password.length <= 0) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุรหัสผ่าน เพื่อเข้าใช้งาน")
      return
    }
    if (password.length < 8) {
      Alert.alert("แจ้งเตือน", "จำนวนรหัสผ่านต้องไม่น้อยกว่า 8 หลัก")
      return
    }
    if (!rePassword) {
      Alert.alert("แจ้งเตือน", "กรุณายืนยันรหัสผ่าน")
      return
    }
    if (password !== rePassword) {
      Alert.alert("แจ้งเตือน", "รหัสผ่าน และรหัสยืนยันจะต้องตรงกัน !!!")
      return
    }
    if (!name) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุชื่อหรือชื่อเล่น เพื่อใช้เรียก")
      return
    }
    if (!age) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุอายุ")
      return
    }
    if (!height) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุส่วนสูง")
      return
    }
    if (!weight) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุน้ำหนัก")
      return
    }
    if (!stature) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุสัดส่วน")
      return
    }

    const memberData = {
      username,
      password: encryptPassword(password),
      memberType: "partner",
      status: AppConfig.MemberStatus.newRegister,
      statusText: AppConfig.MemberStatus.newRegisterMessage,
      status_priority: AppConfig.MemberStatus.newRegisterPriority,
      sex,
      name,
      age,
      height,
      stature,
      weight
    }

    firebase
      .database()
      .ref(getDocument("members"))
      .orderByChild("username")
      .equalTo(member.username)
      .once("value", (snapshot) => {
        const data = snapshotToArray(snapshot)
        if (data.length === 0) {
          const newId = uuid.v4()
          const saveData = {
            id: newId,
            sys_create_date: new Date().toUTCString(),
            sys_update_date: new Date().toUTCString(),
            ...memberData
          }
          saveMemberDb(newId, saveData)
            .then((res) => {
              if (res) {
                Alert.alert(
                  "กระบวนการสมบูรณ์",
                  "บันทึกข้อมูลเรียบร้อย สามารถ login เข้าสู่ระบบได้"
                )
                navigation.popToTop()
                navigation.navigate("Login-Form")
              }
            })
            .catch((err) => {
              Alert.alert(err)
            })
        } else {
          Alert.alert(
            "แจ้งเตือน",
            `ข้อมูลผู้ใช้งาน: ${member.username} มีอยู่แล้ว`,
            [{ text: "OK" }]
          )
        }
      })
      .catch((err) => {
        Alert.alert(err)
      })
  }

  return (
    <ImageBackground
      source={AppConfig.bgImage}
      style={styles.imageBg}
      resizeMode="contain"
    >
      <SafeAreaView style={{ height: "100%" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={{ width: "80%", alignSelf: "center" }}>
              <Text style={{ fontSize: 16, padding: 5 }}>
                ข้อมูลผู้ใช้งาน (Username)
              </Text>
              {!username && (
                <Text style={{ color: "red" }}>ระบุชื่อเข้าใช้งาน</Text>
              )}
              <View style={styles.formControl}>
                <GetIcon type="ad" name="user" />
                <TextInput
                  style={styles.textInput}
                  placeholder="ข้อมูลผู้ใช้งาน"
                  value={username}
                  onChangeText={(value) => setUsername(value)}
                />
              </View>
              <Text style={{ fontSize: 16, padding: 5 }}>
                ข้อมูลรหัสผ่าน (Password)
              </Text>
              {!password && (
                <Text style={{ color: "red" }}>
                  ระบุรหัสผ่าน เพื่อเข้าใช้งาน
                </Text>
              )}
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
              <Text style={{ fontSize: 16, padding: 5 }}>
                ยืนยันข้อมูลรหัสผ่าน (Re-Password)
              </Text>
              {!rePassword && (
                <Text style={{ color: "red" }}>ยืนยันรหัสผ่านอีกครั้ง</Text>
              )}
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
            </View>
            <View style={{ width: "80%", alignSelf: "center" }}>
              <Text style={{ fontSize: 16, padding: 5, marginTop: 10 }}>
                เพศ
              </Text>
              <View style={{ marginBottom: 20 }}>
                <RadioButtonRN
                  box={false}
                  animationTypes={["shake"]}
                  data={sexData}
                  selectedBtn={(e) => setSex(e.value)}
                  icon={
                    <FontAwesome
                      name="check-circle"
                      size={25}
                      color="#2c9dd1"
                    />
                  }
                  initial={sex === "male" ? 1 : sex === "female" ? 2 : 3}
                />
              </View>
              <Text style={{ fontSize: 16, padding: 5 }}>
                ชื่อ/ ชื่อเล่น (Name/ Nickname)
              </Text>
              {!name && (
                <Text style={{ color: "red" }}>
                  ระบุชื่อหรือชื่อเล่น เพื่อใช้เรียก
                </Text>
              )}
              <View style={styles.formControl}>
                <GetIcon type="mci" name="card-account-details" />
                <TextInput
                  value={`${name}`}
                  onChangeText={(value) => setName(value)}
                  style={styles.textInput}
                  placeholder="ชื่อ/ ชื่อเล่น (Nickname)"
                />
              </View>
              <Text style={{ fontSize: 16, padding: 5 }}>อายุ</Text>
              <View style={styles.formControl}>
                <GetIcon type="mci" name="timeline-clock" />
                <TextInput
                  value={`${age}`}
                  onChangeText={(value) => setAge(value)}
                  style={styles.textInput}
                  placeholder="อายุ (Age)"
                  keyboardType="numeric"
                />
              </View>
              <Text style={{ fontSize: 16, padding: 5 }}>ส่วนสูง</Text>
              <View style={styles.formControl}>
                <GetIcon type="mci" name="human-male-height" />
                <TextInput
                  value={`${height}`}
                  onChangeText={(value) => setHeight(value)}
                  style={styles.textInput}
                  placeholder="ส่วนสูง (Tall)"
                  keyboardType="numeric"
                />
              </View>
              <Text style={{ fontSize: 16, padding: 5 }}>สัดส่วน</Text>
              <View style={styles.formControl}>
                <GetIcon type="ii" name="md-woman-outline" />
                <TextInputMask
                  type="custom"
                  options={{
                    mask: "99-99-99"
                  }}
                  value={stature}
                  onChangeText={(text) => setStature(text)}
                  style={styles.textInput}
                />
              </View>
              <Text style={{ fontSize: 16, padding: 5 }}>น้ำหนัก</Text>
              <View style={styles.formControl}>
                <GetIcon type="fa5" name="weight" />
                <TextInput
                  value={weight}
                  onChangeText={(value) => setWeight(value)}
                  style={styles.textInput}
                  placeholder="น้ำหนัก (Weight)"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
          <View style={styles.buttonFooter}>
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
                borderWidth: 0.5
              }}
              onPress={() => saveAndGoLoginForm()}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  topicHeader: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  },
  image: {
    height: 100,
    width: 100,
    marginBottom: 10
  },
  textLogo: {
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "purple"
  },
  textInput: {
    backgroundColor: "white",
    width: 250,
    textAlign: "center",
    fontSize: 16,
    marginVertical: 5
  },
  textFormInfo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8
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
    borderRadius: 10
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: "white"
  },
  textFooter1: {
    textAlign: "center",
    flexWrap: "wrap",
    fontSize: 12,
    color: "gray",
    position: "absolute",
    bottom: 135,
    color: "red"
  },
  textFooter2: {
    textAlign: "center",
    flexWrap: "wrap",
    fontSize: 12,
    color: "gray",
    position: "absolute",
    bottom: 85,
    color: "black"
  },
  textFooter3: {
    textAlign: "center",
    flexWrap: "wrap",
    fontSize: 12,
    color: "gray",
    position: "absolute",
    bottom: 60,
    color: "green"
  },
  buttonFooter: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20
  }
})

export default RegisterLoginForm
