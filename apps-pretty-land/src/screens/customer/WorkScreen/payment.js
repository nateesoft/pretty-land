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
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import { Button, Text } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"

import { GetIcon } from "../../../components/GetIcons"
import bgImage from "../../../../assets/bg.png"
import firebase from "../../../../util/firebase"

const PaymentForm = ({ navigation, route }) => {
  const { item } = route.params
  const [partnerAmount, setPartnerAmount] = useState("")
  const [feeAmount, setFeeAmount] = useState("")
  const [netTotalAmount, setNetTotalAmount] = useState("")

  const [image, setImage] = useState(null)
  const [bank, setBank] = useState("")
  const [transferAmount, setTransferAmount] = useState("")
  const [datetime, setDateTime] = useState("")

  useEffect(() => {
    const ref = firebase.database().ref(`posts/${item.id}/partnerSelect`)
    ref.once("value", (snapshot) => {
      let totalAmount = 0
      snapshot.forEach((item, index) => {
        const amt = parseInt(item.val().amount)
        totalAmount = totalAmount + amt
      })
      setPartnerAmount(totalAmount.toFixed(2))
    })
  }, [])

  useEffect(() => {
    const ref = firebase.database().ref("appconfig/fee_amount")
    ref.once("value", (snapshot) => {
      const feeAmount = parseFloat(snapshot.val()).toFixed(2)
      setFeeAmount(feeAmount)

      const netTotalAmt = parseInt(partnerAmount)+parseInt(feeAmount)
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
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <SafeAreaView style={{ height: "100%" }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.topic}>โอนเงิน เพื่อชำระค่าบริการ</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 20 }}
        >
          <View style={{ width: "90%", alignSelf: "center" }}>
            <Text style={{ fontSize: 16, padding: 5 }}>
              ยอดชำระสำหรับ Partner (0.00)
            </Text>
            <View style={styles.formControl}>
              <GetIcon type="fa" name="dollar" />
              <TextInput
                style={styles.textInput}
                placeholder="ยอดชำระสำหรับ Partner (0.00)"
                value={partnerAmount}
                onChangeText={(value) => setPartnerAmount(value)}
                editable={false}
              />
            </View>
            <Text style={{ fontSize: 16, padding: 5 }}>
              ค่าธรรมเนียม (0.00)
            </Text>
            <View style={styles.formControl}>
              <GetIcon type="fa" name="dollar" />
              <TextInput
                style={styles.textInput}
                placeholder="ค่าธรรมเนียม (0.00)"
                value={feeAmount}
                onChangeText={(value) => setFeeAmount(value)}
                editable={false}
              />
            </View>
            <Text style={{ fontSize: 16, padding: 5 }}>รวมยอดชำระทั้งหมด</Text>
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
            <Text style={styles.optionsNameDetail}>ยืนยันข้อมูลการโอนเงิน</Text>

            <Text style={{ fontSize: 16, padding: 5 }}>ธนาคารที่โอนเงิน</Text>
            <View style={styles.formControl}>
              <GetIcon type="fa" name="bank" />
              <TextInput
                style={styles.textInput}
                placeholder="ธนาคารที่โอนเงิน"
                value={bank}
                onChangeText={(value) => setBank(value)}
              />
            </View>
            <Text style={{ fontSize: 16, padding: 5 }}>ยอดเงินโอน 0.00</Text>
            <View style={styles.formControl}>
              <GetIcon type="fa" name="dollar" />
              <TextInput
                style={styles.textInput}
                placeholder="ยอดเงินโอน 0.00"
                value={transferAmount}
                onChangeText={(value) => setTransferAmount(value)}
              />
            </View>
            <Text style={{ fontSize: 16, padding: 5 }}>
              เวลาที่โอนเงิน (dd/MM/yyyy)
            </Text>
            <View style={styles.formControl}>
              <GetIcon type="mi" name="date-range" />
              <TextInput
                style={styles.textInput}
                placeholder="เวลาที่โอนเงิน (dd/MM/yyyy)"
                value={datetime}
                onChangeText={(value) => setDateTime(value)}
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
            <View style={{ alignContent: "center" }}>
              <View style={{ alignSelf: "center", marginTop: 10 }}>
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 250 }}
                />
              </View>
              <View
                style={{ alignSelf: "center", padding: 5, marginBottom: 10 }}
              >
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
                />
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  buttonConfirm: {
    backgroundColor: "green",
    marginTop: 10,
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
    textAlign: "center",
    fontSize: 16,
    marginVertical: 5,
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
})

export default PaymentForm
