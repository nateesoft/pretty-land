import React, { useEffect, useState } from "react"
import { Alert } from "react-native"
import { StyleSheet, View, ImageBackground, Image, Linking } from "react-native"
import { Button, Text } from "react-native-elements"

import bgImage from "../../../../assets/bg.png"
import lineLogo from "../../../../assets/icons/LINE_APP.png"
import firebase from "../../../../util/firebase"
import { getDocument } from "../../../../util"

const ViewContact = ({ navigation, route }) => {
  const { userId } = route.params
  const [profile, setProfile] = useState({})

  const LinkToLineContact = () => {
    Linking.openURL(lineContact)
  }

  const getProfileFromDB = (userId) => {
    return new Promise((resolve, reject) => {
      const ref = firebase.database().ref(getDocument(`members/${userId}`))
      ref.once("value", (snapshot) => {
        const data = { ...snapshot.val() }
        setProfile(data)
      })
      resolve(true)
    })
  }

  useEffect(() => {
    getProfileFromDB(userId).catch((err) => Alert.alert(err))
  }, [])

  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <View style={{ alignItems: "center", margin: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>ข้อมูลสมาชิก</Text>
      </View>
      <View
        style={{
          borderWidth: 2,
          borderRadius: 15,
          padding: 10,
          margin: 10,
          borderColor: "pink",
        }}
      >
        <Text style={{ fontSize: 14 }}>Id: {profile.id}</Text>
        <Text style={{ fontSize: 14 }}>ชื่อสมาชิก: {profile.profile}</Text>
        <Text style={{ fontSize: 14 }}>
          ระดับ Level: {profile.customerLevel}
        </Text>
      </View>
      <View style={styles.cardDetail}>
        <Text style={styles.textTopic}>ติดต่อ Admin</Text>
        <Button
          icon={
            <Image
              source={lineLogo}
              style={{ width: 24, height: 24, marginRight: 10 }}
            />
          }
          iconLeft
          buttonStyle={styles.btnContactLineButton}
          title="LINE CONNECT"
          onPress={() => LinkToLineContact()}
        />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  btnContactLineButton: {
    margin: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
    backgroundColor: "#35D00D",
  },
  cardDetail: {
    flex: 1,
    alignItems: "center",
    padding: 5,
    margin: 10,
  },
  optionsNameDetail: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginBottom: 15,
    marginTop: 10,
  },
  optionsNameDetail2: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginBottom: 15,
    marginTop: 10,
  },
  viewCard: {
    width: "100%",
    borderRadius: 20,
    padding: 5,
  },
  textTopic: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginBottom: 15,
    marginTop: 10,
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
})

export default ViewContact
