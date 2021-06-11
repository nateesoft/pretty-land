import React, { useEffect, useState } from "react"
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
import Moment from "moment"

import CardNotfound from "../../../components/CardNotfound"
import firebase from "../../../../util/firebase"
import { snapshotToArray } from "../../../../util"
import bgImage from "../../../../assets/bg.png"

const AllCustomerPostList = ({ navigation, route }) => {
  const { profile, item } = route.params
  const [refreshing, setRefreshing] = useState(false)
  const [filterList, setFilterList] = useState([])

  const handleRefresh = () => {}

  const onPressOptions = (item) => {
    navigation.navigate("Task-Detail", { profile, item })
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
      <ListItem.Content style={{ margin: 10 }}>
        <ListItem.Title
          style={{
            marginBottom: 5,
            backgroundColor: "chocolate",
            color: "white",
            paddingHorizontal: 5,
          }}
        >
          โหมดงาน: {item.partnerRequest}
        </ListItem.Title>
        <ListItem.Title
          style={{
            marginBottom: 5,
          }}
        >
          จำนวนที่ต้องการ: {item.partnerQty} คน
        </ListItem.Title>
        <ListItem.Title
          style={{
            marginBottom: 5,
          }}
        >
          สถานที่: {item.placeMeeting}
        </ListItem.Title>
        <ListItem.Title
          style={{
            marginBottom: 5,
          }}
        >
          จังหวัด: {item.provinceName}
        </ListItem.Title>
        <ListItem.Title
          style={{
            marginBottom: 5,
          }}
        >
          วันที่โพสท์:{" "}
          {Moment(item.sys_create_date).format("D MMM YYYY HH:mm:ss")}
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

  useEffect(() => {
    const ref = firebase
      .database()
      .ref(`posts`)
      .orderByChild("province")
      .equalTo(item.provinceId)
    const listener = ref.on("value", (snapshot) => {
      const postsList = snapshotToArray(snapshot)
      setFilterList(
        postsList.filter((item, index) => {
          if (item.partnerRequest === "pretty-mc" && profile.type1) {
            return item
          }
          if (item.partnerRequest === "coyote" && profile.type2) {
            return item
          }
          if (item.partnerRequest === "pretty-entertain" && profile.type3) {
            return item
          }
          if (item.partnerRequest === "pretty-massage" && profile.type4) {
            return item
          }
        })
      )
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
        <View style={styles.container}>
          <Text style={styles.textTopic}>งานว่าจ้างทั้งหมดในระบบ</Text>
          <Text style={styles.textTopicDetail}>
            จังหวัด {item.provinceName}
          </Text>
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
          {filterList.length === 0 && (
            <View
              style={{
                alignItems: "center",
                height: 65,
                borderWidth: 1,
                borderColor: "#aaa",
                padding: 20,
              }}
            >
              <Text>ไม่พบข้อมูลโพสท์</Text>
            </View>
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

export default AllCustomerPostList
