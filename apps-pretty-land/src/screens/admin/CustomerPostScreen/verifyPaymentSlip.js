import React from "react"
import {
  ScrollView,
  Image,
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from "react-native"
import { Button, Text } from "react-native-elements"
import { AntDesign } from "react-native-vector-icons"

import bgImage from "../../../../assets/bg.png"
import firebase from "../../../../util/firebase"
import { AppConfig } from "../../../Constants"

const VerifyPaymentSlip = ({ navigation, route }) => {
  const { navigate } = navigation
  const { item } = route.params

  const saveConfirmPayment = () => {
    // save to firebase
    firebase.database().ref(`posts/${item.id}`).update({
      status: AppConfig.PostsStatus.adminConfirmPayment,
      statusText: "ชำระเงินเรียบร้อยแล้ว",
      sys_update_date: new Date().toUTCString(),
    })

    const ref = firebase.database().ref(`members/${item.customerId}`)
    ref.once("value", (snapshot) => {
      const customerData = { ...snapshot.val() }
      // update level to customer
      firebase
        .database()
        .ref(`members/${item.customerId}`)
        .update({
          customerLevel: customerData.customerLevel + 1,
        })
    })

    // to all list
    navigate("Post-List-All")
  }

  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <SafeAreaView style={{ height: "100%" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 20 }}
        >
          <Text style={styles.optionsNameDetail}>ตรวจสอบข้อมูลการโอนเงิน</Text>
          <View style={{ alignSelf: "center" }}>
            <Image
              source={{ uri: item.slip_image }}
              style={{ width: 200, height: 250 }}
            />
          </View>
          <View
            style={{
              padding: 10,
              alignSelf: "center",
              borderWidth: 1.5,
              margin: 10,
              borderColor: "pink",
            }}
          >
            <Text>ชื่อผู้โอนเงิน: {item.customerName}</Text>
            <Text>ธนาคารที่โอนเงิน: {item.bankName}</Text>
            <Text>
              ยอดเงินโอน: {parseFloat(item.transferAmount).toFixed(2)}
            </Text>
            <Text>เวลาที่โอนเงิน: {item.transferTime}</Text>
          </View>
          <Button
            icon={
              <AntDesign
                name="checksquareo"
                size={20}
                color="white"
                style={{ marginRight: 5 }}
              />
            }
            buttonStyle={styles.buttonConfirm}
            title="ยืนยันข้อมูลถูกต้อง"
            onPress={() => saveConfirmPayment()}
          />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  buttonConfirm: {
    backgroundColor: "green",
    borderRadius: 5,
    alignSelf: "center",
    width: 250,
  },
  optionsNameDetail: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginBottom: 15,
    marginTop: 10,
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
})

export default VerifyPaymentSlip
