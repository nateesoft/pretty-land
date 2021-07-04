import React, { useEffect, useState } from "react"
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

  const [listPartner, setListPartner] = useState([])

  const getPartnerList = (item) => {
    return new Promise((resolve, reject) => {
      let list = []
      for (let key in item) {
        list.push(item[key])
      }
      resolve(list)
    })
  }

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

  useEffect(() => {
    getPartnerList(item.partnerSelect).then((res) => {
      setListPartner(res)
    })
  }, [])

  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <SafeAreaView style={{ height: "100%" }}>
        <Text style={styles.textTopic}>ตรวจสอบข้อมูลการโอนเงิน</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 20 }}
        >
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
              width: "85%",
            }}
          >
            <Text>ชื่อลูกค้า: {item.customerName}</Text>
            <Text>Level: {item.customerLevel}</Text>
            <Text>สถานที่นัดหมาย: {item.placeMeeting}</Text>
            <Text>
              เวลาเริ่ม: {item.startTime}, เวลาเลิก: {item.stopTime}
            </Text>
            <Text>เบอร์ติดต่อ: {item.customerPhone}</Text>
            <Text>รายละเอียดเพิ่มเติม: {item.customerRemark}</Text>
            <Text>ธนาคารที่โอนเงิน: {item.bankName}</Text>
            <Text>
              ยอดเงินโอน: {parseFloat(item.transferAmount).toFixed(2)}
            </Text>
            <Text>เวลาที่โอนเงิน: {item.transferTime}</Text>
          </View>
          <View style={{ width: "80%", alignItems: "center", margin: 10 }}>
            <Text style={{ marginBottom: 5 }}>
              จำนวนรายชื่อ Partner ที่รับชำระ {listPartner.length} คน
            </Text>
            {listPartner &&
              listPartner.map((item, index) => (
                <View>
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 100, height: 100 }}
                  />
                  <Text style={{ marginTop: 5 }} key={item.partnerId}>
                    {item.partnerName}
                  </Text>
                </View>
              ))}
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
            title="ยืนยันการโอนเงิน"
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
  textTopic: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    backgroundColor: "#ff2fe6",
    padding: 10,
  },
})

export default VerifyPaymentSlip
