import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native"
import { Button } from "react-native-elements"

import { AppConfig } from "../../../Constants"
import firebase from "../../../../util/firebase"

export default function PartnerListItem(props) {
  const { items, status, postId, navigation } = props
  const [showButton, setShowButton] = useState("show")

  const saveStartWork = () => {
    firebase.database().ref(`posts/${postId}`).update({
      status: AppConfig.PostsStatus.startWork,
      statusText: "เริ่มปฏิบัติงาน",
      sys_update_date: new Date().toUTCString(),
      start_work_date: new Date().toUTCString(),
    })
    navigation.navigate("Post-List")
  }

  const updateMember = (workIn = 0, workPoint = 0, partnerId) => {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`members/${partnerId}`)
        .update({
          workIn: parseInt(workIn) + 1,
          workPoint: parseInt(workPoint) + 10,
        })
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  const saveToCloseJob = () => {
    // firebase
    //   .database()
    //   .ref(`posts/${postId}/partnerSelect/${partnerId}`)
    //   .update({
    //     selectStatus: AppConfig.PostsStatus.closeJob,
    //     selectStatusText: "ปฏิบัติงานเสร็จแล้ว",
    //     customerStatus: AppConfig.PostsStatus.customerCloseJob,
    //     customerStatusText: "Customer ปิดงาน",
    //     customer_close_date: new Date().toUTCString(),
    //     sys_update_date: new Date().toUTCString(),
    //     star: rate,
    //   })
    // const ref = firebase.database().ref(`members/${partnerId}`)
    // ref.once("value", (snapshot) => {
    //   const pData = { ...snapshot.val() }
    //   updateMember(pData.workIn, pData.workPoint, partnerId).then((result) => {
    //     saveHistoryStar(partnerId, postId, rate).then((result) => {
    //       navigation.navigate("Post-List")
    //     })
    //   })
    // })
    // if (post.partnerRequest === AppConfig.PartnerType.type4) {
    //   // save all job
    //   firebase.database().ref(`posts/${postId}`).update({
    //     status: AppConfig.PostsStatus.closeJob,
    //     statusText: "ปิดงาน Post นี้เรียบร้อย",
    //     sys_update_date: new Date().toUTCString(),
    //   })
    // }
  }

  return (
    <SafeAreaView>
      <View>
        {status === AppConfig.PostsStatus.adminConfirmPayment && (
          <Button
            title="กดเริ่มงาน"
            style={styles.button}
            onPress={() => saveStartWork()}
          />
        )}
        {status === AppConfig.PostsStatus.customerStartWork && (
          <Button
            title="ให้คะแนน Partner"
            style={styles.button}
            onPress={() => saveToCloseJob()}
          />
        )}
        {status === AppConfig.PostsStatus.customerCloseJob && (
          <View>
            <Text>สถานะ: </Text>
            <Text>คะแนนที่ได้รับ: </Text>
          </View>
        )}
        {showButton === "process" && (
          <Text style={{ color: "blue" }}>บันทึกข้อมูลเรียบร้อย</Text>
        )}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item, index) => (
          <View
            id={item.partnerId}
            key={`v_${item.id}_${index}`}
            style={{
              margin: 5,
              padding: 10,
              backgroundColor: "red",
              height: 300,
              borderRadius: 15,
            }}
          >
            <View
              style={{
                backgroundColor: "#eee",
                padding: 5,
                marginLeft: -10,
                marginTop: -10,
                borderBottomRightRadius: 15,
              }}
            >
              <Text style={{ color: "black" }}>ชื่อ: {item.partnerName}</Text>
              <Text
                style={{ color: "black", fontWeight: "bold", color: "blue" }}
              >
                ราคา: {item.amount}
              </Text>
            </View>
            <Image
              key={`img_${item.id}_${index}`}
              source={{ uri: item.image }}
              style={styles.image}
            />
            <Text style={{ color: "white" }}>เบอร์โทร: {item.telephone}</Text>
            <Text style={{ color: "white" }}>เพศ: {item.sex}</Text>
            <Text style={{ color: "white" }}>บุคลิค: {item.character}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 130,
    margin: 5,
    borderWidth: 1.5,
    borderRadius: 15,
  },
  button: {
    margin: 10,
    borderRadius: 5,
  },
})
