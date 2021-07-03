import React, { useState, useRef, useEffect } from "react"
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableNativeFeedback,
  ImageBackground,
} from "react-native"
// import { Video } from "expo-av"
import { AntDesign } from "@expo/vector-icons"
import { Button } from "react-native-elements/dist/buttons/Button"
import * as Progress from "react-native-progress"
import { AirbnbRating } from "react-native-elements"

import firebase from "../../../../util/firebase"
import { AppConfig } from "../../../Constants"
import bgImage from "../../../../assets/bg.png"

export default function PartnerImage({ navigation, route }) {
  const { postItem, partnerItem } = route.params

  const video = useRef(null)
  const [status, setStatus] = useState({})
  const [partnerProfile, setPartnerProfile] = useState({})
  const [selectStatus, setSelectStatus] = useState("")
  const [images, setImages] = useState([])

  const [starCount, setStarCount] = useState(0)
  const [rate5, setRate5] = useState(0)
  const [rate4, setRate4] = useState(0)
  const [rate3, setRate3] = useState(0)
  const [rate2, setRate2] = useState(0)
  const [rate1, setRate1] = useState(0)

  const onPressSelectPartner = () => {
    firebase
      .database()
      .ref(`posts/${postItem.id}/partnerSelect/${partnerItem.partnerId}`)
      .update({
        selectStatus: AppConfig.PostsStatus.customerConfirm,
        selectStatusText: "ลูกค้าคอนเฟิร์ม รอชำระเงิน",
        sys_create_date: new Date().toUTCString(),
      })
    navigation.navigate("Partner-List-Select")
  }

  const onPreviewImageList = (index) => {
    navigation.navigate("Image-Preview", { index, images })
  }

  const ProgressBar = ({ rate, title }) => {
    return (
      <View style={{ flex: 1, flexDirection: "row", alignItems: "baseline" }}>
        <Text style={{ color: "white", marginRight: 5 }}>{title}</Text>
        <Progress.Bar
          progress={rate}
          width={200}
          color="green"
          style={styles.progress}
        />
      </View>
    )
  }

  const getStarFromPosts = (snapshot) => {
    return new Promise((resolve, reject) => {
      let count = 0
      let point = 0

      let r5 = 0
      let r4 = 0
      let r3 = 0
      let r2 = 0
      let r1 = 0

      snapshot.forEach((item) => {
        count = count + 1
        const data = { ...item.val() }
        console.log(data)
        if (data.star === 5) {
          r5 = r5 + 1
        }
        if (data.star === 4) {
          r4 = r4 + 1
        }
        if (data.star === 3) {
          r3 = r3 + 1
        }
        if (data.star === 2) {
          r2 = r2 + 1
        }
        if (data.star === 1) {
          r1 = r1 + 1
        }
        if (data.star) {
          point = point + data.star
        }
      })
      setStarCount(point / count)
      setRate5(r5 / count)
      setRate4(r4 / count)
      setRate3(r3 / count)
      setRate2(r2 / count)
      setRate1(r1 / count)

      resolve(true)
    })
  }

  useEffect(() => {
    const ref = firebase.database().ref(`members/${partnerItem.partnerId}`)
    ref.once("value", (snapshot) => {
      const data = { ...snapshot.val() }
      setPartnerProfile(data)
      setImages([
        { url: data.imageUrl1 || null },
        { url: data.imageUrl2 || null },
        { url: data.imageUrl3 || null },
        { url: data.imageUrl4 || null },
        { url: data.imageUrl5 || null },
      ])
    })
  }, [])

  useEffect(() => {
    const ref = firebase
      .database()
      .ref(`posts/${postItem.id}/partnerSelect/${partnerItem.partnerId}`)
    ref.once("value", (snapshot) => {
      const partnerStatusSelect = { ...snapshot.val() }
      setSelectStatus(partnerStatusSelect.selectStatus)
    })
  }, [])

  useEffect(() => {
    const ref = firebase.database().ref(`partner_star/${partnerItem.partnerId}`)
    ref.once("value", (snapshot) => {
      if (snapshot.numChildren()) {
        getStarFromPosts(snapshot).then((result) => {
          console.log(result)
        })
      }
    })
  }, [])

  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Text style={{ fontSize: 20, color: "green", fontWeight: "bold" }}>
            รายละเอียด Partner
          </Text>
          <View
            style={{
              alignItems: "center",
              padding: 10,
              marginTop: 10,
              borderWidth: 2.5,
              borderColor: "#ff2fe6",
              width: 350,
              borderRadius: 25,
            }}
          >
            <Text style={{ fontSize: 16 }}>
              ชื่อสมาชิก: {partnerProfile.name}
            </Text>
            <Text style={{ fontSize: 16 }}>
              สัดส่วน {partnerProfile.stature} สูง {partnerProfile.height}
            </Text>
            <Text style={{ fontSize: 16 }}>
              ราคาที่เสนอ: {partnerItem.amount} บาท
            </Text>
            <Text style={{ fontSize: 12, color: "blue" }}>
              (* ราคาที่เสนอยังไม่รวมค่าดำเนินการ)
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              padding: 10,
              marginTop: 10,
              borderWidth: 2.5,
              borderColor: "#ff2fe6",
              backgroundColor: "black",
              width: 350,
              borderRadius: 25,
            }}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ width: "30%", flex: 1, alignItems: "center" }}>
                <Text
                  style={{ color: "white", fontSize: 36, fontWeight: "bold" }}
                >
                  {starCount.toFixed(1)}
                </Text>
                <AirbnbRating
                  count={5}
                  isDisabled={true}
                  defaultRating={starCount.toFixed(0)}
                  reviews={["แย่", "พอใช้", "ดี", "ดีมาก", "ประทับใจ"]}
                  size={12}
                  reviewSize={14}
                />
              </View>
              <View style={{ width: "70%" }}>
                <ProgressBar title="5" rate={rate5} />
                <ProgressBar title="4" rate={rate4} />
                <ProgressBar title="3" rate={rate3} />
                <ProgressBar title="2" rate={rate2} />
                <ProgressBar title="1" rate={rate1} />
              </View>
            </View>
          </View>
          {selectStatus !== AppConfig.PostsStatus.customerConfirm ? (
            <Button
              title="เลือก Partner คนนี้"
              icon={
                <AntDesign
                  name="checkcircleo"
                  size={20}
                  style={{ marginRight: 5 }}
                  color="white"
                />
              }
              color="red"
              buttonStyle={{
                backgroundColor: "#ff2fe6",
                marginVertical: 10,
                borderRadius: 25,
                paddingHorizontal: 15,
              }}
              onPress={() => onPressSelectPartner()}
            />
          ) : (
            <Text
              style={{ fontSize: 20, backgroundColor: "yellow", marginTop: 10 }}
            >
              status: คุณเลือก Partner คนนี้แล้ว
            </Text>
          )}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {images.map((item, index) =>
              item.url ? (
                <TouchableNativeFeedback
                  onPress={() => onPreviewImageList(index)}
                >
                  <View
                    style={{
                      marginVertical: 5,
                      alignItems: "center",
                      padding: 10,
                      borderRadius: 25,
                    }}
                  >
                    <Image
                      key={item + index}
                      source={{ uri: item.url }}
                      style={styles.image}
                    />
                    <Text style={{ marginVertical: 10, fontSize: 14 }}>
                      รูปที่ {index + 1}
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              ) : null
            )}
          </ScrollView>
        </View>
        {/* <View style={styles.container}>
          <Video
            ref={video}
            style={styles.video}
            source={ImgVideo}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        </View> */}
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  video: {
    alignSelf: "center",
    width: 350,
    height: 350,
    borderRadius: 25,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
  image: {
    height: 400,
    width: 350,
    margin: 5,
    padding: 10,
    borderWidth: 1.5,
    borderRadius: 25,
    borderColor: "#ff2fe6",
  },
  progress: {
    margin: 1,
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
})
