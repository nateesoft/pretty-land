import React from "react"
import {
  SafeAreaView,
  FlatList,
  View,
  StyleSheet,
  Image,
  RefreshControl,
} from "react-native"
import { ListItem, Text } from "react-native-elements"
import ProgressCircle from "react-native-progress-circle"

import { getPostToPartnerList } from "../../../data/apis"

const AllCustomerPostList = ({ navigation, route }) => {
  const { item } = route.params
  const [refreshing, setRefreshing] = React.useState(false)

  const filterList = getPostToPartnerList(item.provinceId)

  const handleRefresh = () => {
    console.log("refresh data list")
  }

  const onPressOptions = (item) => {
    navigation.navigate("Task-Detail", { item })
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
      onPress={() => onPressOptions(item)}
      containerStyle={{
        backgroundColor: getBgColor(item.status),
        borderRadius: 8,
        marginVertical: 5,
      }}
    >
      <ListItem.Content style={{ margin: 10 }}>
        <ListItem.Title
          style={{
            fontSize: 20,
            marginBottom: 5,
          }}
        >
          ลูกค้า: {item.customer}
        </ListItem.Title>
        <ListItem.Title style={{ marginBottom: 5 }}>
          ชื่องาน: {item.name}
        </ListItem.Title>
        <ListItem.Title style={{ marginBottom: 5 }}>
          level: {item.customerLevel}
        </ListItem.Title>
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
        <Text style={styles.textTopic}>งานว่าจ้างทั้งหมดในระบบ</Text>
        <Text style={styles.textTopicDetail}>จังหวัด {item.province}</Text>
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

export default AllCustomerPostList
