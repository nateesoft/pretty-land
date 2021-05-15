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
import { Button } from "react-native-elements/dist/buttons/Button"
import { Entypo } from "@expo/vector-icons"
import ProgressCircle from "react-native-progress-circle"

import { getPostList } from "../../../data/apis"

const PostListScreen = ({ navigation, route }) => {
  const { partnerType } = route.params
  const [refreshing, setRefreshing] = React.useState(false);

  const filterList = getPostList().filter((item) => {
    if (partnerType === "all") {
      return item
    }
    return item.partnerType === partnerType
  })

  const handleRefresh = () => {
    console.log('refresh data list');
  }

  const onPressOptions = (item, status) => {
    if (status === "wait_customer_select_partner") {
      navigation.navigate("Partner-List-Select", { item })
    } else if (status === "wait_customer_payment") {
      navigation.navigate("Payment-Form")
    } else {
      navigation.navigate("Review-Task", { status })
    }
  }

  const getBgColor = (status) => {
    if (status === "customer_new_post_done") {
      return "#fdddf3"
    } else if (status === "wait_admin_confirm_new_post") {
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

  const createNewPost = () => {
    navigation.navigate("Create-New-Post", {
      data: {},
      item: {},
    })
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
      <Avatar source={item.image} size={64} />
      <ListItem.Content style={{ marginLeft: 10 }}>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
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

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.textTopic}>แสดงรายการที่โพสท์</Text>
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
            <RefreshControl refreshing={refreshing} onRefresh={()=>handleRefresh()} />
          }
        />
      </View>
      <View style={{ alignItems: "center", backgroundColor: "white" }}>
        <Button
          icon={
            <Entypo
              name="new-message"
              color="white"
              size={24}
              style={{ marginHorizontal: 8 }}
            />
          }
          title="เขียน POST ใหม่"
          buttonStyle={styles.btnNewPost}
          onPress={() => createNewPost()}
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
