import React from "react"
import { Button, Alert, View, Text } from "react-native"

import { Context as AuthContext } from "../../context/AuthContext"

const LogoutScreen = ({ navigation, route }) => {
  const { signOut } = React.useContext(AuthContext)

  const handleLogoutConfirm = () => {
    Alert.alert(
      "แจ้งเตือน",
      "คุณต้องการออกจากระบบ Pretty Land ใช่ไหรือไม่ ?",
      [
        {
          text: "ออกจากระบบ",
          onPress: () => signOut(),
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

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
      }}
    >
      <Text style={{ fontSize: 28, color: "white", fontWeight: "bold" }}>
        ยืนยันการออกจากระบบ
      </Text>
      <Button title="ออกจากระบบ" color="white" onPress={()=>handleLogoutConfirm()} />
    </View>
  )
}

export default LogoutScreen
