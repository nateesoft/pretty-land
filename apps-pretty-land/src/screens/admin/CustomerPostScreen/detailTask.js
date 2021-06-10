import React from "react"
import { Alert, StyleSheet, View } from "react-native"
import { Button, Text, Input } from "react-native-elements"
import { AntDesign, Ionicons } from "react-native-vector-icons"
import Moment from "moment"

import { updatePosts, saveProvincesGroupPostPartner } from "../../../apis"

const ConfirmTaskScreen = ({ navigation, route }) => {
  const { item } = route.params

  const updateToApprove = () => {
    updatePosts(item.id, {
      status: "admin_confirm_new_post",
      statusText: "อนุมัติโพสท์",
      sys_update_date: new Date().toUTCString(),
    })
    saveProvincesGroupPostPartner(
      {
        province: item.province,
        provinceName: item.provinceName,
        partnerType: item.partnerRequest,
      },
      item.partnerQty
    )
    Alert.alert("บันทึกข้อมูลเรียบร้อย")
    navigation.navigate("Post-List-All")
  }

  const updateNotApprove = () => {
    updatePosts(item.id, {
      status: "not_approve",
      statusText: "ไม่อนุมัติโพสท์",
      sys_update_date: new Date().toUTCString(),
    })
    navigation.navigate("Post-List-All")
  }

  return (
    <View style={styles.cardDetail}>
      <Text style={{ fontSize: 22 }}>รายละเอียด</Text>
      <Text style={{ fontSize: 16, marginVertical: 10, color: "blue" }}>
        ( สถานะ {item.statusText} )
      </Text>
      <View style={styles.viewCard}>
        <View style={{ marginLeft: 10, padding: 20 }}>
          <Text style={{ fontSize: 16 }}>ชื่อลูกค้า: {item.customerName}</Text>
          <Text style={{ fontSize: 16 }}>Level: {item.customerLevel}</Text>
          <Text style={{ fontSize: 16 }}>
            ประเภทที่ต้องการ: {item.partnerRequest}
          </Text>
          <Text style={{ fontSize: 16 }}>จังหวัด: {item.provinceName}</Text>
          <Text style={{ fontSize: 16 }}>จำนวน: {item.partnerQty} คน</Text>
        </View>
      </View>
      <View style={styles.viewCard}>
        <View style={{ marginLeft: 10, padding: 20 }}>
          <Text style={{ fontSize: 16 }}>
            สถานะที่นัดพบ: {item.placeMeeting}
          </Text>
          <Text style={{ fontSize: 16 }}>
            เบอร์ติดต่อ: {item.customerPhone}
          </Text>
        </View>
      </View>
      <View style={styles.viewCard}>
        <View style={{ marginLeft: 10, padding: 20 }}>
          <Text style={{ fontSize: 16 }}>
            วันที่สร้างข้อมูล:{" "}
            {Moment(item.sys_create_date).format("D MMM YYYY HH:mm:ss")}
          </Text>
          <Text style={{ fontSize: 16 }}>
            วันที่อัพเดตข้อมูล:{" "}
            {Moment(item.sys_update_date).format("D MMM YYYY HH:mm:ss")}
          </Text>
        </View>
      </View>
      {item.status === "customer_new_post_done" && (
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
            title="อนุมัติโพสท์"
            onPress={() => updateToApprove()}
          />
          <Button
            icon={
              <Ionicons
                name="trash-bin-outline"
                size={15}
                color="white"
                style={{ marginRight: 5 }}
              />
            }
            iconLeft
            buttonStyle={{
              margin: 5,
              backgroundColor: "red",
              borderRadius: 25,
              paddingHorizontal: 20,
            }}
            title="ไม่อนุมัติโพสท์"
            onPress={() => updateNotApprove()}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  cardDetail: {
    flex: 1,
    alignItems: "center",
    padding: 5,
    margin: 10,
    backgroundColor: "white",
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
    borderWidth: 1,
    borderColor: "#eee",
    padding: 5,
    marginVertical: 5,
  },
})

export default ConfirmTaskScreen
