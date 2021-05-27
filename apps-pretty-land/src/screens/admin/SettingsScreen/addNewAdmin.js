import React from "react"
import { StyleSheet, View, ImageBackground } from "react-native"
import { Button, Text, Input, CheckBox } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"

import bgImage from "../../../../assets/bg.png"

const ViewProfileScreen = ({ navigation, route }) => {
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isAdmin, setSuperAdmin] = React.useState(false)

  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <View style={styles.cardDetail}>
        <Text style={styles.textTopic}>เพิ่มข้อมูล Admin</Text>
        <View style={styles.viewCard}>
          <Input
            name="username"
            placeholder="Username"
            leftIcon={{ type: "font-awesome", name: "address-book" }}
            style={styles.inputForm}
            onChangeText={(value) => setUsername(value)}
            value={username}
          />
          <Input
            name="password"
            placeholder="Password"
            leftIcon={{ type: "font-awesome", name: "lock" }}
            style={styles.inputForm}
            onChangeText={(value) => setPassword(value)}
            value={password}
            secureTextEntry={true}
          />
          <CheckBox
            title="กำหนดเป็นผู้ดูแลระบบหลัก"
            checked={isAdmin}
            onPress={() => setSuperAdmin(!isAdmin)}
            containerStyle={{ backgroundColor: null, borderColor: "#ff2fe6" }}
          />
        </View>
        <Button
          icon={
            <Icon
              name="save"
              size={20}
              color="white"
              style={{ marginRight: 5 }}
            />
          }
          iconLeft
          buttonStyle={styles.btnSave}
          title="เพิ่มข้อมูล"
          onPress={() => navigation.navigate("Settings-Category")}
        />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  btnSave: {
    margin: 15,
    paddingHorizontal: 50,
    borderRadius: 55,
    backgroundColor: "#ff2fe6",
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
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
})

export default ViewProfileScreen
