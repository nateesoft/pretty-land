import React, { useEffect, useState } from "react"
import {
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native"
import { Button, Text } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"
import DropDownPicker from "react-native-dropdown-picker"

import {
  getPartnerGroup,
  getCountryList,
} from "../../../data/apis"
import { GetIcon } from "../../../components/GetIcons"
import bgImage from "../../../../assets/bg.png"
import { saveNewPosts } from "../../../apis"

const CreatePostForm = (props) => {
  const { navigation, route } = props
  const { item, userId } = route.params

  const [openSelectPartner, setOpenSelectPartner] = useState(false)
  const [partnerRequest, setPartnerRequest] = useState("")
  const [partnerList, setPartnerList] = useState(getPartnerGroup())

  const [openSelectCountry, setOpenSelectCountry] = useState(false)
  const [country, setCountry] = useState("")
  const [countryList, setCountryList] = useState(getCountryList())

  const [customerId, setCustomerId] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [phone, setPhone] = useState("")
  const [place, setPlace] = useState("")
  const [remark, setRemark] = useState("")
  const [qty, setQty] = useState("")

  const createNewPost = () => {
    if (!customerName) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุ ชื่อผู้โพสท์รายการ")
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
    if (!qty) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุ จำนวน")
      return
    }
    saveNewPosts(
      {
        customerId,
        customerName,
        partnerRequest,
        customerPhone: phone,
        placeMeeting: place,
        partnerQty: qty,
        subtitle: `${partnerRequest} จำนวน ${qty}`,
        status: "customer_new_post_done",
        statusText: "โพสท์ใหม่",
        customerRemark: remark,
      },
      navigation
    )
  }

  useEffect(() => {
    setPartnerRequest(item.value)
    setCustomerId(userId)
  }, [])

  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <SafeAreaView style={{ flex: 1, height: "100%" }}>
        <View style={styles.cardDetail}>
          <Text style={styles.optionsNameDetail}>โพสทข้อมูลที่ต้องการ</Text>
          <Text style={styles.optionsNameDetail2}>{item.name}</Text>
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
            zIndex={2}
            searchable={false}
          />
          <DropDownPicker
            placeholder="เลือกจังหวัด"
            open={openSelectCountry}
            setOpen={setOpenSelectCountry}
            value={country}
            setValue={setCountry}
            items={countryList}
            setItems={setCountryList}
            style={styles.dropdownStyle}
            textStyle={{ fontSize: 18 }}
            zIndex={1}
            searchable={false}
          />
        </View>
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
              จำนวนคนที่ต้องการ (Person Qty)
            </Text>
            {!qty && (
              <Text style={{ color: "red", marginLeft: 5 }}>
                จะต้องระบุข้อมูล จำนวนคนที่ต้องการ (Person Qty)
              </Text>
            )}
            <View style={styles.formControl}>
              <GetIcon type="fa" name="users" />
              <TextInput
                placeholder="จำนวนคนที่ต้องการ (Person Qty)"
                style={styles.textInput}
                value={qty}
                onChangeText={(value) => setQty(value)}
                keyboardType="numeric"
              />
            </View>
            <Text style={{ fontSize: 16, padding: 5 }}>
              รายละเอียดเพิ่มเติม (Remark)
            </Text>
            <View style={[styles.formControl, { height: 100 }]}>
              <GetIcon type="fa" name="comment" />
              <TextInput
                placeholder="รายละเอียดเพิ่มเติม (Remark)"
                style={[styles.textInput, { height: 90 }]}
                value={remark}
                onChangeText={(value) => setRemark(value)}
                multiline={true}
                numberOfLines={4}
              />
            </View>
          </View>
        </ScrollView>
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
    marginBottom: 10,
  },
})

export default CreatePostForm
