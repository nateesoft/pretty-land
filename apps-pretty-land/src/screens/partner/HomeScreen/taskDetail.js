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
import { Alert } from "react-native"

const ConfirmTaskScreen = ({ navigation, route }) => {
  const { profile, postDetail } = route.params
  const [profileSelect, setProfileSelect] = useState("")

  const nextPriceForm = () => {
    navigation.navigate("Price-Form-Detail", { profile, postDetail })
  }

  const getProfileSelectObject = (snapshot) => {
    return new Promise((resolve, reject) => {
      const checkItem = { ...snapshot.val() }
      setProfileSelect(checkItem)
      resolve(true)
    })
  }

  useEffect(() => {
    const ref = firebase
      .database()
      .ref(`posts/${postDetail.id}/partnerSelect/${profile.id}`)
    ref.once("value", (snapshot) => {
      getProfileSelectObject(snapshot).catch((err) => Alert.alert(err))
    })
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
              จำนวนPartner ที่ต้องการ: {postDetail.partnerWantQty || 0} คน
            </Text>
            <Text
              style={{
                marginBottom: 5,
              }}
            >
              ลูกค้า: {postDetail.customerName}
            </Text>
            <Text
              style={{
                marginBottom: 5,
              }}
            >
              ระดับ: {postDetail.customerLevel}
            </Text>
            <Text
              style={{
                marginBottom: 5,
              }}
            >
              สถานที่: {postDetail.placeMeeting}
            </Text>
            <Text
              style={{
                marginBottom: 5,
              }}
            >
              เริ่ม: {postDetail.startTime}, เลิก: {postDetail.stopTime}
            </Text>
            <Text
              style={{
                marginBottom: 5,
              }}
            >
              รายละเอียดเพิ่มเติม: {postDetail.customerRemark}
            </Text>
            <Text
              style={{
                marginBottom: 5,
              }}
            >
              วันที่โพสท์:{" "}
              {Moment(postDetail.sys_create_date).format("D MMM YYYY HH:mm:ss")}
            </Text>
          </View>
          {Object.keys(profileSelect).length === 0 && (
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
          {profileSelect.selectStatus ===
            AppConfig.PostsStatus.customerConfirm && (
            <Text
              style={{
                fontWeight: "bold",
                backgroundColor: "blue",
                color: "white",
                paddingHorizontal: 10,
              }}
            >
              Status: ได้งานแล้ว รอลูกค้าชำระเงิน
            </Text>
          )}
          {profileSelect.selectStatus ===
            AppConfig.PostsStatus.waitCustomerSelectPartner && (
            <Text
              style={{
                fontWeight: "bold",
                backgroundColor: "orange",
                paddingHorizontal: 10,
              }}
            >
              Status: เสนอราคาไปแล้ว รอลูกค้าตอบรับ
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
