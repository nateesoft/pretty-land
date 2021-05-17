import React from "react"
import { StyleSheet, View } from "react-native"
import { Button, Text, Input } from "react-native-elements"
import { AntDesign, Ionicons } from "react-native-vector-icons"

const MemberDetailScreen = ({ navigation, route }) => {
  return (
    <View style={styles.cardDetail}>
      <Text style={styles.optionsNameDetail}>ตำแหน่งงานที่มองหา</Text>
      <Text style={styles.optionsNameDetail2}>จังหวัดที่ต้องการ</Text>
      <View style={styles.viewCard}>
        <Text style={{ fontSize: 22 }}>แสดงรายละเอียดสมาชิก</Text>
        <View style={{ padding: 20, borderWidth: 1, borderRadius: 25, margin: 10 }}>
          <Text style={{fontSize: 16}}>ประเภทสมาชิก: ลูกค้า</Text>
          <Text style={{fontSize: 16}}>ประเภทสมาชิก: Partner</Text>
          <Text style={{fontSize: 16}}>วันที่เป็นสมาชิก:   11/01/2021</Text>
          <Text style={{fontSize: 16}}>ระดับ Level:   11/01/2021</Text>
        </View>
      </View>
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
        buttonStyle={{
          margin: 5,
          backgroundColor: "red",
          borderRadius: 25,
          paddingHorizontal: 20,
        }}
        title="ยกเลิกสมาชิกท่านนี้"
        onPress={() => navigation.navigate("List-All-Member")}
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

export default MemberDetailScreen
