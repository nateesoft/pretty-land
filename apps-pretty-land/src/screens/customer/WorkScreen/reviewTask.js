import React, { useState } from "react"
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  SafeAreaView,
} from "react-native"
import { Button, Text, Rating } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"

import { updatePosts } from "../../../apis"
import bgImage from "../../../../assets/bg.png"
import { AppConfig } from "../../../Constants"

import firebase from "../../../../util/firebase"
import PartnerListItem from "./PartnerListItem"

const ReviewTaskScreen = (props) => {
  const { navigation, route } = props
  const { userId, item } = route.params

  const [rate, setRate] = useState(5)

  const ComponentRating = ({ disabled }) => (
    <View pointerEvents={disabled ? "none" : ""}>
      <Rating
        type="star"
        ratingCount={rate}
        startingValue={5}
        onFinishRating={(r) => setRate(r)}
        style={{ paddingVertical: 10 }}
        ratingBackgroundColor="transparent"
        imageSize={32}
      />
    </View>
  )

  const cancelThisPosts = () => {
    updatePosts(item.id, {
      status: AppConfig.PostsStatus.customerCancelPost,
      statusText: "ยกเลิกโพสท์นี้แล้ว",
      sys_update_date: new Date().toUTCString(),
    })
    navigation.navigate("Post-List")
  }

  const saveToCloseJob = () => {
    firebase.database().ref(`posts/${item.id}`).update({
      status: AppConfig.PostsStatus.closeJob,
      statusText: "ปิดงาน Post นี้เรียบร้อย",
      sys_update_date: new Date().toUTCString(),
    })
    navigation.navigate("Post-List")
  }

  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <SafeAreaView style={{ height: "100%" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.textTopic}>รายละเอียดโพสท์</Text>
          <View style={styles.cardDetail}>
            <View
              style={{
                width: "100%",
                padding: 10,
                borderWidth: 1.5,
                borderColor: "#aaa",
                borderRadius: 15,
                margin: 5,
              }}
            >
              <Text style={styles.textDetail}>ไอดี: {item.customerId}</Text>
              <Text style={styles.textDetail}>
                ระดับ Level: {item.customerLevel}
              </Text>
              <Text style={styles.textDetail}>
                ชื่อผู้โพสท์: {item.customerName}
              </Text>
              <Text style={styles.textDetail}>
                เบอร์โทรศัพท์: {item.customerPhone}
              </Text>
              <Text style={styles.textDetail}>
                เพิ่มเติม: {item.customerRemark}
              </Text>
              <Text style={styles.textDetail}>
                ประเภท Partner: {item.partnerRequest}
              </Text>
              <Text style={styles.textDetail}>
                สถานที่: {item.placeMeeting}
              </Text>
              <Text style={styles.textDetail}>
                จังหวัด: {item.provinceName}
              </Text>
              {item.status === AppConfig.PostsStatus.customerNewPostDone && (
                <Text
                  style={{
                    fontSize: 18,
                    color: "blue",
                    alignSelf: "center",
                    padding: 20,
                  }}
                >
                  โพสท์ใหม่ รอตรวจสอบจาก admin...
                </Text>
              )}
              {item.status === AppConfig.PostsStatus.adminConfirmNewPost && (
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "blue",
                      alignSelf: "center",
                      marginTop: 10,
                    }}
                  >
                    ได้รับการอนุมัติจาก admin แล้ว
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "red",
                      alignSelf: "center",
                    }}
                  >
                    (รอ Partner รับงาน)
                  </Text>
                </View>
              )}
              {item.status ===
                AppConfig.PostsStatus.waitAdminConfirmPayment && (
                <Text
                  style={{
                    fontSize: 18,
                    color: "blue",
                    alignSelf: "center",
                    padding: 20,
                  }}
                >
                  รอตรวจสอบ หลักฐานการโอนเงิน...
                </Text>
              )}
              {item.status === AppConfig.PostsStatus.closeJob && (
                <>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "blue",
                      alignSelf: "center",
                      padding: 20,
                    }}
                  >
                    ปิดงานเรียบร้อยแล้ว
                  </Text>
                </>
              )}
            </View>
            {item.status !== AppConfig.PostsStatus.waitAdminConfirmPayment && (
              <PartnerListItem
                items={item.partnerSelect}
                status={item.status}
                postId={item.id}
                post={item}
                {...props}
              />
            )}
            {item.status !== AppConfig.PostsStatus.adminConfirmPayment &&
              item.status !== AppConfig.PostsStatus.closeJob &&
              item.status !== AppConfig.PostsStatus.adminConfirmNewPost &&
              item.status !== AppConfig.PostsStatus.customerCloseJob && (
                <Button
                  icon={
                    <Icon
                      name="close"
                      size={15}
                      color="white"
                      style={{ marginRight: 5 }}
                    />
                  }
                  iconLeft
                  buttonStyle={{ margin: 5, backgroundColor: "red" }}
                  title="ยกเลิกโพสท์นี้"
                  onPress={() => cancelThisPosts()}
                />
              )}
          </View>
          <View style={{ justifyContent: "center", marginTop: 10 }}>
            <ComponentRating
              disabled={item.status === AppConfig.PostsStatus.customerCloseJob}
            />
          </View>
          <Button
            icon={
              <Icon
                name="save"
                size={24}
                color="white"
                style={{ marginRight: 10 }}
              />
            }
            title={`บันทึกปิดงานทั้งหมด (${
              Object.keys(item.partnerSelect || {}).length
            })`}
            buttonStyle={{
              marginVertical: 10,
              width: "80%",
              borderRadius: 5,
            }}
            onPress={() => saveToCloseJob()}
          />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  textTopic: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    backgroundColor: "#ff2fe6",
    padding: 10,
  },
  cardDetail: {
    flex: 1,
    alignItems: "center",
    padding: 5,
    margin: 10,
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
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  textDetail: {
    fontSize: 14,
    padding: 5,
  },
})

export default ReviewTaskScreen
