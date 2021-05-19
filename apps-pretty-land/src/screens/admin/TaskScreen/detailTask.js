import React from "react"
import { StyleSheet, View } from "react-native"
import { Button, Text, Input } from "react-native-elements"
import { AntDesign, Ionicons } from "react-native-vector-icons"

const ConfirmTaskScreen = ({ navigation, route }) => {
  const { item } = route.params

  return (
    <View style={styles.cardDetail}>
      <Text style={{ fontSize: 22 }}>รายละเอียด</Text>
      <View style={styles.viewCard}>
        <View style={{ marginLeft: 10, padding: 20 }}>
          <Text style={{ fontSize: 16 }}>ชื่อลูกค้า: {item.customer}</Text>
          <Text style={{ fontSize: 16 }}>Level: {item.customerLevel}</Text>
          <Text style={{ fontSize: 16 }}>ชื่อโพสท์: {item.name}</Text>
          <Text style={{ fontSize: 16 }}>
            ประเภทที่ต้องการ: {item.partnerRequest}
          </Text>
        </View>
      </View>
      <View style={styles.viewCard}>
        <View style={{ marginLeft: 10, padding: 20 }}>
          <Text style={{ fontSize: 16 }}>สถานะที่นัดพบ: {item.place}</Text>
          <Text style={{ fontSize: 16 }}>
            เบอร์ติดต่อ: {item.customerContact}
          </Text>
        </View>
      </View>
      {item.status === "customer_new_post_done" && (
        <View>
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
            title="อนุมัติโพสท์"
            onPress={() => navigation.navigate("Post-List-All")}
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
            buttonStyle={{
              margin: 5,
              backgroundColor: "red",
              borderRadius: 25,
              paddingHorizontal: 20,
            }}
            title="ไม่อนุมัติโพสท์"
            onPress={() => navigation.navigate("Post-List-All")}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  cardDetail: {
    flex: 1,
    alignItems: "center",
    padding: 5,
    margin: 10,
    backgroundColor: "white",
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
    borderWidth: 1,
    borderColor: "#eee",
    padding: 5,
    marginVertical: 5,
  },
})

export default ConfirmTaskScreen
