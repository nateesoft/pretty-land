import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  Image,
  ImageBackground,
} from "react-native"

/* import data */
import firebase from "../../../../util/firebase"
import { snapshotToArray, getDocument } from "../../../../util"
import bgImage from "../../../../assets/bg.png"
import { AppConfig } from "../../../Constants"

const PartnerCategory = ({ navigation, route }) => {
  const { userId } = route.params
  const [items, setItems] = useState([])

  const [sumType1, setSumType1] = useState("0")
  const [sumType2, setSumType2] = useState("0")
  const [sumType3, setSumType3] = useState("0")
  const [sumType4, setSumType4] = useState("0")

  const getAllPartnerList = (snapshot) => {
    return new Promise((resolve, reject) => {
      const arr = snapshotToArray(snapshot)
      let type1 = 0,
        type2 = 0,
        type3 = 0,
        type4 = 0
      arr.forEach((item) => {
        if (item.type1) {
          type1 = type1 + 1
        }
        if (item.type2) {
          type2 = type2 + 1
        }
        if (item.type3) {
          type3 = type3 + 1
        }
        if (item.type4) {
          type4 = type4 + 1
        }
      })
      setSumType1(type1)
      setSumType2(type2)
      setSumType3(type3)
      setSumType4(type4)

      resolve(true)
    })
  }

  useEffect(() => {
    const ref = firebase.database().ref(getDocument(`appconfig`))
    ref.once("value", (snapshot) => {
      const dataItems = []
      const appconfig = snapshot.val()
      dataItems.push({ ...appconfig.partner1 })
      dataItems.push({ ...appconfig.partner2 })
      dataItems.push({ ...appconfig.partner3 })
      dataItems.push({ ...appconfig.partner4 })

      setItems(dataItems)
    })
  }, [])

  const onPressOptions = (item) => {
    if (item.name === AppConfig.PartnerType.type4) {
      navigation.navigate("Select-Province-Form-Type4", {
        item,
        partnerGroup: items,
      })
    } else {
      navigation.navigate("Select-Province-Form", { item, partnerGroup: items })
    }
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
          style={{
            height: "80%",
            width: "90%",
            margin: 5,
            borderRadius: 5,
            borderColor: "white",
            borderWidth: 3,
          }}
        />
        <Text style={styles.optionsName}>{data.name}</Text>
        <Text style={{ fontWeight: "bold" }}>จำนวน {count} คน</Text>
      </View>
    </TouchableHighlight>
  )

  useEffect(() => {
    const ref = firebase
      .database()
      .ref(getDocument(`members`))
      .orderByChild("memberType")
      .equalTo("partner")
    const listener = ref.on("value", (snapshot) => {
      getAllPartnerList(snapshot).catch((err) => Alert.alert(err))
    })
    return () => {
      ref.off("value", listener)
    }
  }, [])

  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="contain"
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
    fontSize: 20,
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
