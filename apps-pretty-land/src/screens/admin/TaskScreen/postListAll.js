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
import DropDownPicker from "react-native-dropdown-picker"

import { getPostList, getPostStatus } from "../../../data/apis"

const PostListAllScreen = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = React.useState(false)

  const [openSelectPartner, setOpenSelectPartner] = React.useState(false)
  const [partner, setPartner] = React.useState("")
  const [partnerList, setPartnerList] = React.useState(getPostStatus())

  const filterList = getPostList().filter((item) => {
    return item;
  })

  const handleRefresh = () => {
    console.log("refresh data list")
  }

  const onPressOptions = (item, status) => {
    if (status === "wait_admin_confirm_payment") {
      navigation.navigate("Verify-Payment-Slip")
    } else {
      navigation.navigate("Detail-Task", { item })
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
        <ListItem.Title>ชื่อลูกค้า: {item.customer}</ListItem.Title>
        <ListItem.Subtitle>ชื่อโพสท์: {item.name}</ListItem.Subtitle>
        <ListItem.Subtitle>ประเภทที่ต้องการ: {item.partnerRequest}</ListItem.Subtitle>
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
        <Text style={styles.textTopic}>โพสท์ทั้งหมดในระบบ</Text>
        <DropDownPicker
          placeholder="เลือกประเภทโพสท์"
          open={openSelectPartner}
          setOpen={setOpenSelectPartner}
          value={partner}
          setValue={setPartner}
          items={partnerList}
          setItems={setPartnerList}
          style={styles.dropdownStyle}
          textStyle={{ fontSize: 18 }}
          zIndex={2}
        />
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

export default PostListAllScreen
