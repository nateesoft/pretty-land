import React, { useState, useEffect } from "react"
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  Alert,
} from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { Button } from "react-native-elements"
import DropDownPicker from "react-native-dropdown-picker"

import { getCountryList, getDistrictList } from "../../../data/apis"

import firebase from "../../../../util/firebase"
import { GetIcon } from "../../../components/GetIcons"

const RegisterPartnerForm = ({ navigation, route }) => {
  const { navigate } = navigation
  const { userId, status, workType } = route.params
  const [mobile, setMobile] = useState("")
  const [province, setProvince] = useState("")
  const [district, setDistrict] = useState("")
  const [address, setAddress] = useState("")
  const [lineId, setLineId] = useState("")

  const [openSelectProvince, setOpenSelectProvince] = useState(false)
  const [provinceList, setProvinceList] = useState(getCountryList())

  const [openSelectDistrict, setOpenSelectDistrict] = useState(false)
  const [districtList, setDistrictList] = useState([])

  const handleNextData = () => {
    if (!lineId) {
      Alert.alert("กรุณาระบุ Line Id")
      return
    }
    if (!mobile) {
      Alert.alert("กรุณาระบุเบอร์โทรศัพท์ เพื่อติดต่อ")
      return
    }
    if (!province) {
      Alert.alert("กรุณาระบุจังหวัดที่รับงานได้")
      return
    }
    if (!district) {
      Alert.alert("กรุณาระบุอำเภอที่รับงานได้")
      return
    }
    if (workType === "4" && !address) {
      Alert.alert("กรุณาระบุรายละเอียดที่อยู่เพิ่มเติม")
      return
    }

    // save data
    firebase.database().ref(`members/${userId}`).update({
      mobile,
      province,
      district,
      address,
      lineId,
    })

    navigate("Partner-Register-Bank-Form", { userId, status, workType })
  }

  useEffect(() => {
    const onChangeValue = firebase
      .database()
      .ref(`members/${userId}`)
      .on("value", (snapshot) => {
        const data = { ...snapshot.val() }
        setLineId(data.lineId || "")
        setMobile(data.mobile || "")
        setProvince(data.province || "")
        setDistrict(data.district || "")
        setAddress(data.address || "")
      })

    return () =>
      firebase
        .database()
        .ref(`members/${userId}`)
        .off("value", onChangeValue)
  }, [])

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", height: "100%" }}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.textFormInfo}>รายละเอียดการรับงาน</Text>
      </View>
      <View style={{ width: "80%", alignSelf: "center" }}>
        <Text style={{ fontSize: 16, padding: 5, textTransform: "uppercase" }}>Line Id</Text>
        <View style={styles.formControl}>
          <GetIcon type="fa5" name="line" />
          <TextInput
            value={`${lineId}`}
            onChangeText={(value) => setLineId(value)}
            style={styles.textInput}
            placeholder="LINE ID"
          />
        </View>
        <Text style={{ fontSize: 16, padding: 5, marginTop: 5 }}>เบอร์โทรศัพท์</Text>
        <View style={styles.formControl}>
          <GetIcon type="fa" name="mobile-phone" />
          <TextInput
            value={`${mobile}`}
            onChangeText={(value) => setMobile(value)}
            style={styles.textInput}
            placeholder="เบอร์โทรศัพท์"
          />
        </View>
        <Text style={{ color: "chocolate",marginTop: 5 }}>
          * เบอร์โทรศัพท์จะไม่แสดงให้ลูกค้าเห็น
        </Text>
        <View style={{ alignSelf: "center" }}>
          <Text style={{ fontSize: 16, padding: 5, marginTop: 10 }}>จังหวัดที่รับงาน</Text>
          <DropDownPicker
            placeholder="-- เลือกจังหวัด --"
            open={openSelectProvince}
            setOpen={setOpenSelectProvince}
            value={province}
            setValue={setProvince}
            items={provinceList}
            setItems={setProvinceList}
            textStyle={{ fontSize: 18 }}
            searchable={false}
            zIndex={4}
          />

          <Text style={{ fontSize: 16, padding: 5, marginTop: 5 }}>อำเภอ</Text>
          <DropDownPicker
            placeholder="-- เลือกอำเภอ --"
            open={openSelectDistrict}
            setOpen={setOpenSelectDistrict}
            value={district}
            setValue={setDistrict}
            items={getDistrictList(province)}
            setItems={setDistrictList}
            searchable={false}
            textStyle={{ fontSize: 18 }}
            zIndex={3}
          />
          {workType === "4" && (
            <View style={styles.formControl}>
              <GetIcon type="mi" name="home-work" />
              <TextInput
                value={`${address}`}
                onChangeText={(value) => setAddress(value)}
                style={styles.textInput}
                placeholder="คอนโด/ตึก/หมู่บ้าน"
              />
            </View>
          )}
          <Button
            title="บันทึก/ถัดไป"
            iconLeft
            icon={
              <AntDesign
                name="bank"
                color="white"
                size={24}
                style={{ marginHorizontal: 15 }}
              />
            }
            buttonStyle={{
              backgroundColor: "#65A3E1",
              marginTop: 20,
              borderRadius: 25,
              paddingHorizontal: 15,
              height: 45,
              borderWidth: 0.5,
              marginBottom: 20,
            }}
            onPress={() => handleNextData()}
          />
        </View>
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

export default RegisterPartnerForm
