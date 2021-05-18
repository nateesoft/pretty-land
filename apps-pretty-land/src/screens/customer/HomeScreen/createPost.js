import React from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { Button, Text, Input } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"
import DropDownPicker from "react-native-dropdown-picker"

import {
  getPartnerGroup,
  getCountryList,
  addPostList,
} from "../../../data/apis"

const CreatePostForm = (props) => {
  const { navigation, route } = props
  const { data, item, pageFrom } = route.params

  const [openSelectPartner, setOpenSelectPartner] = React.useState(false)
  const [partner, setPartner] = React.useState("")
  const [partnerList, setPartnerList] = React.useState(getPartnerGroup())

  const [openSelectCountry, setOpenSelectCountry] = React.useState(false)
  const [country, setCountry] = React.useState("")
  const [countryList, setCountryList] = React.useState(getCountryList())

  const [customer, setCustomer] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [place, setPlace] = React.useState("")
  const [remark, setRemark] = React.useState("")
  const [qty, setQty] = React.useState("")

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
    backgroundColor: "white",
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
})

export default CreatePostForm
