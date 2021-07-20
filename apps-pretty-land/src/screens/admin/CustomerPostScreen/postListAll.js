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

import CardNotfound from "../../../components/CardNotfound"
import { updatePosts } from "../../../apis"
import firebase from "../../../../util/firebase"
import { snapshotToArray, getDiffHours, getDocument } from "../../../../util"
import { AppConfig } from "../../../Constants"

const PostListAllScreen = ({ navigation, route }) => {
  const { item: itemData, partnerRequest } = route.params
  const [refreshing, setRefreshing] = useState(false)
  const [posts, setPosts] = useState([])

  const handleRefresh = () => {}

  const onPressOptions = (item, status) => {
    if (status === AppConfig.PostsStatus.waitAdminConfirmPayment) {
      navigation.navigate("Verify-Payment-Slip", { item, topic: itemData.name })
    } else {
      navigation.navigate("Detail-Task", { item, topic: itemData.name })
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
      underlayColor="pink"
    >
      <ListItem.Content style={{ marginLeft: 10 }}>
        <ListItem.Title>ชื่อลูกค้า: {item.customerName}</ListItem.Title>
        <ListItem.Title>Level: {item.customerLevel}</ListItem.Title>
        <ListItem.Subtitle>
          ประเภทงาน: {itemData.name}
        </ListItem.Subtitle>
        <ListItem.Subtitle>Status: {item.statusText}</ListItem.Subtitle>
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
    let ref = firebase
      .database()
      .ref(getDocument(`posts`))
      .orderByChild("partnerRequest")
      .equalTo(partnerRequest)
    const listener = ref.on("value", (snapshot) => {
      const postsList = snapshotToArray(snapshot)
      setPosts(
        postsList.filter((item, index) => {
          if (item.status === AppConfig.PostsStatus.customerNewPostDone) {
            if (getDiffHours(item.sys_update_date) <= 24) {
              return item
            } else {
              // update timeout
              updatePosts(item.id, {
                status: AppConfig.PostsStatus.postTimeout,
                statusText: "ข้อมูลการโพสท์ใหม่หมดอายุ",
                sys_update_date: new Date().toUTCString(),
              })
            }
          }

          if (item.status === AppConfig.PostsStatus.adminConfirmNewPost) {
            if (getDiffHours(item.sys_update_date) <= 2) {
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
          }

          if (item.status === AppConfig.PostsStatus.startWork) {
            if (getDiffHours(item.sys_update_date) <= 2) {
              return item
            } else {
              // update timeout
              updatePosts(item.id, {
                status: AppConfig.PostsStatus.closeJob,
                statusText: "ระบบปิดโพสท์อัตโนมัติ หลังจาก 2 ชั่วโมง",
                sys_update_date: new Date().toUTCString(),
              })

              // ให้ star/rate สำหรับเด็ก โพสท์นั้นๆ (เต็ม 5 ดาว)
              for (let key in item.partnerSelect) {
                const partnerData = item.partnerSelect[key]
                firebase
                  .database()
                  .ref(getDocument(`partner_star/${partnerData.partnerId}/${item.id}`))
                  .update({
                    star: 5,
                    sys_date: new Date().toUTCString(),
                  })
              }
            }
          } else {
            return item
          }
        })
      )
    })
    return () => ref.off("value", listener)
  }, [])

  return (
    <ImageBackground
      source={AppConfig.bgImage}
      style={styles.imageBg}
      resizeMode="contain"
    >
      <SafeAreaView style={{ height: "100%" }}>
        <Text style={styles.textTopic}>รายการโพสท์หางาน</Text>
        <View style={styles.container}>
          {posts.length === 0 && <CardNotfound text="ไม่พบข้อมูลโพสท์ในระบบ" />}
          {posts.length > 0 && (
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              data={posts}
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

export default PostListAllScreen
