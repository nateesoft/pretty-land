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
import bgImage from "../../../../assets/bg.png"

const widthFix = (Dimensions.get("window").width * 70) / 120

const Category = ({ navigation, route }) => {
  const { userId } = route.params
  const [items, setItems] = useState([])
  const [profile, setProfile] = useState({})

  useEffect(() => {
    const ref = firebase.database().ref(`members/${userId}`)
    ref.once("value", (snapshot) => {
      setProfile({ ...snapshot.val() })
    })
  }, [])

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
    })

    return () => ref.off("value", listener)
  }, [])

  const onPressOptions = (item) => {
    navigation.navigate("Select-Province-Task-List", { profile, item })
  }

  const DisplayCard = ({ data }) => (
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
        <Text>จำนวนโพสท์ 0 รายการ</Text>
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
          {profile.type1 && <DisplayCard data={items[0]} />}
          {profile.type2 && <DisplayCard data={items[1]} />}
          {profile.type3 && <DisplayCard data={items[2]} />}
          {profile.type4 && <DisplayCard data={items[3]} />}
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
