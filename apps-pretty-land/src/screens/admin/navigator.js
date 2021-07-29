import React, { useEffect, useState } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {
  Ionicons,
  MaterialIcons,
  Feather,
  MaterialCommunityIcons
} from "@expo/vector-icons"
import { Alert } from "react-native"
import { Audio } from "expo-av"

/* all screen */
import CustomerPostNavigator from "./CustomerPostScreen/navigator"
import MemberNavigator from "./MemberScreen/navigator"
import ProfileNavigator from "./ProfileScreen/navigator"
import SettingsNavigator from "./SettingsScreen/navigator"

/* Logout */
import LogoutScreen from "../logout"
import firebase from "../../../util/firebase"
import { getDocument } from "../../../util"
import { getAdminNewPostFromDb, getAdminNewMemberFromDb } from "../../apis"
import SoundFile from "../../../assets/sound/noti.wav"

const Tab = createBottomTabNavigator()

const AdminNavigator = ({ navigation, route }) => {
  const { userId, screen } = route.params
  const [postNewCount, setPostNewCount] = useState([])
  const [memberCount, setMemberCount] = useState(0)

  const [sound, setSound] = React.useState()

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(SoundFile)
    setSound(sound)

    console.log("Playing Sound")
    await sound.playAsync()
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound")
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  useEffect(() => {
    const ref = firebase.database().ref(getDocument(`message_alert`))
    const listener = ref.on("value", (snapshot) => {
      getAdminNewPostFromDb(userId)
        .then((res) => setPostNewCount(res))
        .catch((err) => Alert.alert(err))

      getAdminNewMemberFromDb()
        .then(async (res) => {
          if (res > 0) {
            playSound()
          }
          setMemberCount(res)
        })
        .catch((err) => Alert.alert(err))
    })
    return () => ref.off("value", listener)
  }, [])

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "purple",
        inactiveTintColor: "white",
        style: {
          backgroundColor: "#ff2fe6"
        }
      }}
    >
      <Tab.Screen
        name="a-Task"
        component={CustomerPostNavigator}
        options={{
          title: "โพสท์ทั้งหมด",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="fact-check" color="white" size={size} />
          ),
          tabBarBadge: postNewCount ? postNewCount : null,
          tabBarBadgeStyle: {
            backgroundColor: "rgb(70, 240, 238)",
            color: "red"
          }
        }}
        initialParams={{ userId }}
      />
      <Tab.Screen
        name="a-Member"
        component={MemberNavigator}
        options={{
          title: "สมาชิกในระบบ",
          tabBarIcon: ({ color, size }) => (
            <Feather name="users" color="white" size={size} />
          ),
          tabBarBadge: memberCount ? memberCount : null,
          tabBarBadgeStyle: {
            backgroundColor: "rgb(70, 240, 238)",
            color: "red"
          }
        }}
        initialParams={{ userId }}
      />
      <Tab.Screen
        name="a-Profile"
        component={ProfileNavigator}
        options={{
          title: "ข้อมูลส่วนตัว",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="card-account-details"
              color="white"
              size={size}
            />
          )
        }}
        initialParams={{ userId }}
      />
      <Tab.Screen
        name="a-Settings"
        component={SettingsNavigator}
        options={{
          title: "ตั้งค่าระบบ",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-settings-outline" color="white" size={size} />
          )
        }}
        initialParams={{ userId, role: screen }}
      />
      <Tab.Screen
        name="a-Logout"
        component={LogoutScreen}
        options={{
          title: "Logout",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="logout" color="white" size={size} />
          )
        }}
        initialParams={{ userId }}
      />
    </Tab.Navigator>
  )
}

export default AdminNavigator
