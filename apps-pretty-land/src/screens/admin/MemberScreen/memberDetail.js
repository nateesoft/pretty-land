import React from "react"
import { StyleSheet, View, Image, SafeAreaView, Alert } from "react-native"
import { Button, Text } from "react-native-elements"
import { Ionicons, Feather, AntDesign } from "react-native-vector-icons"
import Moment from 'moment';

import firebase from "../../../../util/firebase"

const MemberDetailScreen = ({ navigation, route }) => {
  const { navigate } = navigation
  const { item } = route.params

  const handleRemovePermanent = () => {
    firebase.database().ref(`members/${item.id}`).remove()
    navigate("List-All-Member")
  }

  const approveMember = () => {
    // save data
    firebase.database().ref(`members/${item.id}`).update({
      status: "active",
      statusText: "ผ่านการอนุมัติ",
      member_register_date: new Date().toUTCString()
    })
    navigation.navigate("List-All-Member")
  }

  return (
    <SafeAreaView style={styles.cardDetail}>
      <View style={styles.viewCard}>
        <Text style={{ fontSize: 22 }}>แสดงรายละเอียดสมาชิก</Text>
        {item.image && (
          <Image
            source={{ uri: item.image }}
            style={{
              justifyContent: "center",
              width: "100%",
              height: 350,
              marginTop: 20,
            }}
          />
        )}
        <View
          style={{ padding: 20, borderWidth: 1, borderRadius: 25, margin: 10 }}
        >
          <Text style={{ fontSize: 16 }}>
            ชื่อ: {item.name || item.username}
          </Text>
          <Text style={{ fontSize: 16 }}>ประเภทสมาชิก: {item.memberType}</Text>
          <Text style={{ fontSize: 16 }}>
            วันที่เป็นสมาชิก: {item.member_register_date ? Moment(item.member_register_date).format('D MMM YYYY') : "ยังไม่ได้กำหนด"}
          </Text>
          <Text style={{ fontSize: 16 }}>
            ระดับ Level: {item.customerLevel || 0}
          </Text>
          <Text style={{ fontSize: 16 }}>
            เบอร์ติดต่อ: {item.mobile || "ยังไม่ได้กำหนด"}
          </Text>
          <Text style={{ fontSize: 16 }}>สถานะ: {item.statusText}</Text>
        </View>
        {item.status === "new_register" && (
          <Button
            icon={
              <Feather
                name="user-check"
                size={24}
                color="white"
                style={{ marginRight: 5 }}
              />
            }
            iconLeft
            buttonStyle={{
              margin: 5,
              backgroundColor: "green",
              borderRadius: 25,
              paddingHorizontal: 20,
            }}
            title="อนุมัติเป็น Partner"
            onPress={() => approveMember()}
          />
        )}
        {item.status !== "new_register" && item.status !== "not_approve" && (
          <Button
            icon={
              <AntDesign
                name="deleteuser"
                size={24}
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
            title="สั่งพักงาน"
            onPress={() => navigation.navigate("List-All-Member")}
          />
        )}
        {item.status === "not_approve" && (
          <Button
            icon={
              <Ionicons
                name="shield-checkmark-outline"
                size={15}
                color="white"
                style={{ marginRight: 5 }}
              />
            }
            iconLeft
            buttonStyle={{
              margin: 5,
              backgroundColor: "green",
              borderRadius: 25,
              paddingHorizontal: 20,
            }}
            title="ยกเลิกสั่งพักงาน"
            onPress={() => navigation.navigate("List-All-Member")}
          />
        )}
        <Button
          icon={
            <Ionicons
              name="trash-bin-outline"
              size={24}
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
          title="ลบข้อมูลออกจากระบบ"
          onPress={() => handleRemovePermanent()}
        />
      </View>
    </SafeAreaView>
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
})

export default MemberDetailScreen
