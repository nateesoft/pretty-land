import React, { useEffect, useState } from "react"
import {
  Image,
  View,
  Platform,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import { Button, Text } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"
import DropDownPicker from "react-native-dropdown-picker"
import { TextInputMask } from "react-native-masked-text"

import { getBankList } from "../../../data/apis"
import { GetIcon } from "../../../components/GetIcons"
import bgImage from "../../../../assets/bg.png"
import firebase from "../../../../util/firebase"

const PaymentForm = ({ navigation, route }) => {
  const { navigate } = navigation
  const { item } = route.params
  const [partnerAmount, setPartnerAmount] = useState("")
  const [feeAmount, setFeeAmount] = useState("")
  const [netTotalAmount, setNetTotalAmount] = useState("")

  const [image, setImage] = useState(null)
  const [bank, setBank] = useState("")
  const [bankList, setBankList] = useState(getBankList())
  const [transferAmount, setTransferAmount] = useState("")
  const [datetime, setDateTime] = useState("")
  const [openSelectBank, setOpenSelectBank] = useState(false)

  const computeAmount = (snapshot) => {
    return new Promise((resolve, reject) => {
      let totalAmount = 0
      snapshot.forEach((item, index) => {
        const amt = parseInt(item.val().amount)
        totalAmount = totalAmount + amt
      })
      resolve(totalAmount)
    })
  }

  const getFeeAmountFromFirebase = () => {
    return new Promise((resolve, reject) => {
      const ref = firebase.database().ref("appconfig/fee_amount")
      ref.once("value", (snapshot) => {
        const feeAmt = parseInt(snapshot.val())
        resolve(feeAmt)
      })
    })
  }

  useEffect(() => {
    const ref = firebase.database().ref(`posts/${item.id}/partnerSelect`)
    ref.on("value", async (snapshot) => {
      const pAmount = await computeAmount(snapshot)
      const fAmount = await getFeeAmountFromFirebase()
      const netTotalAmt = parseInt(pAmount) + parseInt(fAmount)

      setPartnerAmount(pAmount.toFixed(2))
      setFeeAmount(fAmount.toFixed(2))
      setNetTotalAmount(netTotalAmt.toFixed(2))
    })
  }, [])

  useEffect(() => {
    ;(async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== "granted") {
          Alert.alert(
            "แจ้งเตือน",
            "ขออภัย, กรุณาให้สิทธิืการเข้าถึงรูปภาพของท่าน!"
          )
        }
      }
    })()
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const saveCustomerPayment = () => {
    if (!bank) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุธนาคารที่ท่านโอนเงิน")
      return
    }
    if (!transferAmount) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุยอดเงินที่ท่านโอน")
      return
    }
    if (!datetime) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุวันที่ และเวลาที่โอนเงิน")
      return
    }

    navigate("Post-List")
  }

  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <SafeAreaView style={{ height: "100%" }}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 0}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.topic}>โอนเงิน เพื่อชำระค่าบริการ</Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 20 }}
          >
            <View style={{ width: "90%", alignSelf: "center" }}>
              <Text style={{ fontSize: 16, padding: 5 }}>
                ยอดชำระสำหรับ Partner (บาท)
              </Text>
              <View style={styles.formControl}>
                <GetIcon type="fa" name="dollar" />
                <TextInput
                  style={styles.textInput}
                  placeholder="ยอดชำระสำหรับ Partner (บาท)"
                  value={partnerAmount}
                  onChangeText={(value) => setPartnerAmount(value)}
                  editable={false}
                />
              </View>
              <Text style={{ fontSize: 16, padding: 5 }}>
                ค่าธรรมเนียม (บาท)
              </Text>
              <View style={styles.formControl}>
                <GetIcon type="fa" name="dollar" />
                <TextInput
                  style={styles.textInput}
                  placeholder="ค่าธรรมเนียม (บาท)"
                  value={feeAmount}
                  onChangeText={(value) => setFeeAmount(value)}
                  editable={false}
                />
              </View>
              <Text style={{ fontSize: 16, padding: 5 }}>
                รวมยอดชำระทั้งหมด
              </Text>
              <View style={styles.formControl}>
                <GetIcon type="fa" name="dollar" />
                <TextInput
                  style={styles.textInput}
                  placeholder="รวมยอดชำระทั้งหมด"
                  value={netTotalAmount}
                  onChangeText={(value) => setNetTotalAmount(value)}
                  editable={false}
                />
              </View>
            </View>
            <View style={{ margin: 5, alignSelf: "center", width: "90%" }}>
              <Text style={styles.optionsNameDetail}>
                ยืนยันข้อมูลการโอนเงิน
              </Text>

              <Text style={{ fontSize: 16, padding: 5 }}>ธนาคารที่โอนเงิน</Text>
              <DropDownPicker
                placeholder="-- เลือกธนาคาร --"
                open={openSelectBank}
                setOpen={setOpenSelectBank}
                value={bank}
                setValue={setBank}
                items={bankList}
                setItems={setBankList}
                textStyle={{ fontSize: 18 }}
                searchable={false}
                selectedItemContainerStyle={{ backgroundColor: "#facaff" }}
                listMode="SCROLLVIEW"
              />
              <Text style={{ fontSize: 16, padding: 5 }}>ยอดเงินโอน (บาท)</Text>
              <View style={styles.formControl}>
                <GetIcon type="fa" name="dollar" />
                <TextInput
                  style={styles.textInput}
                  placeholder="ยอดเงินโอน (บาท)"
                  value={transferAmount}
                  onChangeText={(value) => setTransferAmount(value)}
                  keyboardType="number-pad"
                />
              </View>
              <Text style={{ fontSize: 16, padding: 5 }}>
                เวลาที่โอนเงิน (dd/MM/yyyy HH:mm:ss)
              </Text>
              <View style={styles.formControl}>
                <GetIcon type="mi" name="date-range" />
                <TextInputMask
                  type={"datetime"}
                  options={{
                    format: "DD/MM/YYYY HH:mm:ss",
                  }}
                  value={datetime}
                  onChangeText={(text) => setDateTime(text)}
                  style={styles.textInputStype}
                />
              </View>
              <Button
                icon={
                  <Icon
                    name="file"
                    size={15}
                    color="white"
                    style={{ marginRight: 5 }}
                  />
                }
                buttonStyle={{ marginTop: 10 }}
                title="เลือกไฟล์...สลิปสำหรับการโอนเงิน"
                onPress={pickImage}
              />
            </View>
            {image && (
              <View style={{ alignContent: "center", height: 450 }}>
                <View style={{ alignSelf: "center", marginTop: 10 }}>
                  <Image
                    source={{ uri: image }}
                    style={{ width: 200, height: 250 }}
                  />
                </View>
                <View style={{ alignSelf: "center", padding: 5 }}>
                  <Button
                    icon={
                      <Icon
                        name="save"
                        size={20}
                        color="white"
                        style={{ marginRight: 5 }}
                      />
                    }
                    buttonStyle={styles.buttonConfirm}
                    title="ยืนยันข้อมูลการโอนเงิน"
                    onPress={() => saveCustomerPayment()}
                  />
                </View>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  buttonConfirm: {
    backgroundColor: "green",
    marginTop: 10,
    width: "100%",
  },
  optionsNameDetail: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginBottom: 15,
    marginTop: 10,
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
    borderRadius: 10,
  },
  textInput: {
    backgroundColor: "white",
    width: 250,
    fontSize: 16,
    marginVertical: 5,
    marginLeft: 10,
  },
  topic: {
    marginTop: 20,
    fontSize: 20,
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  textInputStype: {
    height: 40,
    width: "100%",
    fontSize: 18,
    marginLeft: 10,
  },
})

export default PaymentForm
