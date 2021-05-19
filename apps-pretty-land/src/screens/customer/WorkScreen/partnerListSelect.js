import React from "react"
import {
  View,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  ImageBackground,
} from "react-native"
import { Text } from "react-native"
import { Button } from "react-native-elements"
import { MaterialIcons } from "react-native-vector-icons"

import { getPartnerListToSelect } from "../../../data/apis"

const PartnerListSelect = ({ navigation, route }) => {
  const { item: data } = route.params

  const list = getPartnerListToSelect("")

  const onPressShowPartnerDetail = (item) => {
    navigation.navigate("Partner-Image", { data, item })
  }

  const DisplayCard = ({ data }) => (
    <ImageBackground
      source={data.image}
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
          อายุ: 20
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
        <Text style={{ color: "white", marginTop: 5 }}>{data.detail}</Text>
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
          B {data.price}
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
          {data.name}
        </Text>
        <Text style={{ fontSize: 18 }}>{data.place}</Text>
      </View>
    </ImageBackground>
  )

  return (
    <ScrollView>
      <View style={styles.cardContainer1}>
        <Text style={{ fontSize: 20, color: "blue", fontWeight: "bold" }}>
          แสดงรายชื่อ Parnter พร้อมรับงาน
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          alignContent: "space-between",
          flexDirection: "row",
          flexWrap: "wrap",
          backgroundColor: "white",
          justifyContent: "center",
        }}
      >
        {list.map((item, index) => (
          <TouchableHighlight key={index} onPress={() => onPressShowPartnerDetail(item)}>
            <DisplayCard data={item} />
          </TouchableHighlight>
        ))}
        <Button title="เข้าหน้ารับชำระ" icon={
          <MaterialIcons
            name="attach-money"
            size={20}
            color="white"
            style={{ marginRight: 10 }}
          />
        }
        onPress={()=>navigation.navigate("Payment-Form", { item: data })}
        />
      </View>
    </ScrollView>
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
    backgroundColor: "white",
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
  btnContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    textAlignVertical: "center",
    paddingLeft: 10,
  },
  btnLineClickContain: {
    paddingTop: 11,
    paddingLeft: 10,
    marginBottom: 5,
    backgroundColor: "#35D00D",
    marginTop: 45,
    borderRadius: 25,
    width: 250,
    height: 45,
  },
})

export default PartnerListSelect
