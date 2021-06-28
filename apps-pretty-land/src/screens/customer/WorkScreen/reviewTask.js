import React, { useState } from "react"
import { StyleSheet, View, ImageBackground } from "react-native"
import { Button, Text, Rating } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"

import { updatePosts } from "../../../apis"
import bgImage from "../../../../assets/bg.png"
import firebase from "../../../../util/firebase"
import { AppConfig } from "../../../Constants"

const ReviewTaskScreen = ({ navigation, route }) => {
  const { userId, item } = route.params
  const [rate, setRate] = useState(5)

  const ratingCompleted = (rating) => {
    setRate(rating)
  }

  const ComponentRating = ({ disabled }) => (
    <View pointerEvents={disabled ? "none" : ""}>
      <Rating
        type="star"
        showRating
        ratingCount={5}
        startingValue={5}
        onFinishRating={ratingCompleted}
        style={{ paddingVertical: 10 }}
        imageSize={60}
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

  const updateMember = (workIn = 0, workPoint = 0, partnerId) => {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`members/${partnerId}`)
        .update({
          workIn: parseInt(workIn) + 1,
          workPoint: parseInt(workPoint) + 10,
        })
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  const saveHistoryStar = (partnerId) => {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`partner_star/${partnerId}/${item.id}`)
        .update({
          star: rate,
          sys_date: new Date().toUTCString(),
        })
        .then((result) => {
          resolve("success")
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  const saveToCloseJob = () => {
    // update status post (for customer)
    firebase.database().ref(`posts/${item.id}`).update({
      status: AppConfig.PostsStatus.customerCloseJob,
      statusText: "Customer ปิดงานเรียบร้อย",
      sys_update_date: new Date().toUTCString(),
    })

    Object.keys(item.partnerSelect).forEach((partnerId) => {
      const ref = firebase.database().ref(`members/${partnerId}`)
      ref.once("value", (snapshot) => {
        const pData = { ...snapshot.val() }
        updateMember(pData.workIn, pData.workPoint, partnerId).then((result) => {
          saveHistoryStar(partnerId).then((result) => {
            navigation.navigate("Post-List")
          })
        })
      })
    })
  }

  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
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
          <Text style={styles.textDetail}>สถานที่: {item.placeMeeting}</Text>
          <Text style={styles.textDetail}>จังหวัด: {item.provinceName}</Text>
          <Text style={styles.textDetail}>อำเภอ: {item.districtName}</Text>
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
          {item.status === AppConfig.PostsStatus.waitAdminConfirmPayment && (
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
          {item.status === AppConfig.PostsStatus.adminConfirmPayment && (
            <>
              <Text
                style={{
                  fontSize: 18,
                  color: "blue",
                  alignSelf: "center",
                  padding: 20,
                }}
              >
                รอลูกค้า และ partner ยืนยันปิดงาน...
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "blue",
                  alignSelf: "center",
                  padding: 20,
                }}
              >
                ...หลังจากใช้บริการเรียบร้อยแล้ว กรุณาให้คะแนนความพึงพอใจ
                เพื่อเป็นประโยชน์ในการพัฒนาต่อไป...
              </Text>
            </>
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
                ปิดงานเรียบร้อยแล้ว Happy ending
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "blue",
                  alignSelf: "center",
                  padding: 20,
                }}
              >
                แสดงคะแนนที่ให้ไปสำหรับ partner
              </Text>
            </>
          )}
        </View>
        {item.status !== AppConfig.PostsStatus.adminConfirmPayment &&
          item.status !== AppConfig.PostsStatus.closeJob &&
          item.status !== AppConfig.PostsStatus.adminConfirmNewPost &&
          item.status !==
            AppConfig.PostsStatus.customerCloseJob && (
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
        {item.status === AppConfig.PostsStatus.adminConfirmPayment && (
          <View>
            <Text>ให้คะแนน Partner เพื่อพัฒนาต่อไปค่ะ</Text>
            <ComponentRating disabled={false} />
            <Button
              icon={
                <Icon
                  name="heart"
                  size={15}
                  color="white"
                  style={{ marginRight: 5 }}
                />
              }
              iconLeft
              buttonStyle={{
                margin: 5,
                backgroundColor: "green",
                borderRadius: 5,
                padding: 10,
              }}
              title="บันทึกข้อมูลปิดงาน"
              onPress={() => saveToCloseJob()}
            />
          </View>
        )}
        {item.status === AppConfig.PostsStatus.closeJob && (
          <ComponentRating disabled={true} />
        )}
      </View>
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
