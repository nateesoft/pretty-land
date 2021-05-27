import React from "react"
import { StyleSheet, View, Image, SafeAreaView, Alert } from "react-native"
import { Button, Text } from "react-native-elements"
import { Ionicons, Feather, AntDesign } from "react-native-vector-icons"
import Moment from "moment"

import { AppConfig } from "../../../Constants"
import firebase from "../../../../util/firebase"

const MemberDetailScreen = ({ navigation, route }) => {
  const { navigate } = navigation
  const { item } = route.params

  const confirmRemovePermanent = () => {
    firebase.database().ref(`members/${item.id}`).remove()
    navigate("List-All-Member")
  }

  const handleRemovePermanent = () => {
    Alert.alert(
      "ต้องการลบข้อมูลผู้ใช้ถาวร ใช่หรือไม่ ?",
      "กรุณายืนยันอีกครั้ง ถ้ากดลบข้อมูลจะไม่สามารถเรียกคืนได้อีก !!!",
      [
        {
          text: "ยืนยันการลบ",
          onPress: () => confirmRemovePermanent(),
        },
        {
          text: "ยกเลิก",
          onPress: () => console.log("No Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    )
  }

  const approveMember = () => {
    // update status member
    firebase.database().ref(`members/${item.id}`).update({
      status: AppConfig.MemberStatus.active,
      statusText: AppConfig.MemberStatus.activeMessage,
      member_register_date: new Date().toUTCString(),
      member_update_date: new Date().toUTCString(),
    })
    navigation.navigate("List-All-Member")
  }

  const suspendMember = () => {
    // update status member
    firebase.database().ref(`members/${item.id}`).update({
      status: AppConfig.MemberStatus.suspend,
      statusText: AppConfig.MemberStatus.suspendMessage,
      member_update_date: new Date().toUTCString(),
    })
    navigation.navigate("List-All-Member")
  }

  const cancelSuspendMember = () => {
    // update status member
    firebase.database().ref(`members/${item.id}`).update({
      status: AppConfig.MemberStatus.active,
      statusText: AppConfig.MemberStatus.activeMessage,
      member_register_date: new Date().toUTCString(),
      member_update_date: new Date().toUTCString(),
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
            วันที่เป็นสมาชิก:{" "}
            {item.member_register_date
              ? Moment(item.member_register_date).format("D MMM YYYY")
              : "[ รออนุมัติ ]"}
          </Text>
          <Text style={{ fontSize: 16 }}>
            ระดับ Level: {item.customerLevel || 0}
          </Text>
          <Text style={{ fontSize: 16 }}>
            เบอร์ติดต่อ: {item.mobile || "[ ไม่พบข้อมูล ]"}
          </Text>
          <Text style={{ fontSize: 16 }}>สถานะ: {item.statusText}</Text>
        </View>
        {item.status === AppConfig.MemberStatus.newRegister && (
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
              borderRadius: 10,
            }}
            title="อนุมัติเป็น Partner"
            onPress={() => approveMember()}
          />
        )}
        {item.status !== AppConfig.MemberStatus.newRegister &&
          item.status !== AppConfig.MemberStatus.suspend && (
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
                borderRadius: 10,
              }}
              title="สั่งพักงาน"
              onPress={() => suspendMember()}
            />
          )}
        {item.status === AppConfig.MemberStatus.suspend && (
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
              backgroundColor: "blue",
              borderRadius: 10,
            }}
            title="ยกเลิกสั่งพักงาน"
            onPress={() => cancelSuspendMember()}
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
            borderRadius: 10,
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
