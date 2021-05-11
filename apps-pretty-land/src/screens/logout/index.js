import React from "react"
import { View, Text } from "react-native"

const LogoutScreen = ({ navigation }) => {
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
        ออกจากระบบเรียบร้อย
      </Text>
    </View>
  )
}

export default LogoutScreen
