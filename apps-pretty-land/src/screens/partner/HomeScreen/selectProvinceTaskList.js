import React, { useState } from "react"
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
import Moment from "moment"

import { getProvinceName } from "../../../data/apis"
import CardNotfound from "../../../components/CardNotfound"
import bgImage from "../../../../assets/bg.png"

const SelectProvinceTaskList = ({ navigation, route }) => {
  const { item, profile, taskList } = route.params

  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {}

  const onPressOptions = (postDetail) => {
    navigation.navigate("Task-Detail", { profile, postDetail })
  }

  const renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      onPress={() => onPressOptions(item)}
      containerStyle={{
        backgroundColor: null,
        borderRadius: 8,
        marginVertical: 5,
      }}
    >
      <ListItem.Content style={{ margin: 10 }}>
        <ListItem.Title
          style={{
            marginBottom: 5,
          }}
        >
          จำนวนPartner ที่ต้องการ: {item.partnerWantQty || 0} คน
        </ListItem.Title>
        <ListItem.Title
          style={{
            marginBottom: 5,
          }}
        >
          ลูกค้า: {item.customerName}
        </ListItem.Title>
        <ListItem.Title
          style={{
            marginBottom: 5,
          }}
        >
          ระดับ: {item.customerLevel}
        </ListItem.Title>
        <ListItem.Title
          style={{
            marginBottom: 5,
          }}
        >
          สถานที่: {item.placeMeeting}
        </ListItem.Title>
        <ListItem.Title
          style={{
            marginBottom: 5,
          }}
        >
          เริ่ม: {item.startTime}, เลิก: {item.stopTime}
        </ListItem.Title>
        <ListItem.Title
          style={{
            marginBottom: 5,
          }}
        >
          รายละเอียดเพิ่มเติม: {item.customerRemark}
        </ListItem.Title>
        <ListItem.Title
          style={{
            marginBottom: 5,
          }}
        >
          วันที่โพสท์:{" "}
          {Moment(item.sys_create_date).format("D MMM YYYY HH:mm:ss")}
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
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <SafeAreaView style={{ height: "100%" }}>
        <Text style={styles.textTopic}>โพสท์ทั้งหมดในระบบ</Text>
        <View
          style={{
            backgroundColor: "chocolate",
            alignItems: "center",
            width: "100%",
            height: 30,
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>
            โหมด: {item.name}
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 20 }}>
            จังหวัด: {getProvinceName(profile.province)}
          </Text>
        </View>
        <View style={styles.container}>
          {taskList.length === 0 && (
            <CardNotfound text="ไม่พบข้อมูลโพสท์ในระบบ" />
          )}
          {taskList.length > 0 && (
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              data={taskList}
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
  textTopic: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    backgroundColor: "#ff2fe6",
    padding: 10,
  },
  textDetail: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    backgroundColor: "#ff2fe6",
    padding: 10,
  },
})

export default SelectProvinceTaskList
