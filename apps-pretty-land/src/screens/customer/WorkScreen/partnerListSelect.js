import React from "react"
import { View, StyleSheet } from "react-native"
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
    <View style={styles.container}>
      <View style={styles.cardContainer1}>
        <Text>{data.name}</Text>
        <Text>{data.subtitle}</Text>
        <Image source={data.image} style={styles.image} />
        <Text style={styles.textTopic}>แสดงรายชื่อ Parnter พร้อมรับงาน</Text>
      </View>
      <View style={styles.cardContainer2}>
        <FlatList style={styles.list} keyExtractor={keyExtractor}
          data={list}
          renderItem={renderItem}
        />
        <Button style={styles.button} buttonStyle={{
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
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  cardContainer1: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContainer2: {
    flex: 1,
    flexDirection: "column",
  },
  list: {
    flex: 1,
    width: '100%',
  },
  image: {
    width: 350,
    height: 250,
  },
  button: {
  },
  textTopic: {
    marginBottom: 15,
  },
})

export default PartnerListSelect
