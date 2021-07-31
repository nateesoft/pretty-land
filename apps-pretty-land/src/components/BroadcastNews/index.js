import React, { useState } from "react"
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image
} from "react-native"
import { Button } from "react-native-elements"
import { AntDesign } from "react-native-vector-icons"
import * as WebBrowser from "expo-web-browser"
import * as Linking from "expo-linking"

import firebase from "../../../util/firebase"
import { getDocument } from "../../../util"

// onPress={() => Linking.openURL("https://pretty-land.web.app/")
// onPress={() => WebBrowser.openBrowserAsync("https://pretty-land.web.app/")

const BroadcastNews = ({
  visible,
  title,
  link,
  external = true,
  imageUrl,
  userId,
  id
}) => {
  const [modalVisible, setModalVisible] = useState(visible)
  const openBrowser = (to, broadcastId, userId) => {
    if (external) {
      Linking.openURL(to)
    } else {
      WebBrowser.openBrowserAsync(to)
    }
    handleClose(broadcastId, userId)
  }

  const handleClose = (broadcastId, userId) => {
    setModalVisible(!modalVisible)
    firebase
      .database()
      .ref(getDocument(`broadcast_news/${broadcastId}/users/${userId}`))
      .update({
        userId: userId
      })
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.")
        setModalVisible(!modalVisible)
      }}
      presentationStyle="overFullScreen"
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{title}</Text>
          <TouchableHighlight
            underlayColor="white"
            onPress={() => openBrowser(link, id, userId)}
          >
            <Image
              source={{ uri: imageUrl }}
              style={{
                width: 300,
                height: 350,
                padding: 10,
                margin: 10,
                borderRadius: 20
              }}
            />
          </TouchableHighlight>
          <Button
            buttonStyle={{ backgroundColor: "red" }}
            icon={
              <AntDesign
                name="close"
                color="white"
                size={20}
                style={{ marginRight: 5 }}
              />
            }
            title="ปิดหน้าต่าง"
            onPress={() => handleClose(id, userId)}
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalView: {
    backgroundColor: "orange",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 5,
    borderColor: "snow"
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: 250
  },
  buttonOpen: {
    backgroundColor: "#F194FF"
  },
  buttonClose: {
    backgroundColor: "red"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
    fontSize: 18
  },
  modalText: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "white"
  }
})

export default BroadcastNews
