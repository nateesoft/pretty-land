import React, { useState } from "react"
import {
  View,
  ImageBackground,
  SafeAreaView,
  Alert,
  StyleSheet,
  ScrollView,
  Image,
  TouchableHighlight,
} from "react-native"
import { Button, Text } from "react-native-elements"
import DropDownPicker from "react-native-dropdown-picker"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import { getCountryList } from "../../../data/apis"
import bgImage from "../../../../assets/bg.png"
import { AppConfig } from "../../../Constants"
import firebase from "../../../../util/firebase"
import CardNotfound from "../../../components/CardNotfound"

const SelectProvinceType4 = (props) => {
  const { navigation, route } = props
  const { item, userId } = route.params

  const [partnerRequest, setPartnerRequest] = useState(item.name)

  const [openSelectCountry, setOpenSelectCountry] = useState(false)
  const [province, setProvince] = useState("")
  const [countryList, setCountryList] = useState(getCountryList())
  const [partnerQty, setPartnerQty] = useState("")
  const [partnerList, setPartnerList] = useState([])

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

  const getPartnerQty = (value) => {
    return new Promise((resolve, reject) => {
      const ref = firebase.database().ref(`members`)
      ref.once("value", (snapshot) => {
        let count = 0
        let list = []
        snapshot.forEach((item) => {
          const data = { ...item.val() }
          const type4 = AppConfig.PartnerType.type4 === partnerRequest
          if (data.province === value && data.memberType === "partner") {
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

  const onChangeProvinceSelect = (value) => {
    getPartnerQty(value).then((data) => console.log(data))
  }

  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <SafeAreaView style={{ flex: 1, height: "100%" }}>
        <View style={styles.cardDetail}>
          <Text style={[styles.optionsNameDetail, { marginBottom: 10 }]}>
            {partnerRequest}
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
            onChangeValue={(e) => onChangeProvinceSelect(e)}
            listMode="SCROLLVIEW"
          />
          {province !== "" && (
            <View
              style={{
                marginBottom: 10,
                backgroundColor: "pink",
                alignSelf: "flex-start",
                padding: 5,
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
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ width: "80%" }}
          >
            {partnerList.map((item, index) => (
              <TouchableHighlight
                underlayColor="pink"
                onPress={() => nextStep(item)}
                style={styles.box}
                key={item.id}
              >
                <View
                  style={{
                    padding: 10,
                    borderWidth: 2,
                    borderColor: "white",
                    alignItems: "center",
                    margin: 5,
                  }}
                >
                  <Text>ชื่อ: {item.name}</Text>
                  <Text>ราคา: {item.price4}</Text>
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 250, height: 300 }}
                  />
                </View>
              </TouchableHighlight>
            ))}
          </ScrollView>
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
