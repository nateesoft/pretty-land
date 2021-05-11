import React from "react"
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableHighlight,
  View,
  Text,
  Image,
} from "react-native"
import Img1 from "../../../../assets/img_example/img1.png"
import Img2 from "../../../../assets/img_example/img2.png"
import Img3 from "../../../../assets/img_example/img3.png"
import Img4 from "../../../../assets/img_example/img4.png"

const PartnerCategory = ({ navigation }) => {
  const [items, setItems] = React.useState([
    { id: 1, type: "1", title: "พริตตี้", info: "30 รายการ", img: Img1 },
    { id: 2, type: "2", title: "โคโยตี้", info: "10 รายการ", img: Img2 },
    {
      id: 3,
      type: "3",
      title: "พริตตี้ Entertain",
      info: "3 รายการ",
      img: Img3,
    },
    {
      id: 4,
      type: "4",
      title: "พริตตี้ นวดแผนไทย",
      info: "8 รายการ",
      img: Img4,
    },
  ])
  const onPressOptions = (item) => {
    navigation.navigate("Partner-List-Country", { item })
  }

  const DisplayCard = ({ data }) => (
    <TouchableHighlight
      underlayColor="pink"
      onPress={() => onPressOptions(data)}
    >
      <View style={styles.cardContainer}>
        <Text style={styles.optionsName}>{data.title}</Text>
        <Image style={styles.optionsPhoto} source={data.img} />
        <Text style={styles.optionsInfo}>{data.info}</Text>
      </View>
    </TouchableHighlight>
  )
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {items.map((item) => (
            <DisplayCard key={item.id} data={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#cccccc",
    borderWidth: 0.5,
    borderRadius: 20,
  },
  optionsName: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginTop: 8,
  },
  optionsInfo: {
    fontSize: 28,
    marginTop: 3,
    marginBottom: 5,
    fontSize: 15,
  },
  optionsPhoto: {
    width: 350,
    height: 150,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: "blue",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
})

export default PartnerCategory
