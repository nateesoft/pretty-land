import React from "react"
import { Button, StyleSheet } from "react-native"
import { View, Text } from "react-native"

import { Context as AuthContext } from "../../context/AuthContext"

const LogoutScreen = ({ navigation }) => {
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
      <Button title="ออกจากระบบ" style={styles.btnGoHome} onPress={()=>signOut()} />
    </View>
  )
}

const styles = StyleSheet.create({
  btnGoHome: {
    borderWidth: 1.5,
    backgroundColor: 'white',
  }
})

export default LogoutScreen
