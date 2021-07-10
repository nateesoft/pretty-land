import React, { useState, useEffect } from "react"
import {
  View,
  ImageBackground,
  TextInput,
  SafeAreaView,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native"
import { Button, Text } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"

import firebase from "../../../../util/firebase"
import { getDocument } from "../../../../util"
import { getProvinceName } from "../../../data/apis"
import { GetIcon } from "../../../components/GetIcons"
import bgImage from "../../../../assets/bg.png"
import { saveNewPosts } from "../../../apis"
import { AppConfig } from "../../../Constants"

const PlaceForm = (props) => {
  const { navigation, route } = props
  const { item, userId, partnerRequest, province, partnerWantQty } =
    route.params

  const [phone, setPhone] = useState("")
  const [place, setPlace] = useState("")
  const [remark, setRemark] = useState("")
  const [startTime, setStartTime] = useState("")
  const [stopTime, setStopTime] = useState("")

  const [customerName, setCustomerName] = useState("")
  const [customerLevel, setCustomerLevel] = useState("")

  const createNewPost = () => {
    if (!phone) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุ โทรศัพท์มือถือ")
      return
    }
    if (!place) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุ สถานที่นัดพบ")
      return
    }
    saveNewPosts({
      customerId: userId,
      partnerRequest,
      partnerImage: item.image_url,
      customerPhone: phone,
      placeMeeting: place,
      status: AppConfig.PostsStatus.customerNewPostDone,
      statusText: "โพสท์ใหม่",
      province,
      provinceName: getProvinceName(province)[0],
      customerRemark: remark,
      customerLevel,
      customerName,
      startTime,
      stopTime,
      partnerWantQty,
    })
    navigation.navigate("Customer-Dashboard")
  }

  useEffect(() => {
    const ref = firebase.database().ref(getDocument(`members/${userId}`))
    ref.once("value", (snapshot) => {
      const customer = { ...snapshot.val() }
      setCustomerLevel(customer.customerLevel)
      setCustomerName(customer.profile)
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
          <View style={styles.container}>
            <View>
              <Text style={{ fontSize: 16, padding: 5 }}>สถานที่นัดหมาย</Text>
              {!place && (
                <Text style={{ color: "red", marginLeft: 5 }}>
                  จะต้องระบุข้อมูล สถานที่นัดหมาย
                </Text>
              )}
              <View style={styles.formControl}>
                <GetIcon type="fa" name="home" />
                <TextInput
                  placeholder="สถานที่นัดหมาย"
                  style={styles.textInput}
                  value={place}
                  onChangeText={(value) => setPlace(value)}
                />
              </View>
            </View>
            <View>
              <Text style={{ fontSize: 16, padding: 5 }}>เวลาเริ่ม</Text>
              {!startTime && (
                <Text style={{ color: "red", marginLeft: 5 }}>
                  จะต้องระบุข้อมูล เวลาเริ่ม
                </Text>
              )}
              <View style={styles.formControl}>
                <GetIcon type="ii" name="time-outline" />
                <TextInput
                  placeholder="เวลาเริ่ม"
                  style={styles.textInput}
                  value={startTime}
                  onChangeText={(value) => setStartTime(value)}
                />
              </View>
            </View>
            <View>
              <Text style={{ fontSize: 16, padding: 5 }}>เวลาเลิก</Text>
              {!stopTime && (
                <Text style={{ color: "red", marginLeft: 5 }}>
                  จะต้องระบุข้อมูล เวลาเลิก
                </Text>
              )}
              <View style={styles.formControl}>
                <GetIcon type="mi" name="timer-off" />
                <TextInput
                  placeholder="เวลาเลิก"
                  style={styles.textInput}
                  value={stopTime}
                  onChangeText={(value) => setStopTime(value)}
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
                <TextInput
                  placeholder="เบอร์โทร"
                  style={styles.textInput}
                  value={phone}
                  onChangeText={(value) => setPhone(value)}
                />
              </View>
            </View>
            <View>
              <Text style={{ fontSize: 16, padding: 5 }}>
                รายละเอียดเพิ่มเติม
              </Text>
            </View>
            <View style={[styles.formControl, { height: 100, width: "100%" }]}>
              <TextInput
                placeholder="รายละเอียดเพิ่มเติม"
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
                  borderRadius: 5,
                  width: 250,
                  paddingHorizontal: 15,
                  height: 45,
                  borderWidth: 0.5,
                }}
                title="บันทึกโพสท์"
                onPress={() => createNewPost()}
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
    alignSelf: "center",
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

export default PlaceForm
