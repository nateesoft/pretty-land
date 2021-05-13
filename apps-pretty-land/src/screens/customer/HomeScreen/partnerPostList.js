import React from "react"
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableHighlight,
} from "react-native"
import { getCountryCount } from "../../../data/apis"

import { country } from "../../../data/items"

const PartnerPostList = ({ navigation, route }) => {
  const { item: data } = route.params

  const onPressCreateItem = (item) => {
    navigation.navigate("Create-Post-Form", { data, item })
  }

  const renderCategory = ({ item }) => (
    <View style={styles.categoriesItemContainer}>
      <Text style={styles.categoriesName}>
        {item.name} ({getCountryCount(item.id, data.type)})
      </Text>
    </View>
  )

  return (
    <View style={styles.cardDetail}>
      <Text style={styles.optionsNameDetail}>{data.title}</Text>
      <Image style={styles.optionsPhoto} source={data.img} />
      <Text style={styles.optionsInfo}>{data.info}</Text>
      <FlatList
        data={country}
        renderItem={renderCategory}
        keyExtractor={(item) => `${item.id}`}
      />
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
  optionsInfo: {
    marginTop: 3,
    marginBottom: 5,
    fontSize: 15,
  },
  optionsNameDetail: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginBottom: 15,
    marginTop: 10,
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
  categoriesItemContainer: {
    flex: 1,
    margin: 10,
    padding: 10,
    justifyContent: "center",
    height: 50,
    borderColor: "#cccccc",
    borderWidth: 0.5,
    borderRadius: 10,
    width: 350,
  },
  categoriesName: {
    fontSize: 16,
    color: "blue",
  },
})

export default PartnerPostList
