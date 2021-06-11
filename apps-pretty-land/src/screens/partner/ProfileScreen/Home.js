import React, { useRef, useEffect, useState, useContext } from "react"
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableNativeFeedback,
  LogBox,
  ImageBackground,
} from "react-native"
import { Video } from "expo-av"
import {
  FontAwesome,
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons"
import { ActivityIndicator } from "react-native-paper"
import Moment from "moment"

import { AppConfig } from "../../../Constants"
import firebase from "../../../../util/firebase"
import { Context as AuthContext } from "../../../context/AuthContext"

import bgImage from "../../../../assets/bg.png"
import FemaleSimple from "../../../../assets/avatar/1.png"
import MaleSimple from "../../../../assets/avatar/2.png"
import OtherSimple from "../../../../assets/avatar/3.png"
import { Button } from "react-native-elements"

const ProfileHomeScreen = ({ navigation, route }) => {
  const { signOut } = useContext(AuthContext)

  const { navigate } = navigation
  const { userId } = route.params
  const video = useRef(null)
  const [status, setStatus] = useState({})

  const [userStatus, setUserStatus] = useState("")
  const [imageProfile, setImageProfile] = useState(null)
  const [name, setName] = useState("")
  const [memberRegisterDate, setMemberRegisterDate] = useState("")
  const [mobile, setMobile] = useState("")
  const [lineId, setLineId] = useState("")

  const [img1, setImg1] = useState(null)
  const [img2, setImg2] = useState(null)
  const [img3, setImg3] = useState(null)
  const [img4, setImg4] = useState(null)
  const [img5, setImg5] = useState(null)
  const [videoUrl, setVideoUrl] = useState(null)

  LogBox.ignoreLogs(["Setting a timer"])

  const handleEditForm = () => {
    navigate("Register-Plan-Form")
  }

  useEffect(() => {
    const onChangeValue = firebase
      .database()
      .ref(`members/${userId}`)
      .on("value", (snapshot) => {
        const data = { ...snapshot.val() }
        if (!data.image) {
          if (data.sex === "female") {
            setImageProfile(FemaleSimple)
          } else if (data.sex === "male") {
            setImageProfile(MaleSimple)
          } else if (data.sex === "other") {
            setImageProfile(OtherSimple)
          } else {
            setImageProfile(FemaleSimple)
          }
        } else {
          setImageProfile({ uri: data.image })
        }
        setName(data.name || data.username)
        setMobile(data.mobile || "<ไม่กำหนด>")
        setLineId(data.lineId || "<ไม่กำหนด>")
        setImg1(data.imageUrl1 || null)
        setImg2(data.imageUrl2 || null)
        setImg3(data.imageUrl3 || null)
        setImg4(data.imageUrl4 || null)
        setImg5(data.imageUrl5 || null)
        setVideoUrl(data.videoUrl || null)
        setUserStatus(data.status || "")
        setMemberRegisterDate(
          data.member_register_date
            ? Moment(data.member_register_date).format("D MMM YYYY")
            : "รออนุมัติข้อมูล"
        )
      })

    // return () =>
    //   firebase.database().ref(`members/${userId}`).off("value", onChangeValue)
  }, [])

  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableNativeFeedback onPress={() => signOut()}>
            <View style={{ alignSelf: "flex-end", margin: 10 }}>
              <Text
                style={[
                  styles.text,
                  { color: "red", fontSize: 14, fontWeight: "bold" },
                ]}
              >
                LOGGOUT
              </Text>
            </View>
          </TouchableNativeFeedback>
          <View style={{ alignSelf: "center" }}>
            <View style={styles.profileImage}>
              <Image
                source={imageProfile}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <TouchableNativeFeedback onPress={handleEditForm}>
              <View style={styles.edit}>
                <Feather name="edit" size={32} color="#fff" />
              </View>
            </TouchableNativeFeedback>
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
              {name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "baseline",
                marginTop: 10,
                alignSelf: "flex-start",
              }}
            >
              <FontAwesome
                name="phone"
                size={16}
                color="#aeb5bc"
                style={{ marginRight: 10 }}
              />
              <Text
                style={[
                  styles.text,
                  { color: "#bbb", fontSize: 14, marginRight: 10 },
                ]}
              >
                {mobile}
              </Text>
              <FontAwesome5
                name="line"
                size={16}
                color="#aeb5bc"
                style={{ marginRight: 10 }}
              />
              <Text style={[styles.text, { color: "#bbb", fontSize: 14 }]}>
                {lineId}
              </Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 24 }]}>0</Text>
              <Text style={[styles.text, styles.subText]}>
                งานที่รับทั้งหมด
              </Text>
            </View>
            <View
              style={[
                styles.statsBox,
                {
                  borderColor: "#ccc",
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                },
              ]}
            >
              <Text style={[styles.text, { fontSize: 24, fontWeight: "bold" }]}>
                0
              </Text>
              <Text
                style={[styles.text, styles.subText, { fontWeight: "bold" }]}
              >
                คะแนนสะสม
              </Text>
            </View>
            <View style={styles.statsBox}>
              <Text
                style={[
                  styles.text,
                  { fontSize: 12, marginBottom: 5, color: "blue" },
                ]}
              >
                {memberRegisterDate}
              </Text>
              <Text style={[styles.text, styles.subText]}>วันที่เริ่มงาน</Text>
            </View>
          </View>

          {videoUrl && (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                padding: 10,
                marginTop: 10,
                alignSelf: "center",
              }}
            >
              <Video
                ref={video}
                style={styles.video}
                source={{ uri: videoUrl }}
                useNativeControls
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              >
                <ActivityIndicator style={styles.video} size="large" />
              </Video>
            </View>
          )}

          {!img1 && !img2 && !img3 && !img4 && !img5 && !videoUrl && (
            <View style={{ alignItems: "center", margin: 50 }}>
              <Text style={{ fontSize: 20 }}>
                ยังไม่พบข้อมูล/รูปภาพ และวิดีโอ
              </Text>
              <Button
                title="เพิ่มรูปภาพ/วิดีโอ"
                buttonStyle={{
                  backgroundColor: "chocolate",
                  margin: 20,
                  borderRadius: 10,
                  padding: 15,
                }}
                icon={
                  <MaterialCommunityIcons
                    name="card-account-details-star-outline"
                    size={24}
                    color="white"
                    style={{ marginRight: 10 }}
                  />
                }
                onPress={() => navigate("Register-Plan-Form")}
              />
            </View>
          )}

          <View style={{ marginTop: 32 }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {img2 && (
                <View style={styles.mediaImageContainer}>
                  <Image
                    source={{ uri: img2 }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
              )}
              {img3 && (
                <View style={styles.mediaImageContainer}>
                  <Image
                    source={{ uri: img3 }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
              )}
              {img4 && (
                <View style={styles.mediaImageContainer}>
                  <Image
                    source={{ uri: img4 }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
              )}
              {img5 && (
                <View style={styles.mediaImageContainer}>
                  <Image
                    source={{ uri: img5 }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
              )}
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: "#52575D",
  },
  subText: {
    fontSize: 12,
    color: "#aeb5bc",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },
  profileImage: {
    marginTop: 10,
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    overflow: "hidden",
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  edit: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
  statsContainer: {
    alignItems: "baseline",
    flexDirection: "row",
    marginTop: 32,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  mediaCount: {
    backgroundColor: "#41444b",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0,0,0,0.38)",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    opacity: 1,
  },
  video: {
    alignSelf: "center",
    width: 350,
    height: 300,
    borderRadius: 25,
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
})

export default ProfileHomeScreen
