import * as React from "react"
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableNativeFeedback,
} from "react-native"
// import { Video } from "expo-av"
import { AntDesign } from "@expo/vector-icons"
import { Button } from "react-native-elements/dist/buttons/Button"
import * as Progress from "react-native-progress"
import { AirbnbRating } from "react-native-elements"

import Img1 from "../../../../assets/img_example/f1.jpg"
import Img2 from "../../../../assets/img_example/f2.jpg"
import Img3 from "../../../../assets/img_example/f3.jpg"
import Img4 from "../../../../assets/img_example/f4.jpg"
import Img5 from "../../../../assets/img_example/f5.jpg"

const images = [
  { props: { source: Img1 } },
  { props: { source: Img2 } },
  { props: { source: Img3 } },
  { props: { source: Img4 } },
  { props: { source: Img5 } },
]

export default function PartnerImage(props) {
  const { navigation, route } = props
  const { item } = route.params

  const video = React.useRef(null)
  const [status, setStatus] = React.useState({})

  const onPressSelectPartner = () => {
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

  return (
    <ScrollView>
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
          <Text style={{ fontSize: 16 }}>ชื่อ Partner: {item.name}</Text>
          <Text style={{ fontSize: 16 }}>ข้อมูลจำเพาะ:</Text>
          <Text style={{ fontSize: 16 }}>สัดส่วน 36 36 36 ผิวขาว สูง 165</Text>
          <Text style={{ fontSize: 16 }}>ราคาที่เสนอ: 1,000 บาท</Text>
          <Text style={{ fontSize: 16 }}>ค่าดำเนินการ: 100 บาท</Text>
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
        {images.map((item, index) => (
          <TouchableNativeFeedback
            onPress={() => onPreviewImageList(index)}
            key={index}
          >
            <View
              style={{
                backgroundColor: "white",
                borderWidth: 0.5,
                marginVertical: 5,
                alignItems: "center",
                padding: 10,
                borderColor: "#ff2fe6",
                borderRadius: 25,
              }}
            >
              <Image
                key={index}
                source={item.props.source}
                style={styles.image}
              />
              <Text style={{ marginVertical: 10, fontSize: 14 }}>
                รูปที่ {index + 1}
              </Text>
            </View>
          </TouchableNativeFeedback>
        ))}
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  video: {
    alignSelf: "center",
    width: 350,
    height: 300,
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
    backgroundColor: "white",
  },
  image: {
    height: 300,
    width: 320,
    margin: 5,
    padding: 10,
    borderWidth: 1.5,
    borderRadius: 25,
  },
  progress: {
    margin: 1,
  },
})
