import React from "react"
import { StyleSheet, View } from "react-native"
import { Button, Text, Input } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"

const CreateNewPostForm = ({ navigation, route }) => {
  const { data, item } = route.params
  const [owner, setOwner] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [place, setPlace] = React.useState("")
  const [comment, setComment] = React.useState("")
  const [qty, setQty] = React.useState("")

  return (
    <View style={styles.cardDetail}>
      <Text style={styles.optionsNameDetail}>โพสทข้อมูลที่ต้องการ</Text>
      <Text style={styles.optionsNameDetail2}>{item.name}</Text>
      <View style={styles.viewCard}>
        <Input
          name="owner"
          placeholder="ชื่อคนโพสท์"
          leftIcon={{ type: "font-awesome", name: "address-book" }}
          style={styles.inputForm}
          onChangeText={(value) => setOwner(value)}
          value={owner}
        />
        <Input
          name="comment"
          placeholder="รายละเอียดเพิ่มเติม"
          leftIcon={{ type: "font-awesome", name: "comment" }}
          style={styles.inputForm}
          onChangeText={(value) => setComment(value)}
          value={comment}
        />
        <Input
          name="phone"
          placeholder="เบอร์ติดต่อ"
          leftIcon={{ type: "font-awesome", name: "phone" }}
          style={styles.inputForm}
          onChangeText={(value) => setPhone(value)}
          value={phone}
        />
        <Input
          name="place"
          placeholder="สถานที่นัดพบ"
          leftIcon={{ type: "font-awesome", name: "home" }}
          style={styles.inputForm}
          onChangeText={(value) => setPlace(value)}
          value={place}
        />
        <Input
          name="qty"
          placeholder="จำนวนคนที่ต้องการ"
          leftIcon={{ type: "font-awesome", name: "users" }}
          style={styles.inputForm}
          onChangeText={(value) => setQty(value)}
          value={qty}
        />
      </View>
      <Button
        icon={
          <Icon
            name="save"
            size={20}
            color="white"
            style={{ marginRight: 10 }}
          />
        }
        iconLeft
        buttonStyle={styles.btnSave}
        title="บันทึกข้อมูล"
        onPress={() => navigation.navigate("Post-List")}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  btnSave: { 
    margin: 15, 
    paddingHorizontal: 50, 
    borderRadius: 55,
    backgroundColor: '#ff2fe6',
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
})

export default CreateNewPostForm
