import React, { useState } from "react"
import { StyleSheet, View, ImageBackground } from "react-native"
import { Button, Text, Input } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"
import DropDownPicker from "react-native-dropdown-picker"

import {
  getPartnerGroup,
  getCountryList,
  addPostList,
} from "../../../data/apis"

import bgImage from "../../../../assets/bg.png"

const CreatePostForm = (props) => {
  const { navigation, route } = props
  const { item, pageFrom } = route.params

  const [openSelectPartner, setOpenSelectPartner] =useState(false)
  const [partner, setPartner] =useState("")
  const [partnerList, setPartnerList] =useState(getPartnerGroup())

  const [openSelectCountry, setOpenSelectCountry] =useState(false)
  const [country, setCountry] =useState("")
  const [countryList, setCountryList] =useState(getCountryList())

  const [customer, setCustomer] =useState("")
  const [phone, setPhone] =useState("")
  const [place, setPlace] =useState("")
  const [remark, setRemark] =useState("")
  const [qty, setQty] =useState("")

  const createNewPost = () => {
    addPostList({
      post_owner: customer,
      partnerType: partner,
      name: remark,
      subtitle: `${partner} จำนวน ${qty}`,
      status: "customer_new_post_done",
      statusText: "โพสท์ใหม่",
    })
    if (pageFrom) {
      navigation.navigate(pageFrom)
    } else {
      navigation.navigate("Partner-Category")
    }
  }

  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <View style={styles.cardDetail}>
        <Text style={styles.optionsNameDetail}>โพสทข้อมูลที่ต้องการ</Text>
        <Text style={styles.optionsNameDetail2}>{item.name}</Text>
        <DropDownPicker
          placeholder="เลือก Partner"
          open={openSelectPartner}
          setOpen={setOpenSelectPartner}
          value={partner}
          setValue={setPartner}
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
        <View style={styles.viewCard}>
          <Input
            name="customer"
            placeholder="ชื่อ"
            leftIcon={{ type: "font-awesome", name: "address-book" }}
            style={styles.inputForm}
            onChangeText={(value) => setCustomer(value)}
            value={customer}
            leftIconContainerStyle={{marginRight: 20}}
          />
          <Input
            name="phone"
            placeholder="เบอร์ติดต่อ"
            leftIcon={{ type: "font-awesome", name: "phone" }}
            style={styles.inputForm}
            onChangeText={(value) => setPhone(value)}
            value={phone}
            leftIconContainerStyle={{marginRight: 20}}
          />
          <Input
            name="place"
            placeholder="สถานที่นัดพบ"
            leftIcon={{ type: "font-awesome", name: "home" }}
            style={styles.inputForm}
            onChangeText={(value) => setPlace(value)}
            value={place}
            leftIconContainerStyle={{marginRight: 20}}
          />
          <Input
            name="remark"
            placeholder="รายละเอียดเพิ่มเติม"
            leftIcon={{ type: "font-awesome", name: "comment" }}
            style={styles.inputForm}
            onChangeText={(value) => setRemark(value)}
            value={remark}
            leftIconContainerStyle={{marginRight: 20}}
          />
          <Input
            name="qty"
            placeholder="จำนวนคนที่ต้องการ"
            leftIcon={{ type: "font-awesome", name: "users" }}
            style={styles.inputForm}
            onChangeText={(value) => setQty(value)}
            value={qty}
            leftIconContainerStyle={{marginRight: 20}}
          />
        </View>
        <Button
          icon={
            <Icon
              name="save"
              size={20}
              color="white"
              style={{ marginRight: 10 }}
            />
          }
          iconLeft
          buttonStyle={styles.btnSave}
          title="บันทึกข้อมูล"
          onPress={() => createNewPost()}
        />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  inputForm: {},
  btnSave: {
    margin: 15,
    paddingHorizontal: 50,
    borderRadius: 55,
    backgroundColor: "#ff2fe6",
  },
  cardDetail: {
    flex: 1,
    alignItems: "center",
    padding: 5,
    margin: 10,
  },
  optionsNameDetail: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginBottom: 15,
    marginTop: 10,
  },
  optionsNameDetail2: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginBottom: 15,
    marginTop: 10,
  },
  viewCard: {
    width: "100%",
    borderRadius: 20,
    padding: 5,
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
})

export default CreatePostForm
