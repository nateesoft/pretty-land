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
import DropDownPicker from "react-native-dropdown-picker"

import bgImage from "../../../../assets/bg.png"
import CardNotfound from "../../../components/CardNotfound"
import { getPostStatus } from "../../../data/apis"

import firebase from "../../../../util/firebase"
import { snapshotToArray } from "../../../../util"

const PostListAllScreen = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = useState(false)
  const [posts, setPosts] = useState([])
  const [openSelectPartner, setOpenSelectPartner] = useState(false)
  const [partner, setPartner] = useState("")
  const [partnerList, setPartnerList] = useState(getPostStatus())

  const handleRefresh = () => {}

  const onPressOptions = (item, status) => {
    if (status === "wait_admin_confirm_payment") {
      navigation.navigate("Verify-Payment-Slip", { item })
    } else {
      navigation.navigate("Detail-Task", { item })
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
      <ListItem.Content style={{ marginLeft: 10 }}>
        <ListItem.Title>ชื่อลูกค้า: {item.customerName}</ListItem.Title>
        <ListItem.Title>Level: {item.customerLevel}</ListItem.Title>
        <ListItem.Subtitle>
          ประเภทที่ต้องการ: {item.partnerRequest}
        </ListItem.Subtitle>
        <ListItem.Subtitle>จำนวน: {item.partnerQty}</ListItem.Subtitle>
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
    const ref = firebase.database().ref(`posts`)
    const listener = ref.on("value", (snapshot) => {
      const postsList = snapshotToArray(snapshot)
      setPosts(postsList)
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
          <Text style={styles.textTopic}>โพสท์ทั้งหมดในระบบ</Text>
          <View style={{ width: "90%", alignSelf: "center", zIndex: 1 }}>
            <DropDownPicker
              placeholder="เลือกประเภทโพสท์"
              open={openSelectPartner}
              setOpen={setOpenSelectPartner}
              value={partner}
              setValue={setPartner}
              items={partnerList}
              setItems={setPartnerList}
              textStyle={{ fontSize: 18 }}
              zIndex={2}
              searchable={false}
              selectedItemContainerStyle={{ backgroundColor: "#facaff" }}
            />
          </View>
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
    padding: 5,
  },
  textTopic: {
    fontSize: 24,
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

export default PostListAllScreen
