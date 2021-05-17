import React from "react"
import { StyleSheet, View } from "react-native"
import { Button, Text, Input } from "react-native-elements"
import {FontAwesome,MaterialIcons} from "react-native-vector-icons"

const ViewContact = ({ navigation, route }) => {
  const [textMsg, setTextMsg] = React.useState("")

  return (
    <View style={styles.cardDetail}>
      <Text style={styles.textTopic}>ส่งข้อความหา Admin</Text>
      <View style={styles.viewCard}>
        <Input
          name="textMsg"
          placeholder="ข้อความที่ต้องการส่ง"
          leftIcon={{ type: "font-awesome", name: "address-book" }}
          style={styles.inputForm}
          onChangeText={(value) => setTextMsg(value)}
          value={textMsg}
        />
      </View>
      <Button
        icon={
          <MaterialIcons
            name="email"
            size={20}
            color="white"
            style={{ marginRight: 5 }}
          />
        }
        iconLeft
        buttonStyle={styles.btnSave}
        title="ส่งข้อมูล"
        onPress={() => navigation.navigate("Partner-Category")}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  btnSave: {
    margin: 15,
    paddingHorizontal: 50,
    borderRadius: 55,
    backgroundColor: "orange",
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

export default ViewContact
