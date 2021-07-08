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

import bgImage from "../../../../assets/bg.png"
import CardNotfound from "../../../components/CardNotfound"
import firebase from "../../../../util/firebase"
import { snapshotToArray } from "../../../../util"

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
        memberInCloud.filter(
          (item, index) =>
            item.memberType === "superadmin" || item.memberType === "admin"
        )
      )
    })

    return () => ref.off("value", listener)
  }, [])

  const handleRefresh = () => {}

  const onPressOptions = (item) => {
    navigation.navigate("Admin-Detail", { item })
  }

  const renderItem = ({ item }) => (
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
      <ListItem.Content style={{ marginLeft: 10 }}>
        <ListItem.Title>
          ชื่อสมาชิก: {item.name || item.username}
        </ListItem.Title>
        <ListItem.Subtitle style={{ fontSize: 20, fontWeight: "bold" }}>
          ผู้ดูแลระบบ
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
        <Text style={styles.textTopic}>Admin ในระบบทั้งหมด</Text>
        <View style={styles.container}>
          {/* <View style={{ width: "90%", alignSelf: "center", zIndex: 1 }}>
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
              searchable={false}
              selectedItemContainerStyle={{ backgroundColor: "#facaff" }}
            />
          </View> */}
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
