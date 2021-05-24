import React, { useState } from "react"
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Alert,
} from "react-native"
import { Button } from "react-native-elements/dist/buttons/Button"
import {
  AntDesign,
} from "@expo/vector-icons"

import { GetIcon } from "../../../components/GetIcons"

const RegisterPartnerBankForm = ({ navigation, route }) => {
  const { navigate } = navigation
  const { addressData } = route.params
  const [bank, setBank] = useState("")
  const [bankNo, setBankNo] = useState("")

  const handleNextData = () => {
    if(!bank){
      Alert.alert("กรุณาระบุธนาคารที่รอรับเงินโอน")
      return;
    }
    if(!bankNo){
      Alert.alert("กรุณาระบุเลขที่บัญชีธนาคาร")
      return;
    }
    navigate("Partner-Register-Image-Upload", {
      bankData: {
        ...addressData,
        bank,
        bankNo,
      },
    })
  }

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        <Text style={styles.textFormInfo}>เพิ่มข้อมูลธนาคาร</Text>
        <View style={styles.formControl}>
          <GetIcon type="mci" name="bank" />
          <TextInput
            value={`${bank}`}
            onChangeText={(value) => setBank(value)}
            style={styles.textInput}
            placeholder="เลือกธนาคาร"
          />
        </View>
        <View style={styles.formControl}>
          <GetIcon type="fa5" name="money-check" />
          <TextInput
            value={`${bankNo}`}
            onChangeText={(value) => setBankNo(value)}
            style={styles.textInput}
            placeholder="ใส่เลขบัญชี"
          />
        </View>
        <Button
          title="เพิ่มข้อมูลถัดไป"
          iconLeft
          icon={
            <AntDesign
              name="picture"
              color="white"
              size={24}
              style={{ marginHorizontal: 8 }}
            />
          }
          buttonStyle={{
            backgroundColor: "#65A3E1",
            marginTop: 20,
            borderRadius: 25,
            width: 250,
            paddingHorizontal: 15,
            height: 45,
            borderWidth: 0.5,
          }}
          onPress={() => handleNextData()}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 100,
    width: 100,
    marginBottom: 10,
  },
  textLogo: {
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "purple",
  },
  textDetail: {
    fontSize: 12,
    fontWeight: "bold",
    color: "gray",
    marginBottom: 20,
  },
  btnFacebook: {
    marginHorizontal: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    backgroundColor: "blue",
    paddingVertical: 2,
    borderRadius: 23,
  },
  textOr: {
    fontSize: 14,
    color: "gray",
    marginTop: 50,
  },
  textInput: {
    backgroundColor: "white",
    width: 250,
    textAlign: "center",
    fontSize: 16,
    marginVertical: 5,
  },
  textRegister: {
    color: "purple",
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  textFooter: {
    position: "absolute",
    bottom: 80,
    width: "90%",
    textAlign: "center",
    flexWrap: "wrap",
    fontSize: 12,
    color: "gray",
  },
  textFormInfo: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
  },
  formControl: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    paddingHorizontal: 10,
    borderColor: "#00716F",
    backgroundColor: "white",
    marginTop: 5,
    height: 40,
    borderRadius: 50,
    width: 300,
  },
})

export default RegisterPartnerBankForm
