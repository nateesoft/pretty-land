import React, { useEffect, useState } from "react"
import {
  View,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  ImageBackground,
  SafeAreaView,
} from "react-native"
import { Text } from "react-native"
import { Button } from "react-native-elements"
import { MaterialIcons } from "react-native-vector-icons"

import bgImage from "../../../../assets/bg.png"

import firebase from "../../../../util/firebase"
import { snapshotToArray } from "../../../../util"

const PartnerListSelect = ({ navigation, route }) => {
  const { postItem } = route.params
  const [listSelect, setListSelect] = useState([])
  const [paymentActive, setPaymentActive] = useState(false)

  const onPressShowPartnerDetail = (item) => {
    navigation.navigate("Partner-Image", { postItem, partnerItem: item })
  }

  const DisplayCard = ({ data }) => (
    <ImageBackground
      source={{ uri: data.image }}
      style={{
        width: 180,
        height: 300,
        margin: 5,
      }}
    >
      <View style={{ borderRadius: 20, margin: 10, opacity: 0.8 }}>
        <Text
          style={{
            color: "white",
            backgroundColor: "green",
            width: 55,
            padding: 2,
          }}
        >
          อายุ: {data.age}
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 65,
          backgroundColor: "#0471AB",
          width: "100%",
          height: 30,
          alignItems: "center",
          opacity: 0.75,
        }}
      >
        <Text style={{ color: "white", marginTop: 5 }}>{data.character}</Text>
      </View>
      <View
        style={{
          color: "white",
          backgroundColor: "#0471AB",
          position: "absolute",
          bottom: 155,
          borderRadius: 5,
          paddingVertical: 5,
          paddingHorizontal: 10,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>{data.sex}</Text>
      </View>
      <View
        style={{
          color: "white",
          backgroundColor: "#FF00B2",
          position: "absolute",
          bottom: 110,
          borderRadius: 5,
          paddingVertical: 5,
          paddingHorizontal: 10,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          B {data.amount}
        </Text>
      </View>
      <View
        style={{
          bottom: 0,
          flex: 1,
          justifyContent: "center",
          position: "absolute",
          backgroundColor: "pink",
          width: "100%",
          height: 65,
          alignItems: "flex-end",
          paddingRight: 15,
        }}
      >
        <Text style={{ color: "blue", fontSize: 22, fontWeight: "bold" }}>
          {data.partnerName}
        </Text>
        {data.selectStatus === "customer_confirm" && (
          <Text style={{ color: "blue" }}>เลือกสมาชิกคนนี้แล้ว</Text>
        )}
      </View>
    </ImageBackground>
  )

  useEffect(() => {
    const ref = firebase.database().ref(`posts/${postItem.id}/partnerSelect`)
    const listener = ref.on("value", (snapshot) => {
      const listData = snapshotToArray(snapshot)
      setListSelect(listData)
    })
    return () => ref.off("value", listener)
  }, [])

  useEffect(() => {
    const ref = firebase
      .database()
      .ref(`posts/${postItem.id}/partnerSelect`)
      .orderByChild("selectStatus")
      .equalTo("customer_confirm")
    const listener = ref.on("value", (snapshot) => {
      const sizePartner = snapshotToArray(snapshot)
      if (sizePartner.length > 0) {
        setPaymentActive(true)
      }
    })

    return () => ref.off("value", listener)
  }, [])

  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <SafeAreaView style={{ height: "100%" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardContainer1}>
            <Text style={{ fontSize: 20, color: "blue", fontWeight: "bold" }}>
              แสดงรายชื่อ Partner พร้อมรับงาน
            </Text>
          </View>
          <View
            style={{
              padding: 5,
              alignContent: "space-between",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {listSelect.map((item, index) => (
              <TouchableHighlight
                key={index}
                onPress={() => onPressShowPartnerDetail(item)}
              >
                <DisplayCard data={item} />
              </TouchableHighlight>
            ))}
          </View>
          {paymentActive && (
            <View style={{ alignItems: "center" }}>
              <Button
                title="เข้าหน้ารับชำระ"
                icon={
                  <MaterialIcons
                    name="attach-money"
                    size={20}
                    color="white"
                    style={{ marginRight: 10 }}
                  />
                }
                onPress={() =>
                  navigation.navigate("Payment-Form", { item: postItem })
                }
                buttonStyle={{ width: 200 }}
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  cardContainer1: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
  cardContainer2: {
    flex: 1,
    flexDirection: "column",
  },
  list: {
    flex: 1,
    width: "100%",
  },
  image: {
    width: 350,
    height: 250,
  },
  button: {},
  textTopic: {
    marginBottom: 15,
  },
  box: {
    flex: 1,
    flexDirection: "column",
    width: "50%",
    height: "50%",
    padding: 5,
  },
  inner: {
    flex: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    height: 200,
    width: 100,
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
})

export default PartnerListSelect
