import React, { useState } from "react"
import {
  View,
  ImageBackground,
  SafeAreaView,
  Alert,
  StyleSheet,
  TouchableHighlight,
  FlatList
} from "react-native"
import { Text } from "react-native-elements"
import DropDownPicker from "react-native-dropdown-picker"
import RadioButtonRN from "radio-buttons-react-native"
import { FontAwesome } from "react-native-vector-icons"

import { getCountryList, getDistrictList } from "../../../data/apis"
import { AppConfig } from "../../../Constants"
import firebase from "../../../../util/firebase"
import { getDocument } from "../../../../util"
import CardNotfound from "../../../components/CardNotfound"

const sexData = [
  { label: "ชาย (Male)", value: "male" },
  { label: "หญิง (Female)", value: "female" },
  { label: "อื่น ๆ (Other)", value: "other" }
]

const SelectProvinceType4 = (props) => {
  const { navigation, route } = props
  const { item, userId, appconfig } = route.params

  const [partnerRequest, setPartnerRequest] = useState(item.value)
  const [sex, setSex] = useState("male")
  const [openSelectCountry, setOpenSelectCountry] = useState(false)
  const [province, setProvince] = useState("")
  const [countryList, setCountryList] = useState(getCountryList())
  const [partnerQty, setPartnerQty] = useState("")
  const [partnerList, setPartnerList] = useState([])

  // อำเภอ/เขต
  const [openSelectDistrict, setOpenSelectDistrict] = useState(false)
  const [district, setDistrict] = useState("")
  const [districtList, setDistrictList] = useState([])

  const handleChangeSex = (value) => {
    setSex(value)
    onChangeProvinceSelect(value)
  }

  const nextStep = (partnerProfile) => {
    if (!province) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุ จังหวัด", { props })
      return
    }
    const data = { item, province, userId, partnerRequest, partnerProfile, sex }
    navigation.navigate("Partner-Image", {
      data
    })
    // navigation.navigate("Time-Price-Form", {
    //   item,
    //   province,
    //   userId,
    //   partnerRequest,
    //   partnerProfile
    // })
  }

  const getPartnerQty = (sexType) => {
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
              if (data.sex === sexType) {
                count = count + 1
                list.push(data)
              }
            }
          }
        })

        setPartnerQty(count)
        setPartnerList(list)
        resolve(true)
      })
    })
  }

  const onChangeProvinceSelect = (sexType) => {
    getPartnerQty(sexType).catch((err) => Alert.alert(err))
  }

  const renderItem = ({ item }) => {
    return (
      <ImageBackground
        source={{ uri: item.image }}
        style={{
          width: 200,
          height: 280,
          margin: 15,
          padding: 15
        }}
        resizeMode="cover"
      >
        <TouchableHighlight onPress={() => nextStep(item)} underlayColor={null}>
          <View
            style={{
              alignItems: "center",
              borderRadius: 5,
              height: "100%",
              width: "100%"
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 14,
                fontWeight: "bold",
                backgroundColor: "red",
                position: "absolute",
                bottom: 38,
                left: -5,
                opacity: 0.65
              }}
            >
              ชื่อ: {item.name} อายุ: {item.age}
            </Text>
            {appconfig.show_price && (
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                  backgroundColor: "purple",
                  position: "absolute",
                  left: -10,
                  opacity: 0.8
                }}
              >
                ค่านวดแผนไทย: {item.price4}
              </Text>
            )}
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                backgroundColor: "black",
                position: "absolute",
                left: -10,
                top: 25,
                opacity: 0.5
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
                left: -5
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
        <View>
          <Text style={[styles.optionsNameDetail, { marginBottom: 10 }]}>
            {item.name}
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            width: "80%",
            borderRadius: 10,
            borderColor: "#ff2fe6",
            marginTop: 10
          }}
        >
          <RadioButtonRN
            box={false}
            animationTypes={["shake"]}
            data={sexData}
            selectedBtn={(e) => handleChangeSex(e.value)}
            icon={<FontAwesome name="check-circle" size={25} color="#2c9dd1" />}
            initial={sex === "male" ? 1 : sex === "female" ? 2 : 3}
            style={{ padding: 10 }}
          />
        </View>
        <View style={{ marginTop: 10, zIndex: 2 }}>
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
            searchable={false}
            selectedItemContainerStyle={{ backgroundColor: "#facaff" }}
            onChangeValue={(e) => onChangeProvinceSelect(sex)}
            listMode="SCROLLVIEW"
            containerStyle={{ width: 350 }}
          />
        </View>
        <View style={{ zIndex: 1 }}>
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
            selectedItemContainerStyle={{ backgroundColor: "#facaff" }}
            onChangeValue={(e) => onChangeProvinceSelect(sex)}
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
                marginTop: 10
              }}
            >
              <Text style={{ fontSize: 16 }}>
                จำนวนพนักงานนวด: {partnerQty} คน
              </Text>
            </View>
          )}
        </View>
        {partnerList.length === 0 && (
          <CardNotfound text={`ไม่พบข้อมูล ${item.name}`} />
        )}
        <FlatList
          style={{ margin: 5 }}
          numColumns={2}
          columnWrapperStyle={{ flex: 1, justifyContent: "space-evenly" }}
          data={partnerList}
          keyExtractor={(item, index) => item.id}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  cardDetail: {
    alignItems: "center",
    padding: 5
  },
  optionsNameDetail: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginTop: 10
  },
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    margin: 10
  },
  dropdownStyle: {
    marginBottom: 10,
    borderColor: "#ff2fe6",
    borderWidth: 1.5,
    width: 350
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  buttonFooter: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50
  },
  textInput: {
    backgroundColor: "white",
    width: 350,
    fontSize: 16,
    marginVertical: 5,
    marginLeft: 15
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
    borderRadius: 10
  }
})

export default SelectProvinceType4
