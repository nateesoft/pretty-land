import React, { useState, useEffect, useRef } from "react"
import {
  StyleSheet,
  View,
  ImageBackground,
  Alert,
  TextInput,
  SafeAreaView
} from "react-native"
import { Button, Text } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"
import * as Notifications from "expo-notifications"
import Constants from "expo-constants"

import { AppConfig } from "../../../Constants"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
})

const SendBroadcast = ({ navigation, route }) => {
  const [expoToken, setExpoToken] = useState("")
  const [msgTitle, setMsgTitle] = useState("")
  const [msgBody, setMsgBody] = useState("")

  const [expoPushToken, setExpoPushToken] = useState("")
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  const sendData = () => {
    if (!expoToken) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุ Token สำหรับส่งข้อมูล")
      return
    }
    if (!msgTitle) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุ หัวข้อสำหรับส่ง")
      return
    }
    if (!msgBody) {
      Alert.alert("แจ้งเตือน", "กรุณาระบุ รายละเอียดข้อมูล")
      return
    }
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification)
      })

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response)
      })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  return (
    <ImageBackground
      source={AppConfig.bgImage}
      style={styles.imageBg}
      resizeMode="contain"
    >
      <Text style={styles.textTopic}>Broadcast</Text>
      <SafeAreaView
        style={{
          flex: 1,
          height: "100%",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <View style={{ margin: 10 }}>
          <Text style={{ fontSize: 18 }}>
            To (Expo push token from your app)
          </Text>
          <View style={styles.formControl}>
            <TextInput
              style={styles.textInput}
              onChangeText={(value) => setExpoToken(value)}
              value={expoToken}
              placeholder="ExponentPushToken[**********************]"
            />
          </View>
        </View>
        <View style={{ margin: 10 }}>
          <Text style={{ fontSize: 18 }}>Message title</Text>
          <View style={styles.formControl}>
            <TextInput
              style={styles.inputForm}
              onChangeText={(value) => setMsgTitle(value)}
              value={msgTitle}
              secureTextEntry={true}
              placeholder=""
            />
          </View>
        </View>
        <View style={{ margin: 10 }}>
          <Text style={{ fontSize: 18 }}>Message body</Text>
          <View style={styles.formControl}>
            <TextInput
              style={styles.inputForm}
              onChangeText={(value) => setMsgBody(value)}
              value={msgBody}
              secureTextEntry={true}
              placeholder=""
            />
          </View>
        </View>
        <Button
          icon={
            <Icon
              name="send"
              size={20}
              color="white"
              style={{ marginRight: 5 }}
            />
          }
          iconLeft
          buttonStyle={styles.btnSend}
          title="ส่งข้อมูล"
          onPress={async () => {
            await schedulePushNotification()
          }}
        />
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  btnSend: {
    margin: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
    backgroundColor: "#ff2fe6"
  },
  cardDetail: {
    alignItems: "center",
    padding: 5,
    margin: 10
  },
  optionsNameDetail: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginBottom: 15,
    marginTop: 10
  },
  optionsNameDetail2: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginBottom: 15,
    marginTop: 10
  },
  textTopic: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    backgroundColor: "#ff2fe6",
    padding: 10
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  inputForm: {
    width: "90%",
    textAlign: "center",
    fontSize: 16,
    marginVertical: 5
  },
  formControl: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    paddingHorizontal: 10,
    borderColor: "#ff2fe6",
    marginTop: 5,
    height: 50,
    borderRadius: 10
  },
  textInput: {
    width: "90%",
    textAlign: "center",
    fontSize: 16,
    marginVertical: 5
  }
})

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" }
    },
    trigger: { seconds: 2 }
  })
}

async function registerForPushNotificationsAsync() {
  let token
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!")
      return
    }
    token = (await Notifications.getExpoPushTokenAsync()).data
    console.log(token)
  } else {
    alert("Must use physical device for Push Notifications")
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C"
    })
  }

  return token
}

export default SendBroadcast
