import React, { useEffect, useState } from "react"
import {
  Alert,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Image,
} from "react-native"
import { Button, Text } from "react-native-elements"
import { AntDesign, Ionicons } from "react-native-vector-icons"
import Moment from "moment"

import { updatePosts, saveProvincesGroupPostPartner } from "../../../apis"
import { AppConfig } from "../../../Constants"
import bgImage from "../../../../assets/bg.png"

const ConfirmTaskScreen = ({ navigation, route }) => {
  const { item } = route.params
  const [partnerList, setPartnerList] = useState([])

  const getPartnerList = () => {
    return new Promise((resolve, reject) => {
      const partnerSelect = item.partnerSelect
      let pList = []
      for (let key in partnerSelect) {
        const obj = partnerSelect[key]
        pList.push(obj)
      }

      resolve(pList)
    })
  }

  useEffect(() => {
    getPartnerList().then((res) => setPartnerList(res))
  }, [])

  const updateToApprove = () => {
    updatePosts(item.id, {
      status: AppConfig.PostsStatus.adminConfirmNewPost,
      statusText: "อนุมัติโพสท์",
      sys_update_date: new Date().toUTCString(),
    })
    saveProvincesGroupPostPartner(
      {
        province: item.province,
        provinceName: item.provinceName,
        partnerType: item.partnerRequest,
      },
      1
    )
    navigation.navigate("Post-List-All")
  }

  const updateNotApprove = () => {
    updatePosts(item.id, {
      status: AppConfig.PostsStatus.notApprove,
      statusText: "ไม่อนุมัติโพสท์",
      sys_update_date: new Date().toUTCString(),
    })
    navigation.navigate("Post-List-All")
  }

  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.textTopic}>รายละเอียดโพสท์</Text>
        <Text style={styles.textDetail}>( สถานะ {item.statusText} )</Text>
        <View style={styles.cardDetail}>
          <View style={styles.viewCard}>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 16 }}>
                ชื่อลูกค้า: {item.customerName}
              </Text>
              <Text style={{ fontSize: 16 }}>Level: {item.customerLevel}</Text>
              <Text style={{ fontSize: 16 }}>
                ประเภทที่ต้องการ: {item.partnerRequest}
              </Text>
              <Text style={{ fontSize: 16 }}>จังหวัด: {item.provinceName}</Text>
              <Text style={{ fontSize: 16 }}>
                เขต/อำเภอ: {item.districtName}
              </Text>
            </View>
          </View>
          <View style={styles.viewCard}>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 16 }}>
                สถานะที่นัดพบ: {item.placeMeeting}
              </Text>
              <Text style={{ fontSize: 16 }}>
                เบอร์ติดต่อ: {item.customerPhone}
              </Text>
              <Text style={{ fontSize: 16 }}>
                หมายเหตุ: {item.customerRemark}
              </Text>
            </View>
          </View>
          <View style={styles.viewCard}>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 16 }}>
                วันที่สร้างข้อมูล:{" "}
                {Moment(item.sys_create_date).format("D MMM YYYY HH:mm:ss")}
              </Text>
              <Text style={{ fontSize: 16 }}>
                วันที่อัพเดตข้อมูล:{" "}
                {Moment(item.sys_update_date).format("D MMM YYYY HH:mm:ss")}
              </Text>
            </View>
          </View>
          {item.status === AppConfig.PostsStatus.customerNewPostDone && (
            <View>
              <Button
                icon={
                  <AntDesign
                    name="checkcircleo"
                    size={15}
                    color="white"
                    style={{ marginRight: 5 }}
                  />
                }
                iconLeft
                buttonStyle={{
                  margin: 5,
                  backgroundColor: "#ff2fe6",
                  paddingHorizontal: 20,
                  borderRadius: 25,
                }}
                title="อนุมัติโพสท์"
                onPress={() => updateToApprove()}
              />
              <Button
                icon={
                  <Ionicons
                    name="trash-bin-outline"
                    size={15}
                    color="white"
                    style={{ marginRight: 5 }}
                  />
                }
                iconLeft
                buttonStyle={{
                  margin: 5,
                  backgroundColor: "red",
                  borderRadius: 25,
                  paddingHorizontal: 20,
                }}
                title="ไม่อนุมัติโพสท์"
                onPress={() => updateNotApprove()}
              />
            </View>
          )}
          {partnerList.length > 0 && (
            <View>
              <Text>แสดงรายชื่อ Partner ที่เลือกแล้ว</Text>
              <ScrollView horizontals showsHorizontalScrollIndicator={false}>
                {partnerList.map((pObj, index) => (
                  <View
                    key={pObj.id}
                    style={{
                      padding: 10,
                      borderWidth: 1,
                      marginTop: 10,
                      alignSelf: "center",
                      borderColor: "gray",
                    }}
                  >
                    <Image
                      source={{
                        uri: pObj.image,
                        width: 150,
                        height: 150,
                      }}
                    />
                    <Text>ชื่อ Partner: {pObj.partnerName}</Text>
                    <Text>เบอร์โทรศัพท์: {pObj.telephone}</Text>
                    <Text>ราคาที่เสนอ: {pObj.amount}</Text>

                    <View style={{ alignItems: "center" }}>
                      <Text
                        style={{
                          backgroundColor: "gray",
                          color: "white",
                          width: "100%",
                          alignSelf: "center",
                        }}
                      >
                        Log...
                      </Text>
                      {pObj.customerStatusText && (
                        <Text style={{ color: "blue" }}>
                          {pObj.customerStatusText}
                        </Text>
                      )}
                      {pObj.partnerStatusText && (
                        <Text style={{ color: "blue" }}>
                          {pObj.partnerStatusText}
                        </Text>
                      )}
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
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
    borderWidth: 1,
    borderColor: "#eee",
    marginVertical: 5,
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

export default ConfirmTaskScreen
