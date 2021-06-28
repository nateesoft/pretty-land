import React, { useEffect, useState } from "react"
import { StyleSheet, View, ImageBackground } from "react-native"
import { Button, Text, Input } from "react-native-elements"
import { AntDesign } from "react-native-vector-icons"
import { MaterialIcons } from "@expo/vector-icons"
import moment from "moment"

import firebase from "../../../../util/firebase"
import bgImage from "../../../../assets/bg.png"
import { AppConfig } from "../../../Constants"

const WorkDetailScreen = ({ navigation, route }) => {
  const { userId, item } = route.params
  const [partner, setPartner] = useState({})
  const rate = 5 // default rate

  const saveHistoryStar = (partnerId) => {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`partner_star/${partnerId}/${item.id}`)
        .update({
          star: rate,
          sys_date: new Date().toUTCString(),
        })
        .then((result) => {
          resolve("success")
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  const updateMember = (workIn = 0, partnerId) => {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`members/${partnerId}`)
        .update({
          workIn: parseInt(workIn) + 1,
        })
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  const partnerCloseJob = () => {
    // update status post (for partner)
    firebase.database().ref(`posts/${item.id}`).update({
      status: AppConfig.PostsStatus.partnerCloseJob,
      statusText: "Parnter ปิดงานเรียบร้อย",
      sys_update_date: new Date().toUTCString(),
    })

    // update partner close job
    firebase.database().ref(`posts/${item.id}/partnerSelect/${userId}`).update({
      selectStatus: AppConfig.PostsStatus.closeJob,
      selectStatusText: "ปิดงานเรียบร้อย",
      sys_update_date: new Date().toUTCString(),
    })

    Object.keys(item.partnerSelect).forEach((partnerId) => {
      const ref = firebase.database().ref(`members/${partnerId}`)
      ref.once("value", (snapshot) => {
        const pData = { ...snapshot.val() }
        updateMember(pData.workIn, partnerId).then((result) => {
          saveHistoryStar(partnerId).then((result) => {
            navigation.navigate("List-My-Work")
          })
        })
      })
    })
  }

  const partnerMeetingCustomer = () => {
    firebase.database().ref(`posts/${item.id}/partnerSelect/${userId}`).update({
      selectStatus: AppConfig.PostsStatus.customerMeet,
      selectStatusText: "ปฏิบัติงาน",
      sys_update_date: new Date().toUTCString(),
      start_work_date: new Date().toUTCString(),
    })

    navigation.navigate("List-My-Work")
  }

  useEffect(() => {
    const ref = firebase
      .database()
      .ref(`posts/${item.id}/partnerSelect/${userId}`)
    const listener = ref.on("value", (snapshot) => {
      const data = { ...snapshot.val() }
      setPartner(data)
    })

    return () => ref.off("value", listener)
  }, [])

  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <Text style={styles.textTopic}>รายละเอียดงานที่แจ้งลูกค้า</Text>
      <View style={styles.cardDetail}>
        <View style={styles.viewCard}>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 5,
              backgroundColor: "#123456",
              color: "white",
              paddingHorizontal: 5,
            }}
          >
            ลูกค้า: {item.customerName}
          </Text>
          <View>
            <Text>โหมดงาน: {item.partnerRequest}</Text>
            <Text>จังหวัด: {item.provinceName}</Text>
            <Text>เขต/อำเภอ: {item.districtName}</Text>
            <Text>
              วันที่แจ้งรับงาน:{" "}
              {moment(item.sys_create_date).format("D MMM YYYY")}
            </Text>
            <Text>Lv.ลูกค้า: {item.customerLevel}</Text>
            <Text>เบอร์ติดต่อ: {item.customerPhone}</Text>
          </View>
          <Text
            style={{
              marginBottom: 5,
              backgroundColor: "chocolate",
              color: "white",
              paddingHorizontal: 5,
            }}
          >
            โหมดงาน: {item.partnerRequest}
          </Text>
          <View
            style={{
              borderWidth: 1.5,
              borderRadius: 10,
              borderColor: "gray",
              padding: 5,
            }}
          >
            <Input
              placeholder="เสนอราคา (บาท)"
              value={`ราคาที่เสนอ ${partner.amount} บาท`}
            />
          </View>
        </View>
        {item.status === AppConfig.PostsStatus.adminConfirmPayment &&
          partner.selectStatus !== AppConfig.PostsStatus.customerMeet && (
            <Button
              icon={
                <MaterialIcons
                  name="meeting-room"
                  size={24}
                  color="white"
                  style={{ marginRight: 5 }}
                />
              }
              iconLeft
              buttonStyle={{
                margin: 5,
                backgroundColor: "green",
                paddingHorizontal: 20,
                borderRadius: 25,
              }}
              title="เริ่มทำงาน"
              onPress={() => partnerMeetingCustomer()}
            />
          )}
        {partner.selectStatus === AppConfig.PostsStatus.customerMeet && (
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
            title="บันทึกปิดงาน"
            onPress={() => partnerCloseJob()}
          />
        )}
      </View>
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

export default WorkDetailScreen
