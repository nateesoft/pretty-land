import React from "react"
import { View, StyleSheet } from "react-native"
import { Button, Text } from "react-native-elements"
import { AntDesign, FontAwesome, Fontisto } from "react-native-vector-icons"

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
      <Button
        icon={
          <AntDesign
            name="checksquareo"
            size={20}
            color="white"
            style={{ marginRight: 5 }}
          />
        }
        buttonStyle={styles.buttonConfirm}
        title="ยืนยันข้อมูลถูกต้อง"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  buttonConfirm: {
    backgroundColor: "green",
    borderRadius: 25,
    paddingHorizontal: 20,
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
