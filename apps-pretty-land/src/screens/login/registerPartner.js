import React, { useState } from "react"
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { Button } from "react-native-elements"

import { GetIcon } from "../../components/GetIcons"
import bg from "../../../assets/login.png"

const RegisterPartnerForm = ({ navigation, route }) => {
  const { navigate } = navigation
  const { partnerData } = route.params
  const [mobile, setMobile] = useState("")
  const [province, setProvince] = useState("")
  const [district, setDistrict] = useState("")
  const [address, setAddress] = useState("")
  const [lineId, setLineId] = useState("")

  const handleNextData = () => {
    if(!mobile){
      Alert.alert("กรุณาระบุเบอร์โทรศัพท์ เพื่อติดต่อ")
      return;
    }
    if(!province){
      Alert.alert("กรุณาระบุจังหวัดที่รับงานได้")
      return;
    }
    if(!district){
      Alert.alert("กรุณาระบุอำเภอที่รับงานได้")
      return;
    }
    if(!address){
      Alert.alert("กรุณาระบุรายละเอียดที่อยู่เพิ่มเติม")
      return;
    }
    if(!lineId){
      Alert.alert("กรุณาระบุ Line Id")
      return;
    }
    navigate("Partner-Register-Bank-Form", {
      addressData: {
        ...partnerData,
        mobile,
        province,
        district,
        address,
        lineId,
      },
    })
  }

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        <Image style={styles.image} source={bg} />
        <Text style={styles.textFormInfo}>รายละเอียดการรับงาน</Text>
        <View style={styles.formControl}>
          <GetIcon type="fa" name="mobile-phone" />
          <TextInput
            value={`${mobile}`}
            onChangeText={(value) => setMobile(value)}
            style={styles.textInput}
            placeholder="เบอร์โทรศัพท์"
          />
        </View>
        <View style={styles.formControl}>
          <GetIcon type="mi" name="home-work" />
          <TextInput
            value={`${province}`}
            onChangeText={(value) => setProvince(value)}
            style={styles.textInput}
            placeholder="จังหวัด"
          />
        </View>
        <View style={styles.formControl}>
          <GetIcon type="mi" name="home-work" />
          <TextInput
            value={`${district}`}
            onChangeText={(value) => setDistrict(value)}
            style={styles.textInput}
            placeholder="อำเภอ"
          />
        </View>
        <View style={styles.formControl}>
          <GetIcon type="mi" name="home-work" />
          <TextInput
            value={`${address}`}
            onChangeText={(value) => setAddress(value)}
            style={styles.textInput}
            placeholder="คอนโด/ตึก/หมู่บ้าน"
          />
        </View>
        <View style={styles.formControl}>
          <GetIcon type="fa5" name="line" />
          <TextInput
            value={`${lineId}`}
            onChangeText={(value) => setLineId(value)}
            style={styles.textInput}
            placeholder="LINE ID"
          />
        </View>
        <Button
          title="เพิ่มข้อมูลถัดไป"
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
            width: 250,
            paddingHorizontal: 15,
            height: 45,
            borderWidth: 0.5,
            marginBottom: 20,
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

export default RegisterPartnerForm
