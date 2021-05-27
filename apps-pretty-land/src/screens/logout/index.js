import React from "react"
import { Button, StyleSheet, View, Text } from "react-native"

import { Context as AuthContext } from "../../context/AuthContext"

const LogoutScreen = ({ navigation, route }) => {
  const { signOut } = React.useContext(AuthContext)

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
      <Button title="ออกจากระบบ" color="white" onPress={()=>signOut()} />
    </View>
  )
}

export default LogoutScreen
