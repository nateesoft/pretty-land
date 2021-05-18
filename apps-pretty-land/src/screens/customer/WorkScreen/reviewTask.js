import React from "react"
import { StyleSheet, View } from "react-native"
import { Button, Text, AirbnbRating } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"

const ReviewTaskScreen = ({ navigation, route }) => {
  const { item } = route.params

  const ComponentRating = ({ disabled }) => (
    <AirbnbRating
      count={5}
      isDisabled={disabled}
      defaultRating={5}
      size={40}
      reviews={["แย่", "พอใช้", "ดี", "ดีมาก", "ประทับใจ"]}
    />
  )

  return (
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
        {item.status === "customer_new_post_done" && (
          <Text style={{ fontSize: 18 }}>โพสท์ใหม่ รอตรวจสอบจาก admin...</Text>
        )}
        {item.status === "wait_admin_confirm_payment" && (
          <Text style={{ fontSize: 18 }}>รอตรวจสอบ หลักฐานการโอนเงิน...</Text>
        )}
        {item.status === "customer_with_partner" && (
          <>
            <Text style={{ fontSize: 18 }}>
              รอลูกค้า และ partner ยืนยันปิดงาน...
            </Text>
            <Text style={{ fontSize: 16 }}>
              ...หลังจากใช้บริการเรียบร้อยแล้ว กรุณาให้คะแนนความพึงพอใจ 
              เพื่อเป็นประโยชน์ในการพัฒนาต่อไป...
            </Text>
          </>
        )}
        {item.status === "close_job" && (
          <>
            <Text style={{ fontSize: 18 }}>
              ปิดงานเรียบร้อยแล้ว Happy ending
            </Text>
            <Text style={{ fontSize: 16 }}>
              แสดงคะแนนที่ให้ไปสำหรับ partner
            </Text>
          </>
        )}
      </View>
      {item.status !== "customer_with_partner" &&
        item.status !== "close_job" && (
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
            title="แจ้งยกเลิกโพสท์นี้"
            onPress={() => navigation.navigate("Post-List")}
          />
        )}
      {item.status === "customer_with_partner" && (
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
            buttonStyle={{ margin: 5, backgroundColor: "green" }}
            title="บันทึกข้อมูลปิดงานเรียบร้อย"
            onPress={() => navigation.navigate("Post-List")}
          />
        </View>
      )}
      {item.status === "close_job" && <ComponentRating disabled={true} />}
    </View>
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
    padding: 5,
  },
})

export default ReviewTaskScreen
