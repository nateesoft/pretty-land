import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ImageBackground,
} from "react-native"
import { Button } from "react-native-elements"
import Moment from "moment"

import bgImage from "../../../../assets/bg.png"

import firebase from "../../../../util/firebase"
import { AppConfig } from "../../../Constants"

const ConfirmTaskScreen = ({ navigation, route }) => {
  const { profile, item } = route.params
  const [workStatus, setWorkStatus] = useState("")

  const [getWork, setGetWork] = useState(false)
  const workHide =
    item.partnerQty -
      (item.partnerSelect ? Object.keys(item.partnerSelect).length : 0) ===
    0

  const nextPriceForm = () => {
    navigation.navigate("Price-Form-Detail", { profile, item })
  }

  useEffect(() => {
    const ref = firebase
      .database()
      .ref(`posts/${item.id}/partnerSelect/${profile.id}`)
    const listener = ref.on("value", (snapshot) => {
      const checkItem = { ...snapshot.val() }
      const acceptAlready = checkItem.partnerId === profile.id
      if (acceptAlready) {
        setWorkStatus(checkItem.selectStatus)
      }
      setGetWork(acceptAlready)
    })

    return () => ref.off("value", listener)
  }, [])

  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <SafeAreaView style={{ height: "100%" }}>
        <Text style={styles.textTopic}>รายละเอียดโพสท์ของลูกค้า</Text>
        <View style={styles.cardDetail}>
          <View>
            <Text
              style={{
                marginBottom: 5,
              }}
            >
              จำนวนPartner ที่ต้องการ: {item.partnerWantQty || 0} คน
            </Text>
            <Text
              style={{
                marginBottom: 5,
              }}
            >
              ลูกค้า: {item.customerName}
            </Text>
            <Text
              style={{
                marginBottom: 5,
              }}
            >
              ระดับ: {item.customerLevel}
            </Text>
            <Text
              style={{
                marginBottom: 5,
              }}
            >
              สถานที่: {item.placeMeeting}
            </Text>
            <Text
              style={{
                marginBottom: 5,
              }}
            >
              เริ่ม: {item.startTime}, เลิก: {item.stopTime}
            </Text>
            <Text
              style={{
                marginBottom: 5,
              }}
            >
              รายละเอียดเพิ่มเติม: {item.customerRemark}
            </Text>
            <Text
              style={{
                marginBottom: 5,
              }}
            >
              วันที่โพสท์:{" "}
              {Moment(item.sys_create_date).format("D MMM YYYY HH:mm:ss")}
            </Text>
          </View>
          {workStatus !== AppConfig.PostsStatus.customerConfirm && (
            <View style={styles.viewCard}>
              <View style={{ marginVertical: 10 }}>
                <Button
                  title="ถัดไป"
                  buttonStyle={{ borderRadius: 5 }}
                  onPress={() => nextPriceForm()}
                />
              </View>
            </View>
          )}
          {getWork && workStatus === AppConfig.PostsStatus.customerConfirm && (
            <Text
              style={{
                backgroundColor: "orange",
                fontWeight: "bold",
                padding: 5,
              }}
            >
              Status: ได้งานแล้ว รอลูกค้าชำระเงิน
            </Text>
          )}
          {getWork &&
            workStatus === AppConfig.PostsStatus.waitCustomerSelectPartner && (
              <Text
                style={{
                  color: "white",
                  backgroundColor: "blue",
                  padding: 20,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                รอลูกค้ารับงาน
              </Text>
            )}
          {!getWork && workHide && (
            <Text
              style={{
                color: "black",
                backgroundColor: "red",
                padding: 20,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              งานนี้ถูกรับงานไปเต็มแล้ว
            </Text>
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  cardDetail: {
    flex: 1,
    alignItems: "center",
    padding: 5,
    margin: 10,
  },
  optionsNameDetail: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginBottom: 15,
    marginTop: 10,
  },
  optionsNameDetail2: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginBottom: 15,
    marginTop: 10,
  },
  viewCard: {
    width: "100%",
    borderRadius: 20,
    padding: 5,
    margin: 20,
  },
  textInput: {
    backgroundColor: "white",
    textAlign: "center",
    fontSize: 16,
    marginVertical: 5,
    height: 40,
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

export default ConfirmTaskScreen
