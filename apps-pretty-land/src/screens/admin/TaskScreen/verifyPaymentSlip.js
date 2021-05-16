import React, { useEffect, useState } from "react"
import { Image, View, Platform, StyleSheet } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { Button, Text, Input } from "react-native-elements"
import { AntDesign, FontAwesome, Fontisto } from "react-native-vector-icons"

import SlipImg from "../../../../assets/img_example/slip.png"

const VerifyPaymentSlip = ({ navigation }) => {

  const RenderLabel = ({ icon, label, value, type = "A" }) => {
    return (
      <>
        {type === "A" && (
          <AntDesign name={icon} size={20} style={{ margin: 5 }} />
        )}
        {type === "F" && (
          <FontAwesome name={icon} size={20} style={{ margin: 5 }} />
        )}
        {type === "F2" && (
          <Fontisto name={icon} size={20} style={{ margin: 5 }} />
        )}
        <Text>{label}</Text>
        <Text style={{ fontSize: 18, textDecorationLine: 'underline' }}>{value}</Text>
      </>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <Text style={styles.optionsNameDetail}>ตรวจสอบข้อมูลการโอนเงิน</Text>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          margin: 20,
          backgroundColor: "snow",
          borderWidth: 0,
          borderColor: "pink",
          padding: 5,
        }}
      >
        <RenderLabel
          label="ชื่อผู้โอนเงิน"
          value="นายทดสอบ รอบจัด"
          icon="user"
        />
        <RenderLabel
          label="ธนาคารที่โอนเงิน"
          value="ธนาคารไทยพานิชย์"
          icon="bank"
        />
        <RenderLabel
          label="ยอดเงินโอน"
          value="5,000 บาท"
          icon="money"
          type="F"
        />
        <RenderLabel
          label="เวลาที่โอนเงิน"
          value="16/05/2021 เวลา 11.00.00"
          icon="date"
          type="F2"
        />
      </View>
      <Image
        source={SlipImg}
        style={{ width: 200, height: 250, marginBottom: 10 }}
      />
      <Button
        icon={
          <AntDesign
            name="checksquareo"
            size={20}
            color="white"
            style={{ marginTo: 5 }}
          />
        }
        buttonStyle={styles.buttonConfirm}
        title="ยืนยันข้อมูลการโอนเงิน ไปยัง Admin"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  buttonConfirm: {
    backgroundColor: "green",
    borderRadius: 25,
    padding: 10,
  },
  inputForm: {
    margin: 10,
    borderWidth: 1.5,
    borderColor: "#bbb",
    padding: 5,
    borderRadius: 25,
  },
  optionsNameDetail: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginBottom: 15,
    marginTop: 10,
  },
})

export default VerifyPaymentSlip
