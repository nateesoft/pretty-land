import React from "react"
import { View } from "react-native"
import { Button, Text } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"

import styles from "../Styles"

const DetailScreen2 = ({ navigation }) => {

  return (
    <View style={styles.cardDetail}>
      <Text>Customer-Work-Detail-02</Text>
      <Button
        icon={<Icon name="arrow-right" size={15} color="white" />}
        iconRight
        buttonStyle={{ margin: 15 }}
        title="CONFIRM SELECT"
        onPress={() => navigation.navigate("Customer-Work-Detail")}
      />
    </View>
  )
}

export default DetailScreen2
