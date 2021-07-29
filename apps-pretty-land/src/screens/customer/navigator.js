import React, { useEffect, useState } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { Alert } from "react-native"

/* all screen */
import HomeScreen from "./HomeScreen/navigator"
import WorkScreen from "./WorkScreen/navigator"
import ContactAdminScreen from "./ContactAdminScreen/navigator"
import TestSound from "./TestSound"

/* Logout */
import LogoutScreen from "../logout"
import { getCustomerPostChange } from "../../apis"

const Tab = createBottomTabNavigator()

const CustomerNavigator = ({ navigation, route }) => {
  const { userId, status } = route.params
  const [postsChangeCount, setPostsChangeCount] = useState(0)

  useEffect(() => {
    getCustomerPostChange()
      .then((res) => setPostsChangeCount(res))
      .catch((err) => Alert.alert(err))
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
          tabBarBadge: postsChangeCount ? postsChangeCount : null,
          tabBarBadgeStyle: {
            backgroundColor: "rgb(70, 240, 238)",
            color: "red"
          }
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
      {/* <Tab.Screen name="c-TestSound" component={TestSound} /> */}
    </Tab.Navigator>
  )
}

export default CustomerNavigator
