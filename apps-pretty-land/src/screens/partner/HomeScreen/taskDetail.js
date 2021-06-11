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

const ConfirmTaskScreen = ({ navigation, route }) => {
  const { profile, item } = route.params
  const [amount, setAmount] = useState("")
  const [place, setPlace] = useState("")
  const [phone, setPhone] = useState("")
  const [workStatus, setWorkStatus] = useState("")

  const [getWork, setGetWork] = useState(false)

  const partnerAcceptJob = () => {
    if (!amount) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุจำนวนเงินที่ต้องการ")
      return
    }
    if (!place) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุสถานที่")
      return
    }
    if (!phone) {
      Alert.alert(
        "แจ้งเตือน",
        "กรุณาระบุเบอร์ติดต่อ (แสดงเฉพาะผุ้ดูแลระบบเท่านั้น)"
      )
      return
    }
    partnerAcceptJobWaitCustomerReview(item, {
      ...profile,
      amount,
      place,
      phone,
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
        setPlace(checkItem.place)
        setPhone(checkItem.phone)
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
              <Text
                style={{
                  marginBottom: 15,
                  fontSize: 18,
                  borderWidth: 2,
                  padding: 10,
                }}
              >
                รับจำนวน {item.partnerQty} คน ขาดอีก{" "}
                {item.partnerQty -
                  (item.partnerSelect
                    ? Object.keys(item.partnerSelect).length
                    : 0)}{" "}
                คน
              </Text>
              <Text style={{ marginBottom: 15 }}>
                สถานที่: {item.placeMeeting}
              </Text>
              <Text style={{ marginBottom: 15 }}>
                เบอร์ติดต่อลูกค้า: {item.customerPhone}
              </Text>
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
                <TextInput
                  value={place}
                  placeholder="ระบุสถานที่"
                  style={styles.textInput}
                  onChangeText={(value) => setPlace(value)}
                />
                <TextInput
                  value={phone}
                  placeholder="เบอร์ติดต่อ"
                  style={styles.textInput}
                  keyboardType="number-pad"
                  onChangeText={(value) => setPhone(value)}
                />
              </View>
            </View>
            {!getWork ? (
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
            ) : (
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    color: "blue",
                  }}
                >
                  คุณสมัครรับงานนี้ไปแล้ว
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "black",
                    padding: 5,
                    backgroundColor: "yellow",
                  }}
                >
                  ( สถานะ:{" "}
                  {workStatus === "customer_confirm"
                    ? "ได้งานแล้ว"
                    : "รอลูกค้ารับงาน"}{" "}
                  )
                </Text>
              </View>
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
