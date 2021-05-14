import React, { useEffect, useState } from "react"
import { Image, View, Platform, StyleSheet } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { Button, Text, Input } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"

const PaymentForm = ({ navigation }) => {
  const [image, setImage] = useState(null)
  const [bank, setBank] = useState("")
  const [amount, setAmount] = useState("")
  const [datetime, setDateTime] = useState("")

  useEffect(() => {
    ;(async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!")
        }
      }
    })()
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Input
        name="bank"
        placeholder="ธนาคารที่โอนเงิน"
        leftIcon={{ type: "font-awesome", name: "bank" }}
        style={styles.inputForm}
        onChangeText={(value) => setBank(value)}
        value={bank}
      />
      <Input
        name="amount"
        placeholder="ยอดเงินโอน 0.00"
        leftIcon={{ type: "font-awesome", name: "dollar" }}
        style={styles.inputForm}
        onChangeText={(value) => setAmount(value)}
        value={amount}
      />
      <Input
        name="datetime"
        placeholder="เวลาที่โอนเงิน (dd/MM/yyyy)"
        leftIcon={{ type: "font-awesome", name: "calendar" }}
        style={styles.inputForm}
        onChangeText={(value) => setDateTime(value)}
        value={datetime}
      />
      <Button
        icon={
          <Icon
            name="file"
            size={15}
            color="white"
            style={{ marginRight: 5 }}
          />
        }
        title="เลือกไฟล์...สลิปสำหรับการโอนเงิน"
        onPress={pickImage}
      />
      {image && (
        <View style={{ flex: 1, justifyContent: "space-around" }}>
          <Image source={{ uri: image }} style={{ width: 200, height: 250 }} />
          <Button
            icon={
              <Icon
                name="save"
                size={20}
                color="white"
                style={{ marginRight: 5 }}
              />
            }
            buttonStyle={styles.buttonConfirm}
            title="ยืนยันข้อมูลการโอนเงิน ไปยัง Admin"
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  buttonConfirm: {
    backgroundColor: "green",
  },
  inputForm: {
    margin: 10,
    borderWidth: 1.5,
    borderColor: "#bbb",
    padding: 5,
  },
})

export default PaymentForm
