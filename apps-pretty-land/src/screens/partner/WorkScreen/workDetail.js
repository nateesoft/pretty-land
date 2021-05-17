import React from "react"
import { StyleSheet, View } from "react-native"
import { Button, Text, Input } from "react-native-elements"
import { AntDesign, Ionicons } from "react-native-vector-icons"

const WorkDetailScreen = ({ navigation, route }) => {
  return (
    <View style={styles.cardDetail}>
      <Text style={styles.optionsNameDetail}>ตำแหน่งงานที่มองหา</Text>
      <Text style={styles.optionsNameDetail2}>จังหวัดที่ต้องการ</Text>
      <View style={styles.viewCard}>
        <Input
          name="owner"
          disabled
          leftIcon={{ type: "font-awesome", name: "address-book" }}
          style={styles.inputForm}
          value="คุณโดนใจ ใช่เลย"
        />
        <Input
          name="comment"
          placeholder="รายละเอียดเพิ่มเติม"
          disabled
          leftIcon={{ type: "font-awesome", name: "comment" }}
          style={styles.inputForm}
          value="รูปร่างดี หุ่นดี ขาว ด่วน!!!"
        />
        <Input
          name="phone"
          placeholder="เบอร์ติดต่อ"
          disabled
          leftIcon={{ type: "font-awesome", name: "phone" }}
          style={styles.inputForm}
          value="0812208944"
        />
        <Input
          name="place"
          disabled
          leftIcon={{ type: "font-awesome", name: "home" }}
          style={styles.inputForm}
          value="หน้าวัดลาปลาเค้า"
        />
        <Input
          name="qty"
          disabled
          leftIcon={{ type: "font-awesome", name: "users" }}
          style={styles.inputForm}
          value="1 ตำแหน่ง"
        />
        <Input
          name="status"
          disabled
          leftIcon={{ type: "font-awesome", name: "star" }}
          style={styles.inputForm}
          value="รอพิจารณาจาก Admin"
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
        title="บันทึกปิดงาน"
        onPress={() => navigation.navigate("List-My-Work")}
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

export default WorkDetailScreen
