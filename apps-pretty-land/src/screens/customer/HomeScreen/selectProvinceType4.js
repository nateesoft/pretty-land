import React, { useState } from "react"
import {
  View,
  ImageBackground,
  SafeAreaView,
  Alert,
  StyleSheet,
  TouchableHighlight,
  FlatList,
} from "react-native"
import { Text } from "react-native-elements"
import DropDownPicker from "react-native-dropdown-picker"

import { getCountryList, getDistrictList } from "../../../data/apis"
import { AppConfig } from "../../../Constants"
import firebase from "../../../../util/firebase"
import { getDocument } from "../../../../util"
import CardNotfound from "../../../components/CardNotfound"

const SelectProvinceType4 = (props) => {
  const { navigation, route } = props
  const { item, userId } = route.params

  const [partnerRequest, setPartnerRequest] = useState(item.value)

  const [openSelectCountry, setOpenSelectCountry] = useState(false)
  const [province, setProvince] = useState("")
  const [countryList, setCountryList] = useState(getCountryList())
  const [partnerQty, setPartnerQty] = useState("")
  const [partnerList, setPartnerList] = useState([])

  // อำเภอ/เขต
  const [openSelectDistrict, setOpenSelectDistrict] = useState(false)
  const [district, setDistrict] = useState("")
  const [districtList, setDistrictList] = useState([])

  const nextStep = (partnerProfile) => {
    if (!province) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุ จังหวัด", { props })
      return
    }
    navigation.navigate("Time-Price-Form", {
      item,
      province,
      userId,
      partnerRequest,
      partnerProfile,
    })
  }

  const getPartnerQty = () => {
    return new Promise((resolve, reject) => {
      const ref = firebase.database().ref(getDocument(`members`))
      ref.once("value", (snapshot) => {
        let count = 0
        let list = []
        snapshot.forEach((item) => {
          const data = { ...item.val() }
          const type4 = AppConfig.PartnerType.type4 === partnerRequest
          let isDistrict = true
          if (district) {
            isDistrict = data.district === district
          }
          if (
            data.province === province &&
            isDistrict &&
            data.memberType === "partner" &&
            data.status !== AppConfig.MemberStatus.newRegister &&
            data.status !== AppConfig.MemberStatus.notApprove &&
            data.status !== AppConfig.MemberStatus.suspend
          ) {
            if (data.type4 && type4) {
              count = count + 1
              list.push(data)
            }
          }
        })

        setPartnerQty(count)
        setPartnerList(list)
        resolve(true)
      })
    })
  }

  const onChangeProvinceSelect = () => {
    getPartnerQty().catch((err) => Alert.alert(err))
  }

  const renderItem = ({ item }) => {
    return (
      <ImageBackground
        source={{ uri: item.image }}
        style={{
          width: 200,
          height: 280,
          margin: 15,
          padding: 15,
        }}
        resizeMode="contain"
      >
        <TouchableHighlight onPress={() => nextStep(item)} underlayColor={null}>
          <View
            style={{
              alignItems: "center",
              borderRadius: 5,
              height: "100%",
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                backgroundColor: "red",
                position: "absolute",
                bottom: 25,
                left: -5,
                opacity: 0.65,
              }}
            >
              ชื่อ: {item.name} อายุ: {item.age}
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 22,
                fontWeight: "bold",
                backgroundColor: "purple",
                position: "absolute",
                left: -10,
                top: -15,
                opacity: 0.8,
              }}
            >
              ราคา: {item.price4}
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                backgroundColor: "black",
                position: "absolute",
                left: -10,
                top: 20,
                opacity: 0.5,
              }}
            >
              เพศ: {item.sex}
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
                backgroundColor: "green",
                position: "absolute",
                bottom: 0,
                width: "100%",
                textAlign: "center",
                alignContent: "center",
                padding: 5,
                opacity: 0.6,
                left: -5,
                bottom: -15,
              }}
            >
              สถานที่: {item.address}
            </Text>
          </View>
        </TouchableHighlight>
      </ImageBackground>
    )
  }

  return (
    <ImageBackground
      source={AppConfig.bgImage}
      style={styles.imageBg}
      resizeMode="contain"
    >
      <SafeAreaView style={{ flex: 1, height: "100%", alignItems: "center" }}>
        <View style={styles.cardDetail}>
          <Text style={[styles.optionsNameDetail, { marginBottom: 10 }]}>
            {item.name}
          </Text>
          <DropDownPicker
            placeholder="-- เลือกจังหวัด --"
            open={openSelectCountry}
            setOpen={setOpenSelectCountry}
            value={province}
            setValue={setProvince}
            items={countryList}
            setItems={setCountryList}
            style={styles.dropdownStyle}
            textStyle={{ fontSize: 18 }}
            zIndex={2}
            searchable={false}
            selectedItemContainerStyle={{ backgroundColor: "#facaff" }}
            onChangeValue={(e) => onChangeProvinceSelect()}
            listMode="SCROLLVIEW"
            containerStyle={{ width: 350 }}
          />
          <DropDownPicker
            placeholder="-- เลือก เขต/อำเภอ --"
            open={openSelectDistrict}
            setOpen={setOpenSelectDistrict}
            value={district}
            setValue={setDistrict}
            items={getDistrictList(province)}
            setItems={setDistrictList}
            style={styles.dropdownStyle}
            searchable={false}
            textStyle={{ fontSize: 18 }}
            zIndex={1}
            selectedItemContainerStyle={{ backgroundColor: "#facaff" }}
            onChangeValue={(e) => onChangeProvinceSelect()}
            listMode="SCROLLVIEW"
            containerStyle={{ width: 350 }}
          />
          {province !== "" && (
            <View
              style={{
                marginBottom: 10,
                backgroundColor: "pink",
                alignSelf: "center",
                padding: 5,
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 16 }}>
                จำนวน Partner ในระบบ: {partnerQty} คน
              </Text>
            </View>
          )}
          {partnerList.length === 0 && (
            <CardNotfound text={`ไม่พบข้อมูล ${AppConfig.PartnerType.type4}`} />
          )}
          <FlatList
            style={{ margin: 5 }}
            numColumns={2}
            columnWrapperStyle={{ flex: 1, justifyContent: "space-evenly" }}
            data={partnerList}
            keyExtractor={(item, index) => item.id}
            renderItem={renderItem}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  cardDetail: {
    alignItems: "center",
    padding: 5,
  },
  optionsNameDetail: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginTop: 10,
  },
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    margin: 10,
  },
  dropdownStyle: {
    marginBottom: 10,
    borderColor: "#ff2fe6",
    borderWidth: 1.5,
    width: 350,
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  buttonFooter: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  textInput: {
    backgroundColor: "white",
    width: 350,
    fontSize: 16,
    marginVertical: 5,
    marginLeft: 15,
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

export default SelectProvinceType4
