import React, { useRef, useState } from "react"
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Alert,
  ImageBackground,
  ScrollView,
  TouchableNativeFeedback,
} from "react-native"
import { Video } from "expo-av"
import { Button, Text } from "react-native-elements"
import { Ionicons, Feather, AntDesign } from "react-native-vector-icons"
import Moment from "moment"
import { ActivityIndicator } from "react-native-paper"

import bgImage from "../../../../assets/bg.png"
import { AppConfig } from "../../../Constants"
import firebase from "../../../../util/firebase"
import { getPartnerGroupByType } from "../../../data/apis"

const MemberDetailScreen = ({ navigation, route }) => {
  const { navigate } = navigation
  const { item } = route.params
  const video = useRef(null)
  const [status, setStatus] = useState({})
  const [images, setImages] = useState([])

  const confirmRemovePermanent = () => {
    firebase.database().ref(`members/${item.id}`).remove()
    navigate("List-All-Member")
  }

  const handleRemovePermanent = () => {
    Alert.alert(
      "ต้องการลบข้อมูลผู้ใช้ถาวร ใช่หรือไม่ ?",
      "กรุณายืนยันอีกครั้ง ถ้ากดลบข้อมูลจะไม่สามารถเรียกคืนได้อีก !!!",
      [
        {
          text: "ยืนยันการลบ",
          onPress: () => confirmRemovePermanent(),
        },
        {
          text: "ยกเลิก",
          onPress: () => console.log("No Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    )
  }

  const onPreviewImageList = (index) => {
    const images = [
      { props: { source: item.imageUrl1 } },
      { props: { source: item.imageUrl2 } },
      { props: { source: item.imageUrl3 } },
      { props: { source: item.imageUrl4 } },
      { props: { source: item.imageUrl5 } },
    ]
    navigate("Image-Preview", { index, images })
  }

  const approveMember = () => {
    // update status member
    firebase.database().ref(`members/${item.id}`).update({
      status: AppConfig.MemberStatus.active,
      statusText: AppConfig.MemberStatus.activeMessage,
      member_register_date: new Date().toUTCString(),
      member_update_date: new Date().toUTCString(),
    })
    navigation.navigate("List-All-Member")
  }

  const suspendMember = () => {
    // update status member
    firebase.database().ref(`members/${item.id}`).update({
      status: AppConfig.MemberStatus.suspend,
      statusText: AppConfig.MemberStatus.suspendMessage,
      member_update_date: new Date().toUTCString(),
    })
    navigation.navigate("List-All-Member")
  }

  const cancelSuspendMember = () => {
    // update status member
    firebase.database().ref(`members/${item.id}`).update({
      status: AppConfig.MemberStatus.active,
      statusText: AppConfig.MemberStatus.activeMessage,
      member_register_date: new Date().toUTCString(),
      member_update_date: new Date().toUTCString(),
    })
    navigation.navigate("List-All-Member")
  }

  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <SafeAreaView style={{ height: "100%" }}>
        <View style={styles.viewCard}>
          <View
            style={{ alignSelf: "center", marginTop: 20, marginBottom: 10 }}
          >
            <Text style={{ fontSize: 22 }}>แสดงรายละเอียดสมาชิก</Text>
          </View>
          {item.image && (
            <View style={{ alignItems: "center" }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {item.imageUrl1 && (
                  <TouchableNativeFeedback
                    onPress={() => onPreviewImageList(0)}
                  >
                    <View style={styles.mediaImageContainer}>
                      <Image
                        source={{ uri: item.imageUrl1 }}
                        style={styles.image}
                        resizeMode="cover"
                      />
                    </View>
                  </TouchableNativeFeedback>
                )}
                {item.imageUrl2 && (
                  <View style={styles.mediaImageContainer}>
                    <Image
                      source={{ uri: item.imageUrl2 }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  </View>
                )}
                {item.imageUrl3 && (
                  <View style={styles.mediaImageContainer}>
                    <Image
                      source={{ uri: item.imageUrl3 }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  </View>
                )}
                {item.imageUrl4 && (
                  <View style={styles.mediaImageContainer}>
                    <Image
                      source={{ uri: item.imageUrl4 }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  </View>
                )}
                {item.videoUrl && (
                  <View style={styles.mediaImageContainer}>
                    <Video
                      ref={video}
                      style={styles.video}
                      source={{ uri: item.videoUrl }}
                      useNativeControls
                      resizeMode="contain"
                      isLooping
                      onPlaybackStatusUpdate={(status) =>
                        setStatus(() => status)
                      }
                    >
                      <ActivityIndicator style={styles.video} size="large" />
                    </Video>
                  </View>
                )}
              </ScrollView>
            </View>
          )}
          {item.memberType === "partner" ? (
            <View
              style={{
                padding: 20,
                borderWidth: 1,
                borderRadius: 25,
                margin: 10,
              }}
            >
              <Text style={{ fontSize: 16 }}>
                ชื่อ: {item.name || item.username}
              </Text>
              <Text style={{ fontSize: 16 }}>
                รับงาน: {getPartnerGroupByType(item)}
              </Text>
              <Text style={{ fontSize: 16 }}>
                วันที่เป็นสมาชิก:{" "}
                {item.member_register_date
                  ? Moment(item.member_register_date).format("D MMM YYYY")
                  : "[ รออนุมัติ ]"}
              </Text>
              <Text style={{ fontSize: 16 }}>
                ระดับ Level: {item.customerLevel || 0}
              </Text>
              <Text style={{ fontSize: 16 }}>
                เบอร์ติดต่อ: {item.mobile || "[ ไม่พบข้อมูล ]"}
              </Text>
              <Text style={{ fontSize: 16 }}>สถานะ: {item.statusText}</Text>
            </View>
          ) : (
            <View
              style={{
                padding: 20,
                borderWidth: 1,
                borderRadius: 25,
                margin: 10,
              }}
            >
              <Text style={{ fontSize: 22 }}>
                ชื่อ: {item.name || item.username}
              </Text>
              <Text style={{ fontSize: 22 }}>
                ตำแหน่งงาน: ผู้ดูแลระบบ
              </Text>
            </View>
          )}
        </View>
        <View style={{ alignItems: "center" }}>
          {item.status === AppConfig.MemberStatus.newRegister && (
            <Button
              icon={
                <Feather
                  name="user-check"
                  size={24}
                  color="white"
                  style={{ marginRight: 5 }}
                />
              }
              iconLeft
              buttonStyle={{
                margin: 5,
                backgroundColor: "green",
                width: 250,
                borderRadius: 10,
              }}
              title="อนุมัติเป็น Partner"
              onPress={() => approveMember()}
            />
          )}
          {item.status && item.status !== AppConfig.MemberStatus.newRegister &&
            item.status !== AppConfig.MemberStatus.suspend && (
              <Button
                icon={
                  <AntDesign
                    name="deleteuser"
                    size={24}
                    color="white"
                    style={{ marginRight: 5 }}
                  />
                }
                iconLeft
                buttonStyle={{
                  margin: 5,
                  backgroundColor: "red",
                  width: 250,
                  borderRadius: 10,
                }}
                title="สั่งพักงาน"
                onPress={() => suspendMember()}
              />
            )}
          {item.status === AppConfig.MemberStatus.suspend && (
            <Button
              icon={
                <Ionicons
                  name="shield-checkmark-outline"
                  size={15}
                  color="white"
                  style={{ marginRight: 5 }}
                />
              }
              iconLeft
              buttonStyle={{
                margin: 5,
                backgroundColor: "blue",
                width: 250,
                borderRadius: 10,
              }}
              title="ยกเลิกสั่งพักงาน"
              onPress={() => cancelSuspendMember()}
            />
          )}
          <Button
            icon={
              <Ionicons
                name="trash-bin-outline"
                size={24}
                color="white"
                style={{ marginRight: 5 }}
              />
            }
            iconLeft
            buttonStyle={{
              margin: 5,
              backgroundColor: "red",
              width: 250,
              borderRadius: 10,
            }}
            title="ลบข้อมูลออกจากระบบ"
            onPress={() => handleRemovePermanent()}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  cardDetail: {
    flex: 1,
    padding: 5,
    margin: 10,
    alignSelf: "center",
  },
  optionsNameDetail: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginBottom: 15,
    marginTop: 10,
  },
  optionsNameDetail2: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginBottom: 15,
    marginTop: 10,
  },
  viewCard: {
    borderRadius: 20,
    padding: 5,
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  mediaImageContainer: {
    width: 250,
    height: 350,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  video: {
    alignSelf: "center",
    width: 350,
    height: 300,
    borderRadius: 25,
  },
})

export default MemberDetailScreen
