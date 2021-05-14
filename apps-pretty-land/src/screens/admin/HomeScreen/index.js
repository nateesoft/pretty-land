import React from "react"
import { Button, View, Text } from "react-native"

const HomeScreen = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Home Screen</Text>
      <Button 
        title="Go to Work"
        onPress={() => navigation.navigate("a-Work")}
      />
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("a-Profile")}
      />
    </View>
  )
}

export default HomeScreen
