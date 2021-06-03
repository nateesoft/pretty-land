import React, { useContext } from "react"
import { StyleSheet, Alert, View, Text, ImageBackground } from "react-native"
import { Button } from "react-native-elements"
import { MaterialIcons } from "@expo/vector-icons"

import { Context as AuthContext } from "../../context/AuthContext"
import bgImage from "../../../assets/bg.png"

const LogoutScreen = ({ navigation, route }) => {
  const { signOut } = useContext(AuthContext)

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
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "pink",
            padding: 20,
            marginBottom: 20,
            opacity: 0.5,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              color: "red",
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            ยืนยันการออกจากระบบ ?
          </Text>
        </View>
        <Button
          title="ออกจากระบบ"
          color="red"
          onPress={() => handleLogoutConfirm()}
          buttonStyle={{
            backgroundColor: "red",
            borderRadius: 5,
            paddingHorizontal: 15,
          }}
          icon={<MaterialIcons name="logout" size={24} color="white" />}
        />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
})

export default LogoutScreen
