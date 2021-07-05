import React, { useEffect, useState } from "react"
import {
  SafeAreaView,
  FlatList,
  View,
  StyleSheet,
  RefreshControl,
  ImageBackground,
  TouchableNativeFeedback,
  Image,
} from "react-native"
import { ListItem, Text } from "react-native-elements"
import Moment from "moment"

import bgImage from "../../../../assets/bg.png"
import CardNotfound from "../../../components/CardNotfound"
import firebase from "../../../../util/firebase"
import { snapshotToArray } from "../../../../util"
import { AppConfig } from "../../../Constants"
import { getProvinceName } from "../../../data/apis"

import NoImage from "../../../../assets/avatar/1.png"

const AdminAllListScreen = ({ navigation, route }) => {
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
        memberInCloud.filter((item, index) => item.memberType === "partner")
      )
    })

    return () => ref.off("value", listener)
  }, [])

  const handleRefresh = () => {}

  const renderItem = ({ item }) => (
    <TouchableNativeFeedback style={{ backgroundColor: "red" }}>
      <ListItem
        bottomDivider
        containerStyle={{
          backgroundColor: null,
          borderRadius: 8,
          marginVertical: 5,
        }}
      >
        <ListItem.Content style={{ marginLeft: 10 }}>
          <Image
            source={item.image ? { uri: item.image } : NoImage}
            style={{ width: 100, height: 100 }}
          />
          <ListItem.Title>ชื่อสมาชิก: {item.name}</ListItem.Title>
          <ListItem.Title>เบอร์ติดต่อ: {item.mobile}</ListItem.Title>
          {item.type1 && (
            <ListItem.Title>
              โหมดงาน: {AppConfig.PartnerType.type1}
            </ListItem.Title>
          )}
          {item.type2 && (
            <ListItem.Title>
              โหมดงาน: {AppConfig.PartnerType.type2}
            </ListItem.Title>
          )}
          {item.type3 && (
            <ListItem.Title>
              โหมดงาน: {AppConfig.PartnerType.type3}
            </ListItem.Title>
          )}
          {item.type4 && (
            <View
              style={{
                borderWidth: 1,
                borderColor: "#bbb",
                padding: 5,
                marginVertical: 5,
              }}
            >
              <ListItem.Title>
                โหมดงาน: {AppConfig.PartnerType.type4}
              </ListItem.Title>
              <ListItem.Title>ราคา: {item.price4}</ListItem.Title>
            </View>
          )}
          <ListItem.Title>
            พื้นที่รับงาน: {getProvinceName(item.province)}
          </ListItem.Title>
          <View
            style={{
              padding: 5,
              borderWidth: 1,
              marginVertical: 5,
              borderColor: "#aaa",
            }}
          >
            <ListItem.Title>
              วันที่สมัคร:{" "}
              {Moment(item.sys_create_date).format("D/MM/YYYY HH:mm:ss")}
            </ListItem.Title>
            <ListItem.Title>
              ข้อมูลล่าสุด:{" "}
              {Moment(item.sys_update_date).format("D/MM/YYYY HH:mm:ss")}
            </ListItem.Title>
          </View>
        </ListItem.Content>
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
        <Text style={styles.textTopic}>รายงานสมัคร Partner</Text>
        <View style={styles.container}>
          {members.length === 0 && (
            <CardNotfound text="ไม่พบข้อมูล Partner ในระบบ" />
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
})

export default AdminAllListScreen