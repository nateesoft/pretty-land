import React from "react"
import { View, Image, StyleSheet, ScrollView, Dimensions } from "react-native"
import { Text, Button } from "react-native-elements"
import GradientButton from "react-native-gradient-buttons"

import Img1 from "../../../../assets/img_example/img1.png"
import Img2 from "../../../../assets/img_example/img2.png"
import Img3 from "../../../../assets/img_example/img3.png"
import Img4 from "../../../../assets/img_example/img4.png"

const Images = [Img1, Img2, Img3, Img4]
const { width } = Dimensions.get("window")
const height = (width * 100) / 65

const DetailScreen2 = ({ navigation }) => {
  const [active, setActive] = React.useState(0)

  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    )
    if (slide !== active) {
      setActive(slide)
    }
  }

  const showVideo = () => {
    navigation.navigate("Customer-Work-Detail3")
  }

  const onPressSelectPartner = () => {
    navigation.navigate("Customer-Work-Detail")
  }

  return (
    <View style={style.container}>
      <View>
        <Button
          buttonStyle={{ backgroundColor: "chocolate" }}
          title="แสดงวิดีโอของ Partner"
          onPress={() => showVideo()}
        />
      </View>
      <ScrollView
        scrollEventThrottle={0}
        pagingEnabled
        horizontal
        onScroll={change}
        showsHorizontalScrollIndicator={false}
        style={style.scroll}
      >
        {Images.map((item, index) => (
          <Image
            key={index}
            source={item}
            style={{ width, height, resizeMode: "cover" }}
          />
        ))}
      </ScrollView>
      <View style={style.pagination}>
        {Images.map((i, k) => (
          <Text
            key={k}
            style={k === active ? style.pagingActiveText : style.pagingText}
          >
            ⬤
          </Text>
        ))}
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          marginTop: 10,
          justifyContent: "center",
        }}
      >
        <GradientButton
          onPressAction={() => onPressSelectPartner()}
          text="เลือก Parnter คนนี้"
          width="90%"
          blueViolet
        />
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    width,
    height,
  },
  scroll: { width, height },
  image: { width, height, resizeMode: "cover" },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  pagingText: { fontSize: width / 30, color: "white", margin: 3 },
  pagingActiveText: { fontSize: width / 30, color: "purple", margin: 3 },
})

export default DetailScreen2
