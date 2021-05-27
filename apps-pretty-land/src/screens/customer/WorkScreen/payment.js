import React, { useEffect, useState } from "react"
import {
  Image,
  View,
  Platform,
  StyleSheet,
  FlatList,
  RefreshControl,
  ScrollView,
  Alert,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import { Button, Text, Input } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"

import { getPostToPayment } from "../../../data/apis"

const PaymentForm = ({ navigation, route }) => {
  const [image, setImage] = useState(null)
  const [bank, setBank] = useState("")
  const [amount, setAmount] = useState("")
  const [datetime, setDateTime] = useState("")
  const [refreshing, setRefreshing] = React.useState(false)

  const { item } = route.params

  useEffect(() => {
    ;(async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== "granted") {
          Alert.alert("แจ้งเตือน", "ขออภัย, กรุณาให้สิทธิืการเข้าถึงรูปภาพของท่าน!")
        }
      }
    })()
  }, [])

  const keyExtractor = (item, index) => index.toString()

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const filterList = getPostToPayment(item.id)[0].listPartnerSelect

  const renderItem = ({ item }) => (
    <View style={{ padding: 5 }}>
      <Image source={item.image} style={{ width: 128, height: 128 }} />
      <Text
        style={{
          position: "absolute",
          bottom: 10,
          right: 0,
          color: "white",
          backgroundColor: "chocolate",
          opacity: 0.75
        }}
      >
        {item.name}
      </Text>
      <Text
        style={{
          position: "absolute",
          top: 20,
          left: 0,
          color: "white",
          backgroundColor: "blue",
          fontWeight: 'bold',
          fontSize: 22,
          opacity: 0.5
        }}
      >
        {item.price}
      </Text>
    </View>
  )

  const handleRefresh = () => {
    console.log("refresh data list")
  }

  return (
    <>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>รายชื่อ Partner ที่เลือก</Text>
        <FlatList
          keyExtractor={keyExtractor}
          data={filterList}
          renderItem={renderItem}
          horizontal
          style={{
            borderWidth: 1,
            borderColor: "#eee",
            padding: 5,
            margin: 5,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => handleRefresh()}
            />
          }
        />
      </View>
      <ScrollView>
        <Input
          name="bank"
          placeholder="ยอดชำระสำหรับ Partner (0.00)"
          leftIcon={{ type: "font-awesome", name: "dollar" }}
          onChangeText={(value) => setBank(value)}
          value={bank}
          disabled
        />
        <Input
          name="bank"
          placeholder="ค่าธรรมเนียม (0.00)"
          leftIcon={{ type: "font-awesome", name: "dollar" }}
          onChangeText={(value) => setBank(value)}
          value={bank}
          disabled
        />
        <Input
          name="bank"
          placeholder="รวมยอดชำระทั้งหมด"
          leftIcon={{ type: "font-awesome", name: "dollar" }}
          onChangeText={(value) => setBank(value)}
          value={bank}
          disabled
        />
        <Text style={styles.optionsNameDetail}>ยืนยันข้อมูลการโอนเงิน</Text>
        <Input
          name="bank"
          placeholder="ธนาคารที่โอนเงิน"
          leftIcon={{ type: "font-awesome", name: "bank" }}
          onChangeText={(value) => setBank(value)}
          value={bank}
        />
        <Input
          name="amount"
          placeholder="ยอดเงินโอน 0.00"
          leftIcon={{ type: "font-awesome", name: "dollar" }}
          onChangeText={(value) => setAmount(value)}
          value={amount}
        />
        <Input
          name="datetime"
          placeholder="เวลาที่โอนเงิน (dd/MM/yyyy)"
          leftIcon={{ type: "font-awesome", name: "calendar" }}
          onChangeText={(value) => setDateTime(value)}
          value={datetime}
        />
        <Button
          icon={
            <Icon
              name="file"
              size={15}
              color="white"
              style={{ marginRight: 5 }}
            />
          }
          title="เลือกไฟล์...สลิปสำหรับการโอนเงิน"
          onPress={pickImage}
        />
        {image && (
          <View style={{ flex: 1, justifyContent: "space-around" }}>
            <Image source={{ uri: image }} style={{ width: 200, height: 250 }} />
            <Button
              icon={
                <Icon
                  name="save"
                  size={20}
                  color="white"
                  style={{ marginRight: 5 }}
                />
              }
              buttonStyle={styles.buttonConfirm}
              title="ยืนยันข้อมูลการโอนเงิน ไปยัง Admin"
            />
          </View>
        )}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  buttonConfirm: {
    backgroundColor: "green",
  },
  optionsNameDetail: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginBottom: 15,
    marginTop: 10,
  },
})

export default PaymentForm
