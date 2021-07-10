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
import { ListItem, Avatar, Text } from "react-native-elements"
import ProgressCircle from "react-native-progress-circle"

import bgImage from "../../../../assets/bg.png"
import CardNotfound from "../../../components/CardNotfound"
import firebase from "../../../../util/firebase"
import { snapshotToArray } from "../../../../util"
import { getPartnerGroupByType } from "../../../data/apis"

import FemaleSimple from "../../../../assets/avatar/1.png"
import MaleSimple from "../../../../assets/avatar/2.png"
import OtherSimple from "../../../../assets/avatar/3.png"

const MemberAllListScreen = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = useState(false)
  const [members, setMembers] = useState([])

  useEffect(() => {
    const ref = firebase
      .database()
      .ref("members")
      .orderByChild("status_priority")
    const listener = ref.on("value", (snapshot) => {
      const memberInCloud = snapshotToArray(snapshot)
      setMembers(
        memberInCloud.filter(
          (item, index) =>
            item.memberType !== "superadmin" &&
            item.memberType !== "admin" &&
            item.memberType !== "demo"
        )
      )
    })

    return () => ref.off("value", listener)
  }, [])

  const handleRefresh = () => {}

  const onPressOptions = (item) => {
    navigation.navigate("Member-Detail", { item })
  }

  const renderItem = ({ item }) =>
    item.memberType === "partner" ? (
      <ListItem
        bottomDivider
        containerStyle={{
          backgroundColor: null,
          borderRadius: 8,
          marginVertical: 5,
        }}
        onPress={() => onPressOptions(item)}
        underlayColor="pink"
      >
        {item.image ? (
          <Avatar source={{ uri: item.image }} size={128} />
        ) : (
          <View>
            <Image
              source={
                item.sex === "female"
                  ? FemaleSimple
                  : item.sex === "male"
                  ? MaleSimple
                  : OtherSimple
              }
              style={styles.images}
              resizeMode="cover"
            />
            <Text style={styles.noImageText}>No Image</Text>
          </View>
        )}
        <ListItem.Content style={{ marginLeft: 10 }}>
          <ListItem.Title>
            ชื่อสมาชิก: {item.name || item.username}
          </ListItem.Title>
          <ListItem.Subtitle
            style={{
              borderWidth: 1,
              padding: 5,
              borderRadius: 10,
              borderColor: "#aaa",
              marginVertical: 5,
            }}
          >
            รับงาน: {getPartnerGroupByType(item)}
          </ListItem.Subtitle>
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
    ) : (
      <ListItem
        bottomDivider
        containerStyle={{
          backgroundColor: null,
          borderRadius: 8,
          marginVertical: 5,
        }}
        onPress={() => onPressOptions(item)}
        underlayColor="pink"
      >
        {item.image ? (
          <Avatar source={{ uri: item.image }} size={128} />
        ) : (
          <View
            style={{
              width: 130,
              height: 130,
              borderWidth: 1,
              padding: 10,
              borderColor: "#aaa",
            }}
          >
            <Text style={{ alignSelf: "center" }}>No Image</Text>
          </View>
        )}
        <ListItem.Content style={{ marginLeft: 10 }}>
          <ListItem.Title>
            ชื่อ: {item.name || item.username || item.profile || item.email}
          </ListItem.Title>
          <ListItem.Subtitle style={{ fontSize: 16, fontWeight: "bold" }}>
            {item.memberType === "customer" ? (
              <View style={{ marginBottom: 5 }}>
                <Text>ลูกค้าใช้งาน</Text>
              </View>
            ) : (
              <View style={{ marginBottom: 5 }}>
                <Text>ผู้ดูแลระบบ</Text>
              </View>
            )}
          </ListItem.Subtitle>
          <ListItem.Subtitle style={{ fontSize: 16, fontWeight: "bold" }}>
            {item.memberType === "customer" ? (
              item.customerType === "facebook" ? (
                <View style={styles.tagFacebookLabel}>
                  <Text style={{ color: "white" }}>
                    เข้าระบบด้วย: {item.customerType}
                  </Text>
                </View>
              ) : item.customerType === "line" ? (
                <View style={styles.tagLineLabel}>
                  <Text>เข้าระบบด้วย: {item.customerType}</Text>
                </View>
              ) : item.customerType === "apple" ? (
                <View style={styles.tagAppleLabel}>
                  <Text>เข้าระบบด้วย: {item.customerType}</Text>
                </View>
              ) : (
                <Text>ทาง: อื่น ๆ</Text>
              )
            ) : (
              <Text></Text>
            )}
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
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <SafeAreaView style={{ height: "100%" }}>
        <Text style={styles.textTopic}>รายชื่อสมาชิก</Text>
        <View style={styles.container}>
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
  images: { width: 128, height: 128, flex: 1 },
  noImageText: {
    position: "absolute",
    bottom: 10,
    backgroundColor: "orange",
    padding: 5,
  },
  tagLineLabel: {
    backgroundColor: "#35d00D",
    marginTop: 5,
    paddingHorizontal: 5,
  },
  tagFacebookLabel: {
    backgroundColor: "blue",
    marginTop: 5,
    paddingHorizontal: 5,
  },
  tagAppleLabel: {
    backgroundColor: "white",
    marginTop: 5,
    paddingHorizontal: 5,
  },
})

export default MemberAllListScreen
