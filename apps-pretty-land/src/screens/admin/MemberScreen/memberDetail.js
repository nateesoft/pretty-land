import React from "react"
import { StyleSheet, View, Image } from "react-native"
import { Button, Text } from "react-native-elements"
import { Ionicons } from "react-native-vector-icons"

const MemberDetailScreen = ({ navigation, route }) => {
  const { item } = route.params
  return (
    <View style={styles.cardDetail}>
      <View style={styles.viewCard}>
        <Text style={{ fontSize: 22 }}>แสดงรายละเอียดสมาชิก</Text>
        <Image
          source={item.image}
          style={{
            justifyContent: 'center',
            width: "100%",
            height: 350,
            marginTop: 20,
          }}
        />
        <View
          style={{ padding: 20, borderWidth: 1, borderRadius: 25, margin: 10 }}
        >
          <Text style={{ fontSize: 16 }}>ชื่อ: {item.name}</Text>
          <Text style={{ fontSize: 16 }}>ประเภทสมาชิก: {item.memberType}</Text>
          <Text style={{ fontSize: 16 }}>
            วันที่เป็นสมาชิก: {item.dateIssue}
          </Text>
          <Text style={{ fontSize: 16 }}>
            ระดับ Level: {item.customerLevel}
          </Text>
          <Text style={{ fontSize: 16 }}>เบอร์ติดต่อ: {item.phone}</Text>
          <Text style={{ fontSize: 16 }}>สถานะ: {item.status}</Text>
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
