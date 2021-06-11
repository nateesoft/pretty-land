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

import bgImage from "../../../../assets/bg.png"

export default function PartnerImage({ navigation, route }) {
  const { postItem, partnerItem } = route.params

  const video = useRef(null)
  const [status, setStatus] = useState({})
  const [partnerProfile, setPartnerProfile] = useState({})
  const [selectStatus, setSelectStatus] = useState("")
  const [images, setImages] = useState([])

  const onPressSelectPartner = () => {
    firebase
      .database()
      .ref(`posts/${postItem.id}/partnerSelect/${partnerItem.partnerId}`)
      .update({
        selectStatus: "customer_confirm",
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

  useEffect(() => {
    firebase
      .database()
      .ref(`members/${partnerItem.partnerId}`)
      .on("value", (snapshot) => {
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
    firebase
      .database()
      .ref(`posts/${postItem.id}/partnerSelect/${partnerItem.partnerId}`)
      .on("value", (snapshot) => {
        const partnerStatusSelect = { ...snapshot.val() }
        setSelectStatus(partnerStatusSelect.selectStatus)
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
              ชื่อ Partner: {partnerProfile.name}
            </Text>
            <Text style={{ fontSize: 16 }}>ข้อมูลจำเพาะ:</Text>
            <Text style={{ fontSize: 16 }}>
              สัดส่วน {partnerProfile.stature} สูง {partnerProfile.height}
            </Text>
            <Text style={{ fontSize: 16 }}>
              ราคาที่เสนอ: {partnerItem.amount} บาท
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
                  4.2
                </Text>
                <AirbnbRating
                  count={5}
                  isDisabled={true}
                  defaultRating={4}
                  reviews={["แย่", "พอใช้", "ดี", "ดีมาก", "ประทับใจ"]}
                  size={12}
                  reviewSize={14}
                />
              </View>
              <View style={{ width: "70%" }}>
                <ProgressBar title="5" rate={0.45} />
                <ProgressBar title="4" rate={0.75} />
                <ProgressBar title="3" rate={0.3} />
                <ProgressBar title="2" rate={0.15} />
                <ProgressBar title="1" rate={0.1} />
              </View>
            </View>
          </View>
          {selectStatus !== "customer_confirm" ? (
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
              status:  คุณเลือก Partner คนนี้แล้ว
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
