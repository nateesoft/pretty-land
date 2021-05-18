import React from "react"
import { StyleSheet, View } from "react-native"
import { Button, Text, Input } from "react-native-elements"
import { AntDesign, Ionicons } from "react-native-vector-icons"

const ConfirmTaskScreen = ({ navigation, route }) => {
  const { item } = route.params
  return (
    <View style={styles.cardDetail}>
      <Text style={styles.optionsNameDetail2}>รายละเอียดลูกค้าจ้างงาน</Text>
      <View style={styles.viewCard}>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 5,
            backgroundColor: "#123456",
            color: "white",
            paddingHorizontal: 5,
          }}
        >
          จังหวัด: {item.province}
        </Text>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 5,
            backgroundColor: "#123456",
            color: "white",
            paddingHorizontal: 5,
          }}
        >
          ลูกค้า: {item.customer}
        </Text>
        <Text style={{ marginBottom: 5 }}>ชื่องาน: {item.name}</Text>
        <Text style={{ marginBottom: 5 }}>level: {item.customerLevel}</Text>
        <Text
          style={{
            marginBottom: 5,
            backgroundColor: "chocolate",
            color: "white",
            paddingHorizontal: 5,
          }}
        >
          โหมดงาน: {item.partnerRequest}
        </Text>
        <Text style={{ marginBottom: 15 }}>{item.subtitle}</Text>
        <Text style={{ marginBottom: 15 }}>สถานะที่จัดงาน: {item.place}</Text>
        <Text style={{ marginBottom: 15 }}>
          เบอร์ติดต่อลูกค้า: {item.customerContact}
        </Text>
        <View
          style={{
            borderWidth: 1.5,
            borderRadius: 10,
            borderColor: "gray",
            padding: 10,
          }}
        >
          <Input placeholder="เสนอราคา (บาท)" />
          <Input placeholder="ระบุสถานที่" />
          <Input placeholder="เบอร์ติดต่อ" />
        </View>
      </View>
      <Button
        icon={
          <AntDesign
            name="checkcircleo"
            size={15}
            color="white"
            style={{ marginRight: 5 }}
          />
        }
        iconLeft
        buttonStyle={{
          margin: 5,
          backgroundColor: "#ff2fe6",
          paddingHorizontal: 20,
          borderRadius: 25,
        }}
        title="บันทึกแจ้งรับงาน"
        onPress={() => navigation.navigate("All-Task-List")}
      />
    </View>
  )
}

const styles = StyleSheet.create({
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
})

export default ConfirmTaskScreen
