import React, { useState, useEffect } from "react"
import {
  View,
  ImageBackground,
  TextInput,
  SafeAreaView,
  Alert,
  StyleSheet,
  ScrollView
} from "react-native"
import { Button, Text } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"
import { TextInputMask } from "react-native-masked-text"

import firebase from "../../../../util/firebase"
import { getDocument } from "../../../../util"
import { getProvinceName } from "../../../data/apis"
import { GetIcon } from "../../../components/GetIcons"
import { saveNewPosts } from "../../../apis"
import { AppConfig } from "../../../Constants"

const TimePriceForm = (props) => {
  const { navigation, route } = props
  const { data } = route.params
  const { item, userId, partnerRequest, province, partnerProfile } = data

  const [phone, setPhone] = useState("")
  const [timeMeeting, setTimeMeeting] = useState("")
  const [customer, setCustomer] = useState("")

  const mappingCustomerProfile = (snapshot) => {
    return new Promise((resolve, reject) => {
      const cust = { ...snapshot.val() }
      setCustomer(cust)
      resolve(true)
    })
  }

  const sendToMassagePartner = (data) => {
    if (!timeMeeting) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุ เวลาที่จะไป")
      return
    }
    if (!phone) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุ โทรศัพท์มือถือ")
      return
    }
    const dataToSave = {
      customerId: customer.id,
      customerName: customer.profile,
      partnerRequest,
      customerPhone: phone,
      partnerImage: item.image_url,
      status: AppConfig.PostsStatus.waitPartnerConfrimWork,
      statusText: "รอแจ้งรับงาน",
      province,
      provinceName: getProvinceName(province)[0],
      customerLevel: customer.customerLevel,
      timeMeeting,
      partnerSelect: {
        [data.id]: {
          partnerId: data.id,
          telephone: data.mobile,
          sex: data.sex,
          amount: data.price4,
          image: data.image,
          sys_create_date: new Date().toUTCString(),
          age: data.age,
          name: data.name
        }
      }
    }
    saveNewPosts(dataToSave)
    navigation.navigate("Customer-Dashboard")
  }

  useEffect(() => {
    const ref = firebase.database().ref(getDocument(`members/${userId}`))
    ref.once("value", (snapshot) => {
      mappingCustomerProfile(snapshot).catch((err) => Alert.alert(err))
    })
  }, [])

  return (
    <ImageBackground
      source={AppConfig.bgImage}
      style={styles.imageBg}
      resizeMode="contain"
    >
      <SafeAreaView style={{ flex: 1, height: "100%", alignItems: "center" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View>
              <Text style={{ fontSize: 16, padding: 5 }}>เวลาเริ่ม</Text>
              {!timeMeeting && (
                <Text style={{ color: "red", marginLeft: 5 }}>
                  จะต้องระบุข้อมูล เวลาที่จะไป
                </Text>
              )}
              <View style={styles.formControl}>
                <GetIcon type="ii" name="time-outline" />
                <TextInputMask
                  type="custom"
                  options={{
                    mask: "99:99"
                  }}
                  value={timeMeeting}
                  onChangeText={(text) => setTimeMeeting(text)}
                  style={styles.textInput}
                />
              </View>
            </View>
            <View>
              <Text style={{ fontSize: 16, padding: 5 }}>เบอร์โทร</Text>
              {!phone && (
                <Text style={{ color: "red", marginLeft: 5 }}>
                  จะต้องระบุข้อมูล เบอร์โทร
                </Text>
              )}
              <View style={styles.formControl}>
                <GetIcon type="ad" name="phone" />
                <TextInputMask
                  type="custom"
                  options={{
                    mask: "(999)-999-9999"
                  }}
                  value={phone}
                  onChangeText={(text) => setPhone(text)}
                  style={styles.textInput}
                />
              </View>
            </View>
            <View style={styles.buttonFooter}>
              <Button
                icon={
                  <Icon
                    name="send"
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
                  borderWidth: 0.5
                }}
                title="ส่งไปยัง Partner"
                onPress={() => sendToMassagePartner(partnerProfile)}
              />
            </View>
          </View>
        </ScrollView>
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
  optionsNameDetail2: {
    fontSize: 18,
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
    borderWidth: 1.5
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
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
  },
  textInput: {
    backgroundColor: "white",
    width: 350,
    fontSize: 16,
    marginVertical: 5,
    marginLeft: 15
  },
  buttonFooter: {
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 50
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
    position: "relative"
  }
})

export default TimePriceForm
