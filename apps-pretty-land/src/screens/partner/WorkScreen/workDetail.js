import React, { useEffect, useState } from "react"
import { StyleSheet, View, ImageBackground } from "react-native"
import { Button, Text, Input } from "react-native-elements"
import { AntDesign, Ionicons } from "react-native-vector-icons"

import firebase from "../../../../util/firebase"
import bgImage from "../../../../assets/bg.png"

const WorkDetailScreen = ({ navigation, route }) => {
  const { userId, item } = route.params
  const [partner, setPartner] = useState({})

  useEffect(() => {
    const ref = firebase
      .database()
      .ref(`posts/${item.id}/partnerSelect/${userId}`)
    const listener = ref.on("value", (snapshot) => {
      const data = { ...snapshot.val() }
      setPartner(data)
    })

    return () => ref.off("value", listener)
  }, [])

  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <View style={styles.cardDetail}>
        <Text style={styles.optionsNameDetail2}>
          รายละเอียดงานที่แจ้งลูกค้า
        </Text>
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
            ลูกค้า: {item.customerName}
          </Text>
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
          <View
            style={{
              borderWidth: 1.5,
              borderRadius: 10,
              borderColor: "gray",
              padding: 5,
            }}
          >
            <Input
              placeholder="เสนอราคา (บาท)"
              value={`ราคาที่เสนอ ${partner.amount} บาท`}
            />
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 20, backgroundColor: "yellow" }}>
            สถานะลูกค้า {item.statusText}
          </Text>
          {item.status === "close_job" && (
            <Button
              icon={
                <Ionicons
                  name="happy-outline"
                  size={24}
                  color="pink"
                  style={{ marginRight: 5 }}
                />
              }
              buttonStyle={{ marginTop: 10, borderRadius: 5 }}
              title="Partner แจ้งปิดงาน"
            />
          )}
        </View>
        {partner.selectStatus === "customer_payment" && (
          <Button
            icon={
              <AntDesign
                name="team"
                size={15}
                color="white"
                style={{ marginRight: 5 }}
              />
            }
            iconLeft
            buttonStyle={{
              margin: 5,
              backgroundColor: "green",
              paddingHorizontal: 20,
              borderRadius: 25,
            }}
            title="บันทึกเจอลูกค้าแล้ว"
            onPress={() => navigation.navigate("List-My-Work")}
          />
        )}
        {partner.selectStatus === "customer_meet" && (
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
            title="บันทึกปิดงาน"
            onPress={() => navigation.navigate("List-My-Work")}
          />
        )}
      </View>
    </ImageBackground>
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
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
})

export default WorkDetailScreen
