import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native"
import { Button, Text } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"
import StarRating from "react-native-star-rating"

import { updatePosts } from "../../../apis"
import bgImage from "../../../../assets/bg.png"
import { AppConfig } from "../../../Constants"

import firebase from "../../../../util/firebase"
import { getDocument } from "../../../../util"
import PartnerListItem from "./PartnerListItem"

const ReviewTaskScreen = (props) => {
  const { navigation, route } = props
  const { userId, postDetail } = route.params

  const [rate, setRate] = useState(5)
  const [showPartnerList, setShowPartnerList] = useState([])

  const generatePartnerList = () => {
    return new Promise((resolve, reject) => {
      let list = []
      for (let key in postDetail.partnerSelect) {
        const data = postDetail.partnerSelect[key]
        if (data.selectStatus === AppConfig.PostsStatus.customerPayment) {
          list.push(data)
        }
      }
      setShowPartnerList(list)
      resolve(true)
    })
  }

  const cancelThisPosts = () => {
    updatePosts(postDetail.id, {
      status: AppConfig.PostsStatus.customerCancelPost,
      statusText: "ยกเลิกโพสท์นี้แล้ว",
      sys_update_date: new Date().toUTCString(),
    })
    navigation.navigate("Post-List")
  }

  const saveToCloseJob = () => {
    firebase
      .database()
      .ref(getDocument(`posts/${postDetail.id}`))
      .update({
        status: AppConfig.PostsStatus.closeJob,
        statusText: "ปิดงาน Post นี้เรียบร้อย",
        rate,
        sys_update_date: new Date().toUTCString(),
      })

    // save list star partner
    showPartnerList.map((item, index) => {
      firebase
        .database()
        .ref(getDocument(`partner_star/${item.partnerId}/${postDetail.id}`))
        .update({
          star: rate,
          sys_date: new Date().toUTCString(),
        })
    })

    navigation.navigate("Post-List")
  }

  useEffect(() => {
    generatePartnerList().catch((err) => Alert.alert(err))
  }, [])

  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="contain"
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
              <Text style={styles.textDetail}>
                ไอดี: {postDetail.customerId}
              </Text>
              <Text style={styles.textDetail}>
                ระดับ Level: {postDetail.customerLevel}
              </Text>
              <Text style={styles.textDetail}>
                ชื่อผู้โพสท์: {postDetail.customerName}
              </Text>
              <Text style={styles.textDetail}>
                เบอร์โทรศัพท์: {postDetail.customerPhone}
              </Text>
              <Text style={styles.textDetail}>
                เพิ่มเติม: {postDetail.customerRemark}
              </Text>
              <Text style={styles.textDetail}>
                ประเภท Partner: {postDetail.partnerRequest}
              </Text>
              <Text style={styles.textDetail}>
                สถานที่: {postDetail.placeMeeting}
              </Text>
              <Text style={styles.textDetail}>
                จังหวัด: {postDetail.provinceName}
              </Text>
              {postDetail.status ===
                AppConfig.PostsStatus.customerNewPostDone && (
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
              {postDetail.status ===
                AppConfig.PostsStatus.adminConfirmNewPost && (
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
              {postDetail.status ===
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
              {postDetail.status === AppConfig.PostsStatus.closeJob && (
                <>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "red",
                      alignSelf: "center",
                      padding: 20,
                    }}
                  >
                    ปิดงานเรียบร้อยแล้ว
                  </Text>
                  <Text style={{ alignSelf: "center" }}>
                    คะแนนที่ได้รับ {postDetail.rate || 0} คะแนน
                  </Text>
                </>
              )}
            </View>
            {postDetail.status !==
              AppConfig.PostsStatus.waitAdminConfirmPayment && (
              <PartnerListItem
                items={showPartnerList}
                status={postDetail.status}
                postId={postDetail.id}
                post={postDetail}
                {...props}
              />
            )}
            {postDetail.status ===
              AppConfig.PostsStatus.customerNewPostDone && (
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
          {postDetail.status === AppConfig.PostsStatus.startWork && (
            <View style={{ alignItems: "center" }}>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={rate}
                fullStarColor="orange"
                selectedStar={(rating) => setRate(rating)}
              />
              <Text>ให้ {rate} คะแนน</Text>
              <Button
                icon={
                  <Icon
                    name="save"
                    size={24}
                    color="white"
                    style={{ marginRight: 10 }}
                  />
                }
                title="บันทึกปิดงาน"
                buttonStyle={{
                  marginVertical: 10,
                  borderRadius: 5,
                  width: 150,
                }}
                onPress={() => saveToCloseJob()}
              />
            </View>
          )}
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
