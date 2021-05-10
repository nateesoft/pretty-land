import React from "react"
import { View, Text, Image, FlatList, TouchableHighlight } from "react-native"
import { getCountryCount } from "../../../data/MockDataAPI"

import { country } from "../../../data/items"
import styles from "../Styles"

const DetailScreen = ({ navigation, route }) => {
  const { item: data } = route.params

  const onPressCreateItem = (item) => {
    navigation.navigate("Customer-Home-Detail2", { data, item })
  }

  const renderCategory = ({ item }) => (
    <TouchableHighlight
      underlayColor="pink"
      onPress={() => onPressCreateItem(item)}
    >
      <View style={styles.categoriesItemContainer}>
        <Text style={styles.categoriesName}>
          {item.name} ({getCountryCount(item.id, data.type)})
        </Text>
      </View>
    </TouchableHighlight>
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

export default DetailScreen
