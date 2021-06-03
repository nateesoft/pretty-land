import React, { useState } from "react"
import {
  SafeAreaView,
  FlatList,
  View,
  StyleSheet,
  Image,
  RefreshControl,
  ImageBackground,
} from "react-native"
import { ListItem, Text } from "react-native-elements"
import ProgressCircle from "react-native-progress-circle"

import bgImage from "../../../../assets/bg.png"
import CardNotfound from "../../../components/CardNotfound"
import { getDataForPartnerWork } from "../../../data/apis"

const ListMyWorkScreen = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = useState(false)

  const filterList = getDataForPartnerWork(1).filter((item) => {
    return item
  })

  const handleRefresh = () => {
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
        <ListItem.Title>โหมดงาน: {item.partnerType}</ListItem.Title>
        <ListItem.Title>วันที่แจ้งรับงาน: {item.jobDateRequest}</ListItem.Title>
        <ListItem.Title>สถานที่แจ้งรับงาน: {item.place}</ListItem.Title>
        <ListItem.Title>จังหวัด: {item.province}</ListItem.Title>
        <ListItem.Title>ราคาที่เสนอ: {item.priceRequest}</ListItem.Title>
        <Text>---------------------------------------</Text>
        <ListItem.Title>ชื่องาน: {item.name}</ListItem.Title>
        <ListItem.Subtitle>ลูกค้า: {item.customer}</ListItem.Subtitle>
        <ListItem.Subtitle>
          เบอร์ติดต่อ: {item.customerContact}
        </ListItem.Subtitle>
        <Text>---------------------------------------</Text>
        <ListItem.Title
          style={{
            backgroundColor: "blue",
            color: "white",
            paddingHorizontal: 5,
          }}
        >
          สถานะ: {item.jobStatusDesc}
        </ListItem.Title>
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
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <SafeAreaView style={{ height: "100%" }}>
        <View style={styles.container}>
          <Text style={styles.textTopic}>งานที่สนใจ / รอลูกค้าตกลง</Text>
          <Text style={styles.textTopicDetail}>รอดำเนินการ</Text>
          {filterList.length === 0 && (
            <CardNotfound text="ไม่พบข้อมูลโพสท์ในระบบ" />
          )}
          {filterList.length > 0 && (
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
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
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
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
})

export default ListMyWorkScreen
