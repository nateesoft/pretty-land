import React from "react"
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native"

/* import data */
import { getPartnerGroup } from "../../../data/apis"

import bgImage from "../../../../assets/bg.png"

const widthFix = (Dimensions.get("window").width * 70) / 100

const PartnerCategory = ({ navigation, route }) => {
  const [items, setItems] = React.useState(getPartnerGroup)
  const onPressOptions = (item) => {
    navigation.navigate("Create-Post-Form", { item })
  }

  const DisplayCard = ({ data }) => (
    <TouchableHighlight
      underlayColor="pink"
      onPress={() => onPressOptions(data)}
      style={styles.box}
    >
      <View style={styles.inner}>
        <Image
          source={{ uri: data.img }}
          style={{ height: widthFix, width: "90%", margin: 5 }}
        />
        <Text style={styles.optionsName}>{data.label}</Text>
      </View>
    </TouchableHighlight>
  )
  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <View style={styles.container}>
        <DisplayCard data={items[0]} />
        <DisplayCard data={items[1]} />
        <DisplayCard data={items[2]} />
        <DisplayCard data={items[3]} />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  box: {
    width: "50%",
    height: "50%",
    padding: 5,
  },
  inner: {
    flex: 1,
    backgroundColor: "red",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  optionsName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  optionsInfo: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
})

export default PartnerCategory
