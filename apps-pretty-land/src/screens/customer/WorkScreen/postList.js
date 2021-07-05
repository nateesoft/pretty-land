import React, { useState, useEffect } from "react"
import {
  FlatList,
  View,
  StyleSheet,
  Image,
  RefreshControl,
  ImageBackground,
} from "react-native"
import { ListItem, Avatar, Text } from "react-native-elements"
import ProgressCircle from "react-native-progress-circle"
import Moment from "moment"

import CardNotfound from "../../../components/CardNotfound"
import firebase from "../../../../util/firebase"
import { snapshotToArray } from "../../../../util"
import { AppConfig } from "../../../Constants"
import bgImage from "../../../../assets/bg.png"
import { updatePosts } from "../../../apis"

const PostListScreen = ({ navigation, route }) => {
  const { userId } = route.params
  const [refreshing, setRefreshing] = useState(false)
  const [filterList, setFilterList] = useState([])

  const handleRefresh = () => {}

  const onPressOptions = (item, status) => {
    if (status === AppConfig.PostsStatus.waitCustomerSelectPartner) {
      navigation.navigate("Partner-List-Select", { postItem: item, userId })
    } else if (status === AppConfig.PostsStatus.waitCustomerPayment) {
      navigation.navigate("Payment-Form", { item, userId })
    } else {
      navigation.navigate("Review-Task", { postDetail: item, userId })
    }
  }

  const renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      onPress={() => onPressOptions(item, item.status)}
      containerStyle={{
        backgroundColor: null,
        borderRadius: 8,
        marginVertical: 5,
      }}
    >
      <Avatar source={{ uri: item.partnerImage }} size={128} />
      <ListItem.Content style={{ marginLeft: 10 }}>
        <ListItem.Subtitle>ชื่อ: {item.customerName}</ListItem.Subtitle>
        <ListItem.Subtitle>{item.partnerRequest}</ListItem.Subtitle>
        <ListItem.Subtitle>จังหวัด: {item.provinceName}</ListItem.Subtitle>
        <ListItem.Subtitle style={{ backgroundColor: "pink", padding: 5 }}>
          Status: {item.statusText}
        </ListItem.Subtitle>
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
      .orderByChild("customerId")
      .equalTo(userId)
    const listener = ref.on("value", (snapshot) => {
      const postsList = snapshotToArray(snapshot)
      setFilterList(
        postsList.filter((item, index) => {
          if (
            item.status !== AppConfig.PostsStatus.notApprove &&
            item.status !== AppConfig.PostsStatus.customerCancelPost &&
            item.status !== AppConfig.PostsStatus.postTimeout
          ) {
            const date1 = Moment()
            const date2 = Moment(item.sys_update_date)
            const diffHours = date1.diff(date2, "hours")

            if (item.status === AppConfig.PostsStatus.customerNewPostDone) {
              if (diffHours <= 24) {
                return item
              } else {
                // update timeout
                updatePosts(item.id, {
                  status: AppConfig.PostsStatus.postTimeout,
                  statusText: "ข้อมูลการโพสท์ใหม่หมดอายุ",
                  sys_update_date: new Date().toUTCString(),
                })
              }
            } else if (
              item.status === AppConfig.PostsStatus.adminConfirmNewPost
            ) {
              if (diffHours <= 2) {
                return item
              } else {
                // update timeout
                updatePosts(item.id, {
                  status: AppConfig.PostsStatus.postTimeout,
                  statusText:
                    "ข้อมูลการโพสท์หมดอายุ หลังจากอนุมัติเกิน 2 ชั่วโมง",
                  sys_update_date: new Date().toUTCString(),
                })
              }
            } else {
              return item
            }
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
      <Text style={styles.textTopic}>แสดงรายการที่โพสท์</Text>
      <View style={styles.container}>
        {filterList.length === 0 && (
          <CardNotfound text="ไม่พบข้อมูลการโพสท์" />
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
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  textTopic: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    backgroundColor: "#ff2fe6",
    padding: 10,
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
})

export default PostListScreen
