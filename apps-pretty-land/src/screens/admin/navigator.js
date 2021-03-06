import React, { useEffect, useState } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {
  Ionicons,
  MaterialIcons,
  Feather,
  MaterialCommunityIcons
} from "@expo/vector-icons"
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
import SoundFile from "../../../assets/sound/noti.wav"
import { AppConfig } from "../../Constants"

const Tab = createBottomTabNavigator()

const AdminNavigator = ({ navigation, route }) => {
  const { userId, screen } = route.params
  const [memberCount, setMemberCount] = useState(0)
  const [sound, setSound] = useState()

  // async function playSound() {
  //   const { sound } = await Audio.Sound.createAsync(SoundFile)
  //   setSound(sound)

  //   console.log("Playing Sound")
  //   await sound.playAsync()
  // }

  // useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log("Unloading Sound")
  //         sound.unloadAsync()
  //       }
  //     : undefined
  // }, [sound])

  useEffect(() => {
    const ref = firebase
      .database()
      .ref(getDocument(`members`))
      .orderByChild("status")
      .equalTo(AppConfig.MemberStatus.newRegister)
    const listener = ref.on("value", (snapshot) => {
      setMemberCount(snapshot.numChildren())
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
          )
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
