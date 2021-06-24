import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from "react-native"
import { Button, Text } from "react-native-elements"
import { AntDesign } from "react-native-vector-icons"

import bgImage from "../../../../assets/bg.png"
import { partnerAcceptJobWaitCustomerReview } from "../../../apis"

import firebase from "../../../../util/firebase"
import { AppConfig } from "../../../Constants"

const ConfirmTaskScreen = ({ navigation, route }) => {
  const { profile, item } = route.params
  const [amount, setAmount] = useState("")
  const [workStatus, setWorkStatus] = useState("")

  const [getWork, setGetWork] = useState(false)
  const workHide =
    item.partnerQty -
      (item.partnerSelect ? Object.keys(item.partnerSelect).length : 0) ===
    0

  const partnerAcceptJob = () => {
    if (!amount) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุจำนวนเงินที่ต้องการ")
      return
    }
    partnerAcceptJobWaitCustomerReview(item, {
      ...profile,
      amount,
    })
    navigation.navigate("All-Task-List")
  }

  useEffect(() => {
    const ref = firebase
      .database()
      .ref(`posts/${item.id}/partnerSelect/${profile.id}`)
    const listener = ref.on("value", (snapshot) => {
      const checkItem = { ...snapshot.val() }
      const acceptAlready = checkItem.partnerId === profile.id
      if (acceptAlready) {
        setAmount(checkItem.amount)
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardDetail}>
            <Text style={styles.optionsNameDetail2}>
              รายละเอียดลูกค้าจ้างงาน
            </Text>
            <View style={styles.viewCard}>
              <Text
                style={{
                  marginBottom: 5,
                  backgroundColor: "#123456",
                  color: "white",
                  paddingHorizontal: 5,
                  height: 30,
                }}
              >
                จังหวัด: {item.provinceName}
              </Text>
              <Text
                style={{
                  marginBottom: 5,
                  backgroundColor: "#123456",
                  color: "white",
                  paddingHorizontal: 5,
                  height: 30,
                }}
              >
                เขต/อำเภอ: {item.districtName}
              </Text>
              <Text
                style={{
                  marginBottom: 5,
                  backgroundColor: "#123456",
                  color: "white",
                  paddingHorizontal: 5,
                  height: 30,
                }}
              >
                ลูกค้า: คุณ{item.customerName}
              </Text>
              <Text style={{ marginBottom: 5, height: 30 }}>
                ระดับลูกค้า level: {item.customerLevel}
              </Text>
              <Text
                style={{
                  marginBottom: 5,
                  backgroundColor: "chocolate",
                  color: "white",
                  paddingHorizontal: 5,
                  height: 30,
                }}
              >
                โหมดงาน: {item.partnerRequest}
              </Text>
              {!workHide && (
                <View
                  style={{
                    borderWidth: 1.5,
                    borderRadius: 10,
                    borderColor: "gray",
                    padding: 10,
                  }}
                >
                  <TextInput
                    value={amount}
                    placeholder="เสนอราคา (บาท)"
                    style={styles.textInput}
                    keyboardType="number-pad"
                    onChangeText={(value) => setAmount(value)}
                  />
                </View>
              )}
            </View>
            {!getWork && !workHide && (
              <View>
                <Button
                  icon={
                    <AntDesign
                      name="checkcircleo"
                      size={15}
                      color="white"
                      style={{ marginRight: 5 }}
                    />
                  }
                  iconLeft
                  buttonStyle={{
                    margin: 5,
                    backgroundColor: "#ff2fe6",
                    paddingHorizontal: 20,
                    borderRadius: 25,
                  }}
                  title="บันทึกรับงาน"
                  onPress={() => partnerAcceptJob()}
                />
              </View>
            )}
            {getWork && workStatus === AppConfig.PostsStatus.customerConfirm && (
              <Text
                style={{
                  color: "white",
                  backgroundColor: "blue",
                  padding: 20,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                ได้งานแล้ว รอลูกค้าชำระเงิน
              </Text>
            )}
            {getWork && workStatus === AppConfig.PostsStatus.waitCustomerSelectPartner && (
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
        </ScrollView>
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
})

export default ConfirmTaskScreen
