import React from "react"
import { StyleSheet, View, ImageBackground } from "react-native"
import { Button, Text, Input } from "react-native-elements"
import { FontAwesome } from "react-native-vector-icons"

import bgImage from "../../../../assets/bg.png"

const ViewProfileScreen = ({ navigation, route }) => {
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [reNewPassword, setReNewPassword] = React.useState("")

  const handleSaveChangePassword = () => {
    console.log('save change password')
  }

  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <View style={styles.cardDetail}>
        <Text style={styles.textTopic}>แก้ไขข้อมูลส่วนตัว</Text>
        <Text style={styles.textSubTopic}>เปลี่ยนรหัสผ่าน</Text>
        <View style={styles.viewCard}>
          <Input
            name="username"
            placeholder="ชื่อผู้ใช้งาน"
            leftIcon={{ type: "font-awesome", name: "user" }}
            style={styles.inputForm}
            value={username}
            disabled
          />
          <Input
            name="password"
            placeholder="รหัสผ่านเดิม"
            leftIcon={{ type: "font-awesome", name: "address-book" }}
            style={styles.inputForm}
            onChangeText={(value) => setPassword(value)}
            value={password}
            secureTextEntry={true}
          />
          <Input
            name="comment"
            placeholder="รหัสผ่านใหม่"
            leftIcon={{ type: "font-awesome", name: "lock" }}
            style={styles.inputForm}
            onChangeText={(value) => setNewPassword(value)}
            value={newPassword}
            secureTextEntry={true}
          />
          <Input
            name="phone"
            placeholder="ยืนยันรหัสผ่านใหม่"
            leftIcon={{ type: "font-awesome", name: "lock" }}
            style={styles.inputForm}
            onChangeText={(value) => setReNewPassword(value)}
            value={reNewPassword}
            secureTextEntry={true}
          />
        </View>
        <Button
          icon={
            <FontAwesome
              name="save"
              size={20}
              color="white"
              style={{ marginRight: 5 }}
            />
          }
          iconLeft
          buttonStyle={styles.btnSave}
          title="บันทึกข้อมูล"
          onPress={() => handleSaveChangePassword()}
        />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  inputForm: {
    marginLeft: 20,
  },
  btnSave: {
    margin: 15, 
    paddingHorizontal: 50, 
    borderRadius: 55,
    backgroundColor: '#ff2fe6',
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
    color: "blue",
    marginBottom: 15,
    marginTop: 10,
  },
  textSubTopic: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 15,
    marginTop: 10,
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
})

export default ViewProfileScreen
