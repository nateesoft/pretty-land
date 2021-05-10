import React from "react"
import { SafeAreaView, FlatList } from "react-native"
import { ListItem, Avatar } from "react-native-elements"

import Img1 from "../../../../assets/img_example/img1.png"
import Img2 from "../../../../assets/img_example/img2.png"
import Img3 from "../../../../assets/img_example/img3.png"
import Img4 from "../../../../assets/img_example/img4.png"

const list = [
  {
    name: "Pretty - ฉลองซื้อรถใหม่",
    image: Img1,
    subtitle: "กรุงเทพฯ จำนวน 2 คน",
    status: "customer_new_post_done",
    statusText: "โพสท์ใหม่",
  },
  {
    name: "Coyote - งานรถกะบะซิ่ง",
    image: Img2,
    subtitle: "เชียงใหม่ จำนวน 10 คน",
    status: "wait_admin_confirm_new_post",
    statusText: "รอ Admin คอนเฟิร์ม",
  },
  {
    name: "Pretty Entertain - รองรับแขก VIP",
    image: Img3,
    subtitle: "กรงเทพฯ จำนวน 4 คน",
    status: "wait_customer_select_partner",
    statusText: "รอเลือก Partner",
  },
  {
    name: "Pretty นวดแผนไทย - อบรมพนักงาน",
    image: Img1,
    subtitle: "นครราชสีมา จำนวน 5 คน",
    status: "wait_customer_payment",
    statusText: "รอชำระเงิน",
  },
  {
    name: "Pretty นวดแผนไทย - อบรมพนักงาน",
    image: Img4,
    subtitle: "นครราชสีมา จำนวน 5 คน",
    status: "wait_admin_confirm_payment",
    statusText: "รอตรวจสอบเงินโอน",
  },
  {
    name: "Pretty นวดแผนไทย - อบรมพนักงาน",
    image: Img2,
    subtitle: "นครราชสีมา จำนวน 5 คน",
    status: "customer_with_partner",
    statusText: "อยู่ระหว่างภารกิจ",
  },
  {
    name: "Pretty นวดแผนไทย - อบรมพนักงาน",
    image: Img1,
    subtitle: "นครราชสีมา จำนวน 5 คน",
    status: "close_job",
    statusText: "ปิดงานเรียบร้อย",
  },
]

const HomeScreen = ({ navigation }) => {
  const onPressOptions = (item) => {
    navigation.navigate("Customer-Work-Detail", { item })
  }

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <ListItem bottomDivider onPress={() => onPressOptions(item)}>
      <Avatar source={item.image} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
        <ListItem.Subtitle>Status: {item.statusText}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  )

  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={keyExtractor}
        data={list}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}

export default HomeScreen
