import React from "react"
import { StyleSheet, View, Image, ScrollView } from "react-native"
import { Button, Text, CheckBox } from "react-native-elements"
import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
} from "react-native-vector-icons"
import { Video } from "expo-av"
import Img1 from "../../../../assets/img_example/f1.jpg"
import Img2 from "../../../../assets/img_example/f2.jpg"
import Img3 from "../../../../assets/img_example/f3.jpg"
import Img4 from "../../../../assets/img_example/f4.jpg"
import Img5 from "../../../../assets/img_example/f5.jpg"
import ImgVideo from "../../../../assets/img_example/f_video.mp4"

const ViewProfileScreen = ({ navigation, route }) => {
  const video = React.useRef(null)
  const [status, setStatus] = React.useState({})
  const [workIn, setWorkIn] = React.useState(true)
  const [workOut, setWorkOut] = React.useState(false)

  const RenderLabel = ({ label, icon, type = "a" }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 0.5,
        paddingHorizontal: 10,
        borderColor: "#00716F",
        backgroundColor: "white",
        marginTop: 5,
        height: 40,
        borderRadius: 50,
      }}
    >
      {type === "m" && (
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color="black"
          style={{ marginRight: 10 }}
        />
      )}
      {type === "a" && (
        <FontAwesome
          name={icon}
          size={24}
          color="black"
          style={{ marginRight: 10 }}
        />
      )}
      {type === "i2" && (
        <Ionicons
          name={icon}
          size={24}
          color="black"
          style={{ marginRight: 10 }}
        />
      )}
      {type === "a5" && (
        <FontAwesome5
          name={icon}
          size={24}
          color="black"
          style={{ marginRight: 10 }}
        />
      )}
      <Text>{label}</Text>
    </View>
  )

  return (
    <ScrollView>
      <View style={styles.cardDetail}>
        <Text style={styles.textTopic}>แก้ไขข้อมูลส่วนตัว</Text>
        <View style={styles.viewCard}>
          <RenderLabel icon="address-book" label="ชื่อที่ใช้แสดงในระบบ" />
          <RenderLabel icon="human-male-female" label="เพศ" type="m" />
          <RenderLabel icon="phone" label="เบอร์ติดต่อ" />
          <RenderLabel icon="human-male-height" label="ส่วนสูง" type="m" />
          <RenderLabel
            icon="md-woman-outline"
            label="สัดส่วน 32-24-35"
            type="i2"
          />
          <RenderLabel icon="weight" label="นำ้หนัก" type="a5" />
          <RenderLabel icon="timeline-clock" label="อายุ" type="m" />
          <RenderLabel icon="line" label="LINE ID" type="a5" />
          <CheckBox
            title="รับงานนอกสถานที่"
            checked={workIn}
            onPress={() => setWorkIn(!workIn)}
          />
          <CheckBox
            title="รับงานในสถานที่"
            checked={workOut}
            onPress={() => setWorkOut(!workOut)}
          />
        </View>
        <Text>อัพโหลดรูปภาพ</Text>
        <View style={{ flexDirection: "row", padding: 10, maring: 10 }}>
          <Image source={Img1} style={{ width: 65, height: 100, margin: 5 }} />
          <Image source={Img2} style={{ width: 65, height: 100, margin: 5 }} />
          <Image source={Img3} style={{ width: 65, height: 100, margin: 5 }} />
          <Image source={Img4} style={{ width: 65, height: 100, margin: 5 }} />
          <Image source={Img5} style={{ width: 65, height: 100, margin: 5 }} />
        </View>
        <Text>อัพโหลด Clip video</Text>
        <View
          style={{ flex: 1, flexDirection: "row", padding: 10, maring: 10 }}
        >
          <Video
            ref={video}
            style={styles.video}
            source={ImgVideo}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        </View>
        <Button
          icon={
            <FontAwesome
              name="save"
              size={20}
              color="white"
              style={{ marginRight: 5 }}
            />
          }
          iconLeft
          buttonStyle={styles.btnSave}
          title="บันทึกข้อมูล"
          onPress={() => navigation.navigate("Partner-Category")}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  btnSave: {
    margin: 15,
    paddingHorizontal: 50,
    borderRadius: 55,
    backgroundColor: "#ff2fe6",
  },
  cardDetail: {
    flex: 1,
    alignItems: "center",
    padding: 5,
    margin: 10,
    backgroundColor: "white",
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
    width: "100%",
    borderRadius: 20,
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
  video: {
    alignSelf: "center",
    width: 350,
    height: 300,
    borderRadius: 25,
  },
})

export default ViewProfileScreen
