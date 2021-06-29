import React, { useEffect, useState } from "react"
import {
  View,
  ImageBackground,
  TextInput,
  SafeAreaView,
  ScrollView,
  Alert,
  StyleSheet,
  Image,
} from "react-native"
import { Button, Text } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"
import DropDownPicker from "react-native-dropdown-picker"

import {
  getCountryList,
  getProvinceName,
  getDistrictList,
  getDistrictName,
} from "../../../data/apis"
import { GetIcon } from "../../../components/GetIcons"
import bgImage from "../../../../assets/bg.png"
import { saveNewPosts } from "../../../apis"
import { AppConfig } from "../../../Constants"
import firebase from "../../../../util/firebase"

const CreatePostForm = (props) => {
  const { navigation, route } = props
  const { item, userId, partnerGroup } = route.params

  const [openSelectPartner, setOpenSelectPartner] = useState(false)
  const [partnerRequest, setPartnerRequest] = useState("")
  const [partnerList, setPartnerList] = useState(partnerGroup)

  const [openSelectCountry, setOpenSelectCountry] = useState(false)
  const [province, setProvince] = useState("")
  const [countryList, setCountryList] = useState(getCountryList())
  const [district, setDistrict] = useState("")

  const [openSelectDistrict, setOpenSelectDistrict] = useState(false)
  const [districtList, setDistrictList] = useState([])

  const [customerId, setCustomerId] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [phone, setPhone] = useState("")
  const [place, setPlace] = useState("")
  const [remark, setRemark] = useState("")

  const [customerLevel, setCustomerLevel] = useState(0)
  const [partnerQty, setPartnerQty] = useState(0)
  const [isType4, setIsType4] = useState(false)

  const [listMassage, setListMassage] = useState([])

  const createNewPost = () => {
    if (!customerName) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุ ชื่อผู้โพสท์รายการ")
      return
    }
    if (!province) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุ จังหวัด")
      return
    }
    if (!district) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุ อำเภอ/เขต")
      return
    }
    if (!phone) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุ โทรศัพท์มือถือ")
      return
    }
    if (!place) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุ สถานที่นัดพบ")
      return
    }
    saveNewPosts(
      {
        customerId,
        customerName,
        partnerRequest,
        partnerImage: item.image_url,
        customerPhone: phone,
        placeMeeting: place,
        subtitle: `${partnerRequest}`,
        status: AppConfig.PostsStatus.customerNewPostDone,
        statusText: "โพสท์ใหม่",
        province,
        provinceName: getProvinceName(province)[0],
        district,
        districtName: getDistrictName(district)[0],
        customerRemark: remark,
        customerLevel,
      },
      navigation
    )
  }

  const onChangePartnerType = (v) => {
    if (v === AppConfig.PartnerType.type4) {
      setIsType4(true)
    } else {
      setIsType4(false)
    }
  }

  const sendToMassagePartner = (data) => {
    if (!province) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุ จังหวัด")
      return
    }
    if (!customerName) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุ ชื่อผู้โพสท์รายการ")
      return
    }
    if (!phone) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุ โทรศัพท์มือถือ")
      return
    }
    saveNewPosts(
      {
        customerId,
        customerName,
        partnerRequest,
        customerPhone: phone,
        partnerImage: item.image_url,
        subtitle: `${partnerRequest}`,
        status: AppConfig.PostsStatus.waitPartnerConfrimWork,
        statusText: "รอ Partner แจ้งรับงาน",
        province,
        provinceName: getProvinceName(province)[0],
        district: district ? district : "",
        districtName: district ? getDistrictName(district)[0] : "",
        customerLevel,
        partnerSelect: {
          [data.id]: {
            partnerId: data.id,
            telephone: data.mobile,
            sex: data.sex,
            amount: data.price4,
            image: data.image,
            sys_create_date: new Date().toUTCString(),
            age: data.age,
            name: data.name,
          },
        },
      },
      navigation
    )
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

  useEffect(() => {
    setPartnerRequest(item.name)
    setCustomerId(userId)
    setIsType4(AppConfig.PartnerType.type4 === item.name)

    const ref = firebase
      .database()
      .ref(`members`)
      .orderByChild("memberType")
      .equalTo("partner")
    const listener = ref.on("value", (snapshot) => {
      const list = []
      snapshot.forEach((item) => {
        const partner = { ...item.val() }
        if (partner.type4) {
          list.push(partner)
        }
      })
      setListMassage(list)
    })

    return () => ref.off("value", listener)
  }, [])

  useEffect(() => {
    const ref = firebase.database().ref(`members/${userId}`)
    ref.once("value", (snapshot) => {
      const customer = { ...snapshot.val() }
      setCustomerLevel(customer.customerLevel)
    })
  }, [])

  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <SafeAreaView style={{ flex: 1, height: "100%" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardDetail}>
            <Text style={[styles.optionsNameDetail, { marginBottom: 10 }]}>
              โพสท์ข้อมูลที่ต้องการ
            </Text>
            <DropDownPicker
              placeholder="เลือก Partner"
              open={openSelectPartner}
              setOpen={setOpenSelectPartner}
              value={partnerRequest}
              setValue={setPartnerRequest}
              items={partnerList}
              setItems={setPartnerList}
              style={styles.dropdownStyle}
              textStyle={{ fontSize: 18 }}
              zIndex={3}
              searchable={false}
              selectedItemContainerStyle={{ backgroundColor: "#facaff" }}
              onChangeValue={(v) => onChangePartnerType(v)}
            />
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
                  จำนวน Partner: {partnerQty} คน
                </Text>
              </View>
            )}

            <DropDownPicker
              placeholder="-- เลือก เขต/อำเภอ --"
              open={openSelectDistrict}
              setOpen={setOpenSelectDistrict}
              value={district}
              setValue={setDistrict}
              items={getDistrictList(province)}
              setItems={setDistrictList}
              searchable={false}
              textStyle={{ fontSize: 18 }}
              zIndex={1}
              selectedItemContainerStyle={{ backgroundColor: "#facaff" }}
            />
          </View>
          <View style={{ zIndex: -1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.container}>
                <Text style={{ fontSize: 16, padding: 5 }}>
                  ชื่อเจ้าของโพสท์ (Name)
                </Text>
                {!customerName && (
                  <Text style={{ color: "red", marginLeft: 5 }}>
                    จะต้องระบุข้อมูล ชื่อเจ้าของโพสท์ (Name)
                  </Text>
                )}
                <View style={styles.formControl}>
                  <GetIcon type="fa" name="address-book" />
                  <TextInput
                    placeholder="ชื่อเจ้าของโพสท์ (Name)"
                    style={styles.textInput}
                    value={customerName}
                    onChangeText={(value) => setCustomerName(value)}
                  />
                </View>
                <Text style={{ fontSize: 16, padding: 5 }}>
                  เบอร์ติดต่อ (Telephone)
                </Text>
                {!phone && (
                  <Text style={{ color: "red", marginLeft: 5 }}>
                    จะต้องระบุข้อมูล เบอร์ติดต่อ (Telephone)
                  </Text>
                )}
                <View style={styles.formControl}>
                  <GetIcon type="fa" name="phone" />
                  <TextInput
                    placeholder="เบอร์ติดต่อ (Telephone)"
                    style={styles.textInput}
                    value={phone}
                    onChangeText={(value) => setPhone(value)}
                    keyboardType="number-pad"
                  />
                </View>
                {!isType4 && (
                  <View>
                    <Text style={{ fontSize: 16, padding: 5 }}>
                      สถานที่นัดพบ (Meeting Place)
                    </Text>
                    {!place && (
                      <Text style={{ color: "red", marginLeft: 5 }}>
                        จะต้องระบุข้อมูล สถานที่นัดพบ (Meeting Place)
                      </Text>
                    )}
                    <View style={styles.formControl}>
                      <GetIcon type="fa" name="home" />
                      <TextInput
                        placeholder="สถานที่นัดพบ (Meeting Place)"
                        style={styles.textInput}
                        value={place}
                        onChangeText={(value) => setPlace(value)}
                      />
                    </View>
                    <Text style={{ fontSize: 16, padding: 5 }}>
                      หมายเหตุเพิ่มเติม (Remark)
                    </Text>
                    <View
                      style={[styles.formControl, { height: 100, width: "100%" }]}
                    >
                      <TextInput
                        placeholder="หมายเหตุเพิ่มเติม (Remark)"
                        style={[styles.textInput, { height: 90 }]}
                        value={remark}
                        onChangeText={(value) => setRemark(value)}
                        multiline={true}
                        numberOfLines={4}
                      />
                    </View>
                    <View style={styles.buttonFooter}>
                      <Button
                        icon={
                          <Icon
                            name="save"
                            size={20}
                            color="white"
                            style={{ marginHorizontal: 8 }}
                          />
                        }
                        iconLeft
                        buttonStyle={{
                          backgroundColor: "#ff2fe6",
                          marginTop: 20,
                          borderRadius: 25,
                          width: 250,
                          paddingHorizontal: 15,
                          height: 45,
                          borderWidth: 0.5,
                        }}
                        title="บันทึกข้อมูล"
                        onPress={() => createNewPost()}
                      />
                    </View>
                  </View>
                )}
              </View>
            </ScrollView>
            {isType4 && (
              <View style={{ alignItems: "center" }}>
                <Text>แสดงรายชื่อพนักงานนวดแผนไทย</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {listMassage.map((item, index) => (
                    <View style={styles.panelPartner} id={item.id}>
                      {item.image && (
                        <View>
                          <Image
                            source={{ uri: item.image }}
                            style={{ width: 100, height: 135, margin: 5 }}
                          />
                          <Button
                            title="จ้างงาน"
                            onPress={() => sendToMassagePartner(item)}
                          />
                        </View>
                      )}
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </ScrollView>
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
  optionsNameDetail2: {
    fontSize: 18,
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
  textInput: {
    backgroundColor: "white",
    width: 350,
    fontSize: 16,
    marginVertical: 5,
    marginLeft: 15,
  },
  buttonFooter: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  panelPartner: {
    padding: 20,
    borderWidth: 1,
    margin: 10,
    width: 150,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#bbb",
    borderRadius: 5,
    position: "relative",
  },
})

export default CreatePostForm
