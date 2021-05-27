import React, { useEffect, useState } from "react"
import {
  SafeAreaView,
  FlatList,
  View,
  StyleSheet,
  Image,
  RefreshControl,
  ImageBackground,
  TouchableNativeFeedback,
} from "react-native"
import { ListItem, Avatar, Text } from "react-native-elements"
import ProgressCircle from "react-native-progress-circle"
import DropDownPicker from "react-native-dropdown-picker"

import bgImage from "../../../../assets/bg.png"
import CardNotfound from "../../../components/CardNotfound"
import firebase from "../../../../util/firebase"
import { snapshotToArray } from "../../../../util"
import { getMemberCategory } from "../../../data/apis"

const MemberAllListScreen = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = React.useState(false)
  const [openSelectPartner, setOpenSelectPartner] = React.useState(false)
  const [partner, setPartner] = React.useState("")
  const [partnerList, setPartnerList] = React.useState(getMemberCategory())
  const [members, setMembers] = useState([])

  useEffect(() => {
    const onChangeValue = firebase
      .database()
      .ref("members")
      .on("value", (snapshot) => {
        const memberInCloud = snapshotToArray(snapshot)
        setMembers(
          memberInCloud.filter(
            (item, index) => item.memberType !== "superadmin"
          )
        )
      })

    return () => firebase.database().ref("members").off("value", onChangeValue)
  }, [])

  const handleRefresh = () => {
    console.log("refresh data list")
  }

  const onPressOptions = (item) => {
    navigation.navigate("Member-Detail", { item })
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

  const renderItem = ({ item }) => (
    <TouchableNativeFeedback
      onPress={() => onPressOptions(item)}
      style={{ backgroundColor: "red" }}
    >
      <ListItem
        bottomDivider
        containerStyle={{
          backgroundColor: null,
          borderRadius: 8,
          marginVertical: 5,
        }}
      >
        {item.image ? <Avatar source={{ uri: item.image }} size={128} /> : null}
        <ListItem.Content style={{ marginLeft: 10 }}>
          <ListItem.Title>
            ชื่อสมาชิก: {item.name || item.username}
          </ListItem.Title>
          <ListItem.Subtitle>ประเภทสมาชิก: {item.memberType}</ListItem.Subtitle>
          <ListItem.Subtitle>สถานะ: {item.statusText}</ListItem.Subtitle>
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
    </TouchableNativeFeedback>
  )

  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <SafeAreaView style={{ height: "100%" }}>
        <View style={styles.container}>
          <Text style={styles.textTopic}>ผู้ใช้งานในระบบทั้งหมด</Text>
          <View style={{ width: "90%", alignSelf: "center" }}>
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
              searchable={false}
            />
          </View>
          {members.length === 0 && (
            <CardNotfound text="ไม่พบข้อมูลสมาชิกในระบบ" />
          )}
          {members.length > 0 && (
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              data={members}
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
  dropdownStyle: {
    marginBottom: 10,
    borderColor: "#ff2fe6",
    borderWidth: 1.5,
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
})

export default MemberAllListScreen
