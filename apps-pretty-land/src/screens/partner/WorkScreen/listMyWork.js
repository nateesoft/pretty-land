import React from "react"
import {
  SafeAreaView,
  FlatList,
  View,
  StyleSheet,
  Image,
  RefreshControl,
} from "react-native"
import { ListItem, Avatar, Text } from "react-native-elements"
import ProgressCircle from "react-native-progress-circle"

import { getDataForPartnerWork } from "../../../data/apis"

const ListMyWorkScreen = ({ navigation, route }) => {
  const { partnerType } = route.params
  const [refreshing, setRefreshing] = React.useState(false)

  const filterList = getDataForPartnerWork().filter((item) => {
    if (partnerType === "all") {
      return item
    }
    return item.partnerType === partnerType
  })

  const handleRefresh = () => {
    console.log("refresh data list")
  }

  const onPressOptions = (item) => {
    navigation.navigate("Work-Detail", { item })
  }

  const getBgColor = (status) => {
    return "#fcf2ff"
  }

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      onPress={() => onPressOptions(item)}
      containerStyle={{
        backgroundColor: getBgColor(item.status),
        borderRadius: 8,
        marginVertical: 5,
      }}
    >
      <ListItem.Content style={{ marginLeft: 10 }}>
        <ListItem.Title>วันที่แจ้งรับงาน: 18/05/2021</ListItem.Title>
        <ListItem.Title>สถานที่แจ้งรับงาน: สุขุมวิท62</ListItem.Title>
        <ListItem.Title>ราคาที่เสนอ: 2000</ListItem.Title>
        <Text>---------------------------------------</Text>
        <ListItem.Title>ชื่องาน: {item.name}</ListItem.Title>
        <ListItem.Subtitle>ลูกค้า: {item.customer}</ListItem.Subtitle>
        <ListItem.Subtitle>เบอร์ติดต่อ: {item.customerContact}</ListItem.Subtitle>
        <Text>---------------------------------------</Text>
        <ListItem.Title style={{backgroundColor: 'blue', color: 'white', paddingHorizontal: 5}}>สถานะ: รอลูกค้าคอนเฟิร์มเลือก</ListItem.Title>
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
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.textTopic}>งานที่สนใจ / รอลูกค้าตกลง</Text>
        <Text style={styles.textTopicDetail}>รอดำเนินการ</Text>
        <FlatList
          keyExtractor={keyExtractor}
          data={filterList}
          renderItem={renderItem}
          style={{
            height: 600,
            borderWidth: 1,
            borderColor: "#eee",
            padding: 5,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => handleRefresh()}
            />
          }
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: "white",
  },
  textTopic: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginTop: 10,
  },
  textTopicDetail: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginBottom: 15,
    marginTop: 10,
  },
  btnNewPost: {
    backgroundColor: "#35D00D",
    margin: 5,
    borderRadius: 75,
    height: 45,
    width: 250,
  },
})

export default ListMyWorkScreen
