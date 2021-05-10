import React from "react"
import { SafeAreaView, Image, FlatList, Text } from "react-native"
import { ListItem, Avatar, Button } from "react-native-elements"

import Img1 from "../../../../assets/img_example/girl1.png"
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

const DetailScreen = ({ navigation, route }) => {
  const { item: data } = route.params

  const onPressConfirmPartner = () => {
    navigation.navigate("Home")
  }

  const onPressShowPartnerDetail = (item) => {
    navigation.navigate("Customer-Work-Detail2", { data, item })
  }

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <ListItem bottomDivider onPress={() => onPressShowPartnerDetail(item)}>
      <Avatar source={item.image} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
        <ListItem.Subtitle>Status: {item.status}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  )

  return (
    <SafeAreaView>
      <Text>แสดงรายชื่อ Parnter พร้อมรับงาน</Text>
      <Image source={data.image} />
      <Text>{data.name}</Text>
      <Text>{data.subtitle}</Text>
      <FlatList
        keyExtractor={keyExtractor}
        data={list}
        renderItem={renderItem}
      />
      <Button
        buttonStyle={{
          backgroundColor: "chocolate",
        }}
        title="CONFIRM PARTNER"
        onPress={() => onPressConfirmPartner()}
      />
    </SafeAreaView>
  )
}

export default DetailScreen
