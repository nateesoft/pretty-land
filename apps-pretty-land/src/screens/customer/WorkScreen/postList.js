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

import firebase from "../../../../util/firebase"
import { snapshotToArray } from "../../../../util"

import bgImage from "../../../../assets/bg.png"

const PostListScreen = ({ navigation, route }) => {
  const { userId } = route.params
  const [refreshing, setRefreshing] = useState(false)
  const [filterList, setFilterList] = useState([])

  const handleRefresh = () => {}

  const onPressOptions = (item, status) => {
    if (status === "wait_customer_select_partner") {
      navigation.navigate("Partner-List-Select", { postItem: item, userId })
    } else if (status === "wait_customer_payment") {
      navigation.navigate("Payment-Form", { item, userId })
    } else {
      navigation.navigate("Review-Task", { item, userId })
    }
  }

  const getBgColor = (status) => {
    if (status === "customer_new_post_done") {
      return "#fdddf3"
    } else if (status === "admin_confirm_new_post") {
      return "#fef8e3"
    } else if (status === "wait_customer_select_partner") {
      return "#fcf2ff"
    } else if (status === "wait_customer_payment") {
      return "#fff0ee"
    } else if (status === "wait_admin_confirm_payment") {
      return "#fdddf3"
    } else if (status === "customer_with_partner") {
      return "#fef8e3"
    }
    return "#fcf2ff"
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
        <ListItem.Subtitle>ประเภท: {item.partnerRequest}</ListItem.Subtitle>
        <ListItem.Subtitle>จังหวัด: {item.provinceName}</ListItem.Subtitle>
        <ListItem.Subtitle>
          จำนวนที่ต้องการ: {item.partnerQty} คน
        </ListItem.Subtitle>
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
    const ref = firebase.database().ref(`posts`).orderByChild(userId)
    const listener = ref.on("value", (snapshot) => {
      const postsList = snapshotToArray(snapshot)
      setFilterList(postsList)
    })
    return () => ref.off("value", listener)
  }, [])

  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <View style={styles.container}>
        <Text style={styles.textTopic}>แสดงรายการที่โพสท์</Text>
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
          <Text
            style={{
              textAlign: "center",
            }}
          >
            ไม่พบข้อมูลการโพสท์
          </Text>
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

export default PostListScreen
