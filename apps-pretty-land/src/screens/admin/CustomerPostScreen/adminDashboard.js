import React, { useState, useEffect } from "react"
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
import firebase from "../../../../util/firebase"
import { snapshotToArray } from "../../../../util"
import bgImage from "../../../../assets/bg.png"
import { AppConfig } from "../../../Constants"

const widthFix = (Dimensions.get("window").width * 70) / 120

const Category = ({ navigation, route }) => {
  const [items, setItems] = useState([])
  const [sumType1, setSumType1] = useState("0")
  const [sumType2, setSumType2] = useState("0")
  const [sumType3, setSumType3] = useState("0")
  const [sumType4, setSumType4] = useState("0")

  const getComputeGroup = (snapshot) => {
    return new Promise((resolve, reject) => {
      const arr = snapshotToArray(snapshot)
      let type1 = 0,
        type2 = 0,
        type3 = 0,
        type4 = 0
      arr.forEach((item) => {
        if (item.partnerRequest === AppConfig.PartnerType.type1) {
          type1 = type1 + 1
        }
        if (item.partnerRequest === AppConfig.PartnerType.type2) {
          type2 = type2 + 1
        }
        if (item.partnerRequest === AppConfig.PartnerType.type3) {
          type3 = type3 + 1
        }
        if (item.partnerRequest === AppConfig.PartnerType.type4) {
          type4 = type4 + 1
        }
      })
      resolve({
        type1,
        type2,
        type3,
        type4,
      })
    })
  }

  useEffect(() => {
    const ref = firebase.database().ref(`appconfig`)
    const listener = ref.on("value", (snapshot) => {
      const dataItems = []
      const appconfig = snapshot.val()
      dataItems.push({ ...appconfig.partner1 })
      dataItems.push({ ...appconfig.partner2 })
      dataItems.push({ ...appconfig.partner3 })
      dataItems.push({ ...appconfig.partner4 })

      setItems(dataItems)

      return () => {
        ref.off("value", listener)
      }
    })

    return () => ref.off("value", listener)
  }, [])

  useEffect(() => {
    const ref = firebase.database().ref(`posts`)
    const listener = ref.on("value", (snapshot) => {
      getComputeGroup(snapshot).then((res) => {
        const data = { ...res }
        setSumType1(data.type1)
        setSumType2(data.type2)
        setSumType3(data.type3)
        setSumType4(data.type4)
      })
    })
    return () => {
      ref.off("value", listener)
    }
  }, [])

  const onPressOptions = (item) => {
    navigation.navigate("Post-List-All", { partnerRequest: item.value })
  }

  const DisplayCard = ({ data, count }) => (
    <TouchableHighlight
      underlayColor="pink"
      onPress={() => onPressOptions(data)}
      style={styles.box}
    >
      <View style={styles.inner}>
        <Image
          source={{ uri: data.image_url }}
          style={{ height: widthFix, width: "90%", margin: 5 }}
        />
        <Text style={styles.optionsName}>{data.name}</Text>
        <Text>จำนวน {count} โพสท์</Text>
      </View>
    </TouchableHighlight>
  )
  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      {items.length > 0 && (
        <View style={styles.container}>
          <DisplayCard data={items[0]} count={sumType1} />
          <DisplayCard data={items[1]} count={sumType2} />
          <DisplayCard data={items[2]} count={sumType3} />
          <DisplayCard data={items[3]} count={sumType4} />
        </View>
      )}
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

export default Category
