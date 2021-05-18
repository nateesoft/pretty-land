import React from "react"
import { View, StyleSheet } from "react-native"
import { Image, FlatList, Text } from "react-native"
import { ListItem, Avatar, Button } from "react-native-elements"
import ProgressCircle from "react-native-progress-circle"

import Img1 from "../../../../assets/img_example/f1.jpg"
import Img2 from "../../../../assets/img_example/girl2.png"

const list = [
  {
    name: "น้องกิ๊ฟ วันทอง",
    subtitle: "น่ารักยิ้มเก่ง ขาวหมวย",
    status: "พร้อมทำงาน",
    image: Img1,
  },
  {
    name: "น้องเข็ม",
    subtitle: "อวบ สมส่วน ขาว",
    status: "พร้อมทำงาน",
    image: Img2,
  },
]

const PartnerListSelect = ({ navigation, route }) => {
  const { item: data } = route.params

  const onPressConfirmPartner = () => {
    navigation.navigate("Post-List")
  }

  const onPressShowPartnerDetail = (item) => {
    navigation.navigate("Partner-Image", { data, item })
  }

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      onPress={() => onPressShowPartnerDetail(item)}
      containerStyle={{
        backgroundColor: "#fef8e3",
        borderRadius: 8,
        marginVertical: 5,
      }}
    >
      <Avatar source={item.image} size={64} />
      <ListItem.Content style={{ marginLeft: 10 }}>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
        <ListItem.Subtitle>Status: {item.status}</ListItem.Subtitle>
      </ListItem.Content>
      <ProgressCircle
        percent={30}
        radius={17}
        borderWidth={1.5}
        color="f580084"
        shadowColor="#FFF"
        bgColor="#FFF"
      >
        <Image source={require("../../../../assets/icons/pl.png")} />
      </ProgressCircle>
    </ListItem>
  )

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer1}>
        <Text style={{ fontSize: 20, color: "blue", fontWeight: "bold" }}>
          แสดงรายชื่อ Parnter พร้อมรับงาน
        </Text>
      </View>
      <View style={styles.cardContainer2}>
        <FlatList
          style={styles.list}
          keyExtractor={keyExtractor}
          data={list}
          renderItem={renderItem}
          style={{
            height: 600,
            borderWidth: 1,
            borderColor: "#eee",
            padding: 5,
          }}
        />
      </View>
      <View style={{ alignItems: "center", backgroundColor: "white" }}>
        <Button
          style={styles.button}
          buttonStyle={{
            backgroundColor: "chocolate",
          }}
          title="CONFIRM PARTNER"
          onPress={() => onPressConfirmPartner()}
        />
      </View>
    </View>
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
})

export default PartnerListSelect
