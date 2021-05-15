import React from "react"
import { StyleSheet, TouchableHighlight, View, Text, Image } from "react-native"

/* import data */
import { getPartnerGroup } from "../../../data/apis"

const PartnerCategory = ({ navigation }) => {
  const [items, setItems] = React.useState(getPartnerGroup)
  const onPressOptions = (item) => {
    if (item.postQty === 0) {
      navigation.navigate("Create-Post-Form", { item })
    } else {
      navigation.navigate("c-Work", {
        screen: "Post-List",
        params: { partnerType: item.type },
      })
    }
  }

  const DisplayCard = ({ data }) => (
    <TouchableHighlight
      underlayColor="pink"
      onPress={() => onPressOptions(data)}
      style={styles.box}
    >
      <View style={styles.inner}>
        <Image
          source={data.img}
          style={{ height: 280, width: "90%", margin: 5 }}
        />
        <Text style={styles.optionsName}>{data.title}</Text>
        <Text style={styles.optionsInfo}>({data.info})</Text>
      </View>
    </TouchableHighlight>
  )
  return (
    <View style={styles.container}>
      <DisplayCard data={items[0]} />
      <DisplayCard data={items[1]} />
      <DisplayCard data={items[2]} />
      <DisplayCard data={items[3]} />
    </View>
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
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
})

export default PartnerCategory
