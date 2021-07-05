import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {
  FontAwesome5,
  Foundation,
  MaterialCommunityIcons,
} from "@expo/vector-icons"

/* all screen */
import HomeNavigator from "./HomeScreen/navigator"
import WorkNavigator from "./WorkScreen/navigator"
import ProfileNavigator from "./ProfileScreen/navigator"

/* Logout */
import LogoutScreen from "../logout"

const Tab = createBottomTabNavigator()

const PartnerNavigator = ({ navigation, route }) => {
  const { userId, status } = route.params
  
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
        name="p-Home"
        component={HomeNavigator}
        options={{
          title: "โหมดงาน",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="kiss-wink-heart" color="white" size={size} />
          ),
        }}
        initialParams={{ userId, status }}
      />
      <Tab.Screen
        name="p-Work"
        component={WorkNavigator}
        options={{
          title: "งานของฉัน",
          tabBarIcon: ({ color, size }) => (
            <Foundation name="social-foursquare" color="white" size={size} />
          ),
        }}
        initialParams={{ userId, status }}
      />
      <Tab.Screen
        name="p-Profile"
        component={ProfileNavigator}
        options={{
          title: "ข้อมูลส่วนตัว",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="card-account-details"
              color="white"
              size={size}
            />
          ),
        }}
        initialParams={{ userId, status }}
      />
      <Tab.Screen
        name="p-Logout"
        component={LogoutScreen}
        options={{
          title: "Logout",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="logout" color="white" size={size} />
          ),
        }}
        initialParams={{ userId, status }}
      />
    </Tab.Navigator>
  )
}

export default PartnerNavigator
