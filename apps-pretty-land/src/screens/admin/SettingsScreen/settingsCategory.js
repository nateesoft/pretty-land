import React from "react"
import { StyleSheet, View, ImageBackground } from "react-native"
import { Button, Text } from "react-native-elements"
import { FontAwesome, MaterialIcons } from "react-native-vector-icons"
import { Ionicons } from "@expo/vector-icons"

import bgImage from "../../../../assets/bg.png"

const ViewProfileScreen = ({ navigation, route }) => {
  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <Text style={styles.textTopic}>ตั้งค่าระบบ / รายงาน</Text>
      <View style={[styles.cardDetail, { marginTop: "40%" }]}>
        <Button
          icon={
            <FontAwesome
              name="user-secret"
              size={20}
              color="white"
              style={{ marginRight: 5 }}
            />
          }
          titleStyle={{ fontSize: 22 }}
          iconLeft
          buttonStyle={styles.btnNewAdmin}
          title="เพิ่มข้อมูลผู้ใช้งาน"
          onPress={() => navigation.navigate("New-Admin-Form")}
        />
        <Button
          icon={
            <MaterialIcons
              name="app-settings-alt"
              size={20}
              color="white"
              style={{ marginRight: 5 }}
            />
          }
          titleStyle={{ fontSize: 22 }}
          iconLeft
          buttonStyle={styles.btnPostConfig}
          title="จัดการข้อมูลระบบ"
          onPress={() => navigation.navigate("View-Settings")}
        />
        <Button
          icon={
            <FontAwesome
              name="user-secret"
              size={20}
              color="white"
              style={{ marginRight: 5 }}
            />
          }
          titleStyle={{ fontSize: 22 }}
          iconLeft
          buttonStyle={styles.btnListAdmin}
          title="ข้อมูล admin"
          onPress={() => navigation.navigate("Admin-Lists")}
        />
        <Button
          icon={
            <Ionicons
              name="newspaper-sharp"
              size={24}
              color="white"
              style={{ marginRight: 5 }}
            />
          }
          titleStyle={{ fontSize: 22 }}
          iconLeft
          buttonStyle={styles.btnMemberReport}
          title="รายงานการสมัครสมาชิก"
          onPress={() => navigation.navigate("Member-Register-Lists")}
        />
        <Button
          icon={
            <Ionicons
              name="newspaper-sharp"
              size={24}
              color="white"
              style={{ marginRight: 5 }}
            />
          }
          titleStyle={{ fontSize: 22 }}
          iconLeft
          buttonStyle={styles.btnPartnerReport}
          title="รายงานสมัคร Partner"
          onPress={() => navigation.navigate("Partner-Register-Lists")}
        />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  btnListAdmin: {
    margin: 5,
    paddingHorizontal: 50,
    borderRadius: 5,
    width: 350,
    height: 75,
    justifyContent: "flex-start",
    backgroundColor: "#ff2fe6",
    opacity: 0.65,
  },
  btnMemberReport: {
    margin: 5,
    paddingHorizontal: 50,
    borderRadius: 5,
    width: 350,
    height: 75,
    justifyContent: "flex-start",
    backgroundColor: "#ff2fe6",
    opacity: 0.65,
  },
  btnPartnerReport: {
    margin: 5,
    paddingHorizontal: 50,
    borderRadius: 5,
    borderBottomRightRadius: 20,
    width: 350,
    height: 75,
    justifyContent: "flex-start",
    backgroundColor: "#ff2fe6",
    opacity: 0.65,
  },
  btnPostConfig: {
    margin: 5,
    paddingHorizontal: 50,
    borderRadius: 5,
    width: 350,
    height: 75,
    justifyContent: "flex-start",
    backgroundColor: "#ff2fe6",
    opacity: 0.65,
  },
  btnNewAdmin: {
    margin: 5,
    paddingHorizontal: 50,
    borderRadius: 5,
    borderTopLeftRadius: 20,
    width: 350,
    height: 75,
    justifyContent: "flex-start",
    backgroundColor: "#ff2fe6",
    opacity: 0.65,
  },
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
  textTopic: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    backgroundColor: "#ff2fe6",
    padding: 10,
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
})

export default ViewProfileScreen
