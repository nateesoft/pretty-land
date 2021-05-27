import React from "react"
import { StyleSheet, View, ImageBackground } from "react-native"
import { Button, Text, Input } from "react-native-elements"
import { FontAwesome } from "react-native-vector-icons"

import bgImage from "../../../../assets/bg.png"

const ViewProfileScreen = ({ navigation, route }) => {
  const [owner, setOwner] = React.useState("")

  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <View style={styles.cardDetail}>
        <Text style={styles.textTopic}>ตั้งค่าระบบ Settings</Text>
        <View style={styles.viewCard}>
          <Input
            name="owner"
            placeholder="ค่าธรรมเนียม 100 บาท"
            leftIcon={{ type: "font-awesome", name: "address-book" }}
            style={styles.inputForm}
            onChangeText={(value) => setOwner(value)}
            value={owner}
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
    backgroundColor: '#ff2fe6',
  },
  btnNewAdmin: {
    margin: 15, 
    paddingHorizontal: 50, 
    borderRadius: 55,
    backgroundColor: 'green',
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
