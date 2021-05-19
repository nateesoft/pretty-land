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

import { getPostList } from "../../../data/apis"

const PostListScreen = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = React.useState(false)

  const filterList = getPostList().filter((item) => {
    return item.customer === "A"
  })

  const handleRefresh = () => {
    console.log("refresh data list")
  }

  const onPressOptions = (item, status) => {
    if (status === "wait_customer_select_partner") {
      navigation.navigate("Partner-List-Select", { item })
    } else if (status === "wait_customer_payment") {
      navigation.navigate("Payment-Form", { item })
    } else {
      navigation.navigate("Review-Task", { item })
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

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      onPress={() => onPressOptions(item, item.status)}
      containerStyle={{
        backgroundColor: getBgColor(item.status),
        borderRadius: 8,
        marginVertical: 5,
      }}
    >
      <Avatar source={item.image} size={128} />
      <ListItem.Content style={{ marginLeft: 10 }}>
        <ListItem.Title>ชื่อโพสท์: {item.name}</ListItem.Title>
        <ListItem.Subtitle>ประเภท: {item.partnerRequest}</ListItem.Subtitle>
        <ListItem.Subtitle>จังหวัด: {item.province}</ListItem.Subtitle>
        <ListItem.Subtitle>
          จำนวนที่ต้องการ: {item.partnerQtyRequest} คน
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

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.textTopic}>แสดงรายการที่โพสท์</Text>
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
        {filterList.length === 0 && (
          <Text
            style={{
              fontSize: 28,
              textAlign: "center",
              paddingVertical: 100,
              backgroundColor: "white",
            }}
          >
            ไม่พบข้อมูลการโพสท์
          </Text>
        )}
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
})

export default PostListScreen
