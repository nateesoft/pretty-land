import React from "react"
import { StyleSheet, View } from "react-native"
import { Button, Text, Input } from "react-native-elements"
import { FontAwesome, Foundation } from "react-native-vector-icons"

const ViewProfileScreen = ({ navigation, route }) => {
  return (
    <View style={styles.cardDetail}>
      <Text style={styles.textTopic}>ตั้งค่าระบบ Settings</Text>
      <Button
        icon={
          <FontAwesome
            name="user-secret"
            size={20}
            color="white"
            style={{ marginRight: 5 }}
          />
        }
        iconLeft
        buttonStyle={styles.btnNewAdmin}
        title="เพิ่มข้อมูลผู้ใช้งาน"
        onPress={() => navigation.navigate("New-Admin-Form")}
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
        iconLeft
        buttonStyle={styles.btnPostConfig}
        title="จัดการโพสท์"
        onPress={() => navigation.navigate("View-Settings")}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  btnPostConfig: {
    margin: 5,
    paddingHorizontal: 50,
    borderRadius: 55,
    backgroundColor: "chocolate",
    width: 250,
  },
  btnNewAdmin: {
    margin: 5,
    paddingHorizontal: 50,
    borderRadius: 55,
    backgroundColor: "green",
    width: 250,
  },
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
    padding: 5,
  },
  textTopic: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginBottom: 15,
    marginTop: 10,
  },
})

export default ViewProfileScreen
