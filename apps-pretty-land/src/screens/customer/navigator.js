import React, { useEffect, useState } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"

/* all screen */
import HomeScreen from "./HomeScreen/navigator"
import WorkScreen from "./WorkScreen/navigator"
import ContactAdminScreen from "./ContactAdminScreen/navigator"

/* Logout */
import LogoutScreen from "../logout"
import firebase from "../../../util/firebase"
import { snapshotToArray, getDocument } from "../../../util"
import { AppConfig } from "../../Constants"

const Tab = createBottomTabNavigator()

const CustomerNavigator = ({ navigation, route }) => {
  const { userId, status } = route.params
  const [postsChangeCount, setPostsChangeCount] = useState(0)

  const countPostChange = (snapshot) => {
    return new Promise((resolve, reject) => {
      const data = snapshotToArray(snapshot)
      let count = 0
      for (let i = 0; i < data.length; i++) {
        if (data[i].customerId === userId) {
          if (data[i].status === AppConfig.PostsStatus.adminConfirmNewPost) {
            count = count + 1
          }
        }
      }
      setPostsChangeCount(count)
      resolve(true)
    })
  }

  useEffect(() => {
    const ref = firebase.database().ref(getDocument(`posts`))
    const listener = ref.on("value", (snapshot) => {
      countPostChange(snapshot).catch((err) => Alert.alert(err))
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
        name="c-Home"
        component={HomeScreen}
        options={{
          title: "หน้าหลัก",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color="white" size={size} />
          ),
          color: "white"
        }}
        initialParams={{ userId, status }}
      />
      <Tab.Screen
        name="c-Work"
        component={WorkScreen}
        options={{
          tabBarLabel: "รายการโพสท์",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="post" color="white" size={size} />
          ),
          tabBarBadge: postsChangeCount ? postsChangeCount : null
        }}
        initialParams={{ userId, status }}
      />
      <Tab.Screen
        name="c-Contact-Admin"
        component={ContactAdminScreen}
        options={{
          tabBarLabel: "ติดต่อ Admin",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="contact-phone" color="white" size={size} />
          )
        }}
        initialParams={{ userId, status }}
      />
      <Tab.Screen
        name="c-Logout"
        component={LogoutScreen}
        options={{
          tabBarLabel: "Logout",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="logout" color="white" size={size} />
          )
        }}
        initialParams={{ userId, status }}
      />
    </Tab.Navigator>
  )
}

export default CustomerNavigator
