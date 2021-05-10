import React from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import { Button } from "react-native-elements"
import { Video } from "expo-av"

const { width } = Dimensions.get("window")
const height = (width * 100) / 60

const DetailScreen3 = ({ navigation }) => {
  const video = React.useRef(null)
  const [status, setStatus] = React.useState({})

  return (
    <View style={style.container}>
      <Video
        ref={video}
        source={{ uri: "https://www.w3schools.com/html/mov_bbb.mp4" }}
        style={style.backgroundVideo}
        resizeMode="contain"
        isLooping
        isMuted
        useNativeControls
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    width,
    height,
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})

export default DetailScreen3
