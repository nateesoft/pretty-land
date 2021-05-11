import React from "react"
import { StyleSheet, View } from "react-native"
import { Button, Text, Input, AirbnbRating } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"

const ReviewTaskScreen = ({ navigation, route }) => {
  const { status } = route.params

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
      <Text style={styles.optionsNameDetail}>ตำแหน่งงานที่มองหา</Text>
      <Text style={styles.optionsNameDetail2}>จังหวัดที่ต้องการ</Text>
      <View style={styles.viewCard}>
        <Input
          name="owner"
          disabled
          leftIcon={{ type: "font-awesome", name: "address-book" }}
          style={styles.inputForm}
          value="คุณโดนใจ ใช่เลย"
        />
        <Input
          name="comment"
          placeholder="รายละเอียดเพิ่มเติม"
          disabled
          leftIcon={{ type: "font-awesome", name: "comment" }}
          style={styles.inputForm}
          value="รูปร่างดี หุ่นดี ขาว ด่วน!!!"
        />
        <Input
          name="phone"
          placeholder="เบอร์ติดต่อ"
          disabled
          leftIcon={{ type: "font-awesome", name: "phone" }}
          style={styles.inputForm}
          value="0812208944"
        />
        <Input
          name="place"
          disabled
          leftIcon={{ type: "font-awesome", name: "home" }}
          style={styles.inputForm}
          value="หน้าวัดลาปลาเค้า"
        />
        <Input
          name="qty"
          disabled
          leftIcon={{ type: "font-awesome", name: "users" }}
          style={styles.inputForm}
          value="1 ตำแหน่ง"
        />
        <Input
          name="status"
          disabled
          leftIcon={{ type: "font-awesome", name: "star" }}
          style={styles.inputForm}
          value="รอพิจารณาจาก Admin"
        />
      </View>
      {status !== "customer_with_partner" && status !== "close_job" && (
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
      {status === "customer_with_partner" && (
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
      {status === "close_job" && (
        <ComponentRating disabled={true} />
      )}
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
