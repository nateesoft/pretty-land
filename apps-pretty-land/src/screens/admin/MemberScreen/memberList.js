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

import { getMemberList, getMemberCategory } from "../../../data/apis"

const PostListToConfirmScreen = ({ navigation, route }) => {
  const { partnerType } = route.params
  const [refreshing, setRefreshing] = React.useState(false)

  const [openSelectPartner, setOpenSelectPartner] = React.useState(false)
  const [partner, setPartner] = React.useState("")
  const [partnerList, setPartnerList] = React.useState(getMemberCategory())

  const filterList = getMemberList().filter((item) => {
    if (partnerType === "all") {
      return item
    }
    return item.partnerType === partnerType
  })

  const handleRefresh = () => {
    console.log("refresh data list")
  }

  const onPressOptions = (item, status) => {
    navigation.navigate("Member-Detail")
  }

  const getBgColor = (status) => {
    if (status === "admin") {
      return "#fdddf3"
    } else if (status === "customer") {
      return "#fef8e3"
    } else if (status === "partner") {
      return "#fcf2ff"
    }
    return "#fcf2ff"
  }

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      onPress={() => onPressOptions(item, item.status)}
      containerStyle={{
        backgroundColor: getBgColor(item.memberType),
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
        <Text style={styles.textTopic}>ผู้ใช้งานในระบบทั้งหมด</Text>
        <DropDownPicker
          placeholder="เลือกประเภทสมาชิก"
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
  dropdownStyle: {
    marginBottom: 10,
    borderColor: "#ff2fe6",
    borderWidth: 1.5,
  },
})

export default PostListToConfirmScreen
