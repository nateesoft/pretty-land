import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from "@expo/vector-icons"

/* all screen */
import HomeScreen from "./HomeScreen/navigator"
import WorkScreen from "./WorkScreen/navigator"
import ProfileScreen from "./ProfileScreen/navigator"

/* Logout */
import LogoutScreen from "../logout"

const Tab = createBottomTabNavigator()

const CustomerNavigator = ({ navigation, route }) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "purple",
        inactiveTintColor: "white",
        style: {
          backgroundColor: "#ff2fe6",
        },
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
          color: "white",
        }}
      />
      <Tab.Screen
        name="c-Work"
        component={WorkScreen}
        options={{
          tabBarLabel: "รายการโพสท์",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="post" color="white" size={size} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="c-Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "ข้อมูลส่วนตัว",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="card-account-details"
              color="white"
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="c-Logout"
        component={LogoutScreen}
        options={{
          tabBarLabel: "Logout",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="logout" color="white" size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default CustomerNavigator
