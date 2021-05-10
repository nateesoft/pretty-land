import React from "react"
import {
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

import styles from "../Styles"

const HomeScreen = ({ navigation }) => {
  const onPressOptions = (item) => {
    navigation.navigate("Customer-Home-Detail", { item })
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
        <DisplayCard
          data={{
            type: "1",
            title: "พริตตี้",
            info: "30 รายการ",
            img: Img1,
          }}
        />
        <DisplayCard
          data={{
            type: "2",
            title: "โคโยตี้",
            info: "10 รายการ",
            img: Img2,
          }}
        />
        <DisplayCard
          data={{
            type: "3",
            title: "พริตตี้ Entertain",
            info: "3 รายการ",
            img: Img3,
          }}
        />
        <DisplayCard
          data={{
            type: "4",
            title: "พริตตี้ นวดแผนไทย",
            info: "8 รายการ",
            img: Img4,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen
