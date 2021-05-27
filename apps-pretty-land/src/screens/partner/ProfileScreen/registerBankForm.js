import React, { useState, useEffect } from "react"
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  SafeAreaView,
} from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { Button } from "react-native-elements"
import DropDownPicker from "react-native-dropdown-picker"

import { getBankList } from "../../../data/apis"

import firebase from "../../../../util/firebase"
import { GetIcon } from "../../../components/GetIcons"

const RegisterPartnerBankForm = ({ navigation, route }) => {
  const { navigate } = navigation
  const { userId, status } = route.params
  const [bank, setBank] = useState("")
  const [bankNo, setBankNo] = useState("")

  const [openSelectBank, setOpenSelectBank] = React.useState(false)
  const [bankList, setBankList] = React.useState(getBankList())

  const handleNextData = () => {
    if (!bank) {
      Alert.alert("กรุณาระบุธนาคารที่รอรับเงินโอน")
      return
    }
    if (!bankNo) {
      Alert.alert("กรุณาระบุเลขที่บัญชีธนาคาร")
      return
    }

    // save data
    firebase.database().ref(`members/${userId}`).update({
      bank,
      bankNo,
    })

    navigate("Partner-Register-Image-Upload", { userId, status })
  }

  useEffect(() => {
    const onChangeValue = firebase
      .database()
      .ref(`members/${userId}`)
      .on("value", (snapshot) => {
        const data = { ...snapshot.val() }
        setBank(data.bank || "")
        setBankNo(data.bankNo || "")
      })

    return () =>
      firebase.database().ref(`members/${userId}`).off("value", onChangeValue)
  }, [])

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", height: "100%" }}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.textFormInfo}>เพิ่มข้อมูลธนาคาร</Text>
      </View>

      <View style={{ width: "80%", alignSelf: "center" }}>
        <Text style={{ fontSize: 16, padding: 5 }}>ธนาคาร</Text>
        <DropDownPicker
          placeholder="-- เลือกธนาคาร --"
          open={openSelectBank}
          setOpen={setOpenSelectBank}
          value={bank}
          setValue={setBank}
          items={bankList}
          setItems={setBankList}
          textStyle={{ fontSize: 18 }}
        />

        <Text style={{ fontSize: 16, padding: 5, marginTop: 10 }}>
          เลขที่บัญชีธนาคาร
        </Text>
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
          title="บันทึก/ถัดไป"
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
            paddingHorizontal: 15,
            height: 45,
            borderWidth: 0.5,
          }}
          onPress={() => handleNextData()}
        />
      </View>
    </SafeAreaView>
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
    height: 50,
    borderRadius: 10,
  },
})

export default RegisterPartnerBankForm
