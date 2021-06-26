import React, { useState, useEffect } from "react"
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
import moment from "moment"

import bgImage from "../../../../assets/bg.png"
import CardNotfound from "../../../components/CardNotfound"

import firebase from "../../../../util/firebase"
import { snapshotToArray } from "../../../../util"

const ListMyWorkScreen = ({ navigation, route }) => {
  const { userId } = route.params
  const [refreshing, setRefreshing] = useState(false)
  const [filterList, setFilterList] = useState([])

  const handleRefresh = () => {}

  const onPressOptions = (item) => {
    navigation.navigate("Work-Detail", { item })
  }

  const renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      onPress={() => onPressOptions(item)}
      containerStyle={{
        backgroundColor: null,
        borderRadius: 8,
        marginVertical: 5,
      }}
    >
      <ListItem.Content style={{ marginLeft: 10 }}>
        <ListItem.Title>โหมดงาน: {item.partnerRequest}</ListItem.Title>
        <ListItem.Title>
          วันที่แจ้งรับงาน: {moment(item.sys_create_date).format("D MMM YYYY")}
        </ListItem.Title>
        <ListItem.Title>จังหวัด: {item.provinceName}</ListItem.Title>
        <Text>---------------------------------------</Text>
        <ListItem.Subtitle>ลูกค้า: {item.customerName}</ListItem.Subtitle>
        <ListItem.Subtitle>เบอร์ติดต่อ: {item.customerPhone}</ListItem.Subtitle>
        <Text>---------------------------------------</Text>
        <ListItem.Title
          style={{
            backgroundColor: "blue",
            color: "white",
            paddingHorizontal: 5,
          }}
        >
          สถานะ: {item.statusText}
        </ListItem.Title>
      </ListItem.Content>
      <ProgressCircle
        percent={30}
        radius={17}
        borderWidth={1.5}
        color="f580084"
      >
        <Image source={require("../../../../assets/icons/pl.png")} />
      </ProgressCircle>
    </ListItem>
  )

  useEffect(() => {
    const ref = firebase
      .database()
      .ref("posts")
      .orderByChild(`partnerSelect/${userId}/partnerId`)
      .equalTo(userId)
    const listener = ref.on("value", (snapshot) => {
      const posts = snapshotToArray(snapshot)
      setFilterList(posts)
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
        <Text style={styles.textTopic}>งานที่สนใจ / รอลูกค้าตกลง</Text>
        <View style={styles.container}>
          {filterList.length === 0 && (
            <CardNotfound text="ไม่พบข้อมูลโพสท์ในระบบ" />
          )}
          {filterList.length > 0 && (
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              data={filterList}
              renderItem={renderItem}
              style={{
                height: 600,
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
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    backgroundColor: '#ff2fe6',
    padding: 10,
  },
  textTopicDetail: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    backgroundColor: '#ff2fe6',
    padding: 10,
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
