import React from "react"
import { StyleSheet, View } from "react-native"
import { Button, Text, Input } from "react-native-elements"
import { AntDesign, Ionicons } from "react-native-vector-icons"

const ConfirmTransferTaskScreen = ({ navigation, route }) => {
  return (
    <View style={styles.cardDetail}>
      <Text style={styles.optionsNameDetail}>ข้อมูลการโอนเงินเข้าสู่ระบบ</Text>
      <View style={styles.viewCard}>
        <Input
          name="place"
          disabled
          leftIcon={{ type: "font-awesome", name: "home" }}
          style={styles.inputForm}
          value="โอนเงินเมื่อวันที่ 01/01/2021"
        />
        <Input
          name="qty"
          disabled
          leftIcon={{ type: "font-awesome", name: "users" }}
          style={styles.inputForm}
          value="ยอดเงินที่โอน 100 บาท"
        />
        <Input
          name="status"
          disabled
          leftIcon={{ type: "font-awesome", name: "star" }}
          style={styles.inputForm}
          value="เลขที่อ้างอิง"
        />
        <Input
          name="status"
          disabled
          leftIcon={{ type: "font-awesome", name: "star" }}
          style={styles.inputForm}
          value="รูปภาพสลิปการโอนเงิน"
        />
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
        buttonStyle={{ margin: 5, backgroundColor: "#ff2fe6", paddingHorizontal: 20, borderRadius: 25 }}
        title="การโอนเงินเสร็จสมบูรณ์"
        onPress={() => navigation.navigate("Post-List")}
      />
      <Button
        icon={
          <Ionicons
            name="trash-bin-outline"
            size={15}
            color="white"
            style={{ marginRight: 5 }}
          />
        }
        iconLeft
        buttonStyle={{ margin: 5, backgroundColor: "red", borderRadius: 25, paddingHorizontal: 20 }}
        title="ไม่อนุมัติสลิปการโอนเงิน"
        onPress={() => navigation.navigate("Post-List")}
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

export default ConfirmTransferTaskScreen
