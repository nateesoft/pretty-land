import React, { useState } from "react"
import {
  View,
  ImageBackground,
  SafeAreaView,
  Alert,
  StyleSheet,
  TextInput,
} from "react-native"
import { Button, Text } from "react-native-elements"
import DropDownPicker from "react-native-dropdown-picker"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import { getCountryList } from "../../../data/apis"
import bgImage from "../../../../assets/bg.png"
import { AppConfig } from "../../../Constants"
import firebase from "../../../../util/firebase"
import { GetIcon } from "../../../components/GetIcons"

const SelectProvince = (props) => {
  const { navigation, route } = props
  const { item, userId } = route.params

  const [partnerRequest, setPartnerRequest] = useState(item.name)

  const [openSelectCountry, setOpenSelectCountry] = useState(false)
  const [province, setProvince] = useState("")
  const [countryList, setCountryList] = useState(getCountryList())
  const [partnerQty, setPartnerQty] = useState("")
  const [partnerWantQty, setPartnerWantQty] = useState("")

  const nextStep = () => {
    if (!province) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุ จังหวัด", { props })
      return
    }
    navigation.navigate("Place-Form", {
      item,
      province,
      userId,
      partnerRequest,
      partnerWantQty,
    })
  }

  const getPartnerQty = (value) => {
    return new Promise((resolve, reject) => {
      const ref = firebase.database().ref(`members`)
      ref.once("value", (snapshot) => {
        let count = 0
        snapshot.forEach((item) => {
          const data = { ...item.val() }
          const type1 = AppConfig.PartnerType.type1 === partnerRequest
          const type2 = AppConfig.PartnerType.type2 === partnerRequest
          const type3 = AppConfig.PartnerType.type3 === partnerRequest
          const type4 = AppConfig.PartnerType.type4 === partnerRequest
          if (data.province === value && data.memberType === "partner") {
            if (
              (data.type1 && type1) ||
              (data.type2 && type2) ||
              (data.type3 && type3) ||
              (data.type4 && type4)
            ) {
              count = count + 1
            }
          }
        })

        setPartnerQty(count)
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
            เลือกจังหวัด
          </Text>
          <Text> ประเภท: {partnerRequest}</Text>
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
          <View>
            <Text style={{ fontSize: 16, padding: 5 }}>
              จำนวน Partner ที่ต้องการ
            </Text>
            {!partnerWantQty && (
              <Text style={{ color: "red", marginLeft: 5 }}>
                จะต้องระบุข้อมูล จำนวน Partner ที่ต้องการ
              </Text>
            )}
            <View style={styles.formControl}>
              <GetIcon type="mci" name="account-multiple-plus" />
              <TextInput
                style={styles.textInput}
                value={partnerWantQty}
                onChangeText={(value) => setPartnerWantQty(value)}
              />
            </View>
          </View>
          <View style={styles.buttonFooter}>
            <Button
              icon={
                <MaterialCommunityIcons
                  name="page-next-outline"
                  size={20}
                  color="white"
                  style={{ marginHorizontal: 8 }}
                />
              }
              iconLeft
              buttonStyle={{
                backgroundColor: "#ff2fe6",
                marginTop: 20,
                borderRadius: 5,
                width: 250,
                paddingHorizontal: 15,
                height: 45,
                borderWidth: 0.5,
              }}
              title="ถัดไป"
              onPress={() => nextStep()}
            />
          </View>
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

export default SelectProvince