import React, { useState } from "react"
import { View, Text, ScrollView, StyleSheet, Image } from "react-native"
import { Button } from "react-native-elements"

import { AppConfig } from "../../../Constants"
import firebase from "../../../../util/firebase"

const getListItem = (items) => {
  const datas = []
  for (let key in items) {
    const obj = items[key]
    datas.push(obj)
  }
  return datas
}

export default function PartnerListItem(props) {
  const { items: data, status, postId, post, navigation } = props
  const [items, setItems] = useState(getListItem(data))
  const [showButton, setShowButton] = useState("show")

  const showButtonStartWork = () => {
    // if (status === AppConfig.PostsStatus.waitAdminApprovePost) {
    //   return false
    // } else if (
    //   item.customerStatus === AppConfig.PostsStatus.customerStartWork
    // ) {
    //   return false
    // } else if (
    //   item.selectStatus === AppConfig.PostsStatus.closeJob ||
    //   status === AppConfig.PostsStatus.closeJob
    // ) {
    //   return false
    // } else if (showButton === "process") {
    //   return false
    // }
    // return true
  }

  const saveStartWork = () => {
    // firebase
    //   .database()
    //   .ref(`posts/${postId}/partnerSelect/${partnerId}`)
    //   .update({
    //     selectStatus: AppConfig.PostsStatus.customerStartWork,
    //     selectStatusText: "เริ่มปฏิบัติงาน",
    //     customerStatus: AppConfig.PostsStatus.customerStartWork,
    //     customerStatusText: "Customer กดเริ่มงาน",
    //     customerStart: new Date().toUTCString(),
    //     sys_update_date: new Date().toUTCString(),
    //   })
    // setShowButton("process")
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

  const saveHistoryStar = (partnerId, postId, rate) => {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`partner_star/${partnerId}/${postId}`)
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
    <View style={styles.containers}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item, index) => (
          <View id={item.id} style={styles.card}>
            <Text>{item.partnerName}</Text>
            <Text>ราคา: {item.amount}</Text>
            <Image
              key={`img_${item.id}`}
              source={{ uri: item.image }}
              style={styles.image}
            />
          </View>
        ))}
        {showButtonStartWork() && (
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
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  containers: {
    padding: 10,
  },
  card: {
    padding: 10,
    margin: 5,
    backgroundColor: "white",
    height: 250,
    width: 200,
    alignItems: "center",
  },
  image: {
    height: 150,
    width: 130,
    margin: 5,
    padding: 10,
    borderWidth: 1.5,
    borderRadius: 25,
    borderColor: "#ff2fe6",
  },
  button: {
    margin: 10,
  },
})
