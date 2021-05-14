import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

/* all screen */
import HomeScreen from "./HomeScreen"
import WorkScreen from "./WorkScreen"
import ProfileScreen from "./ProfileScreen"

/* Logout */
import LogoutScreen from "../logout"

const Tab = createBottomTabNavigator()

const PartnerNavigator = ({ navigation, route }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="p-Home" component={HomeScreen} />
      <Tab.Screen name="p-Work" component={WorkScreen} />
      <Tab.Screen name="p-Profile" component={ProfileScreen} />
      <Tab.Screen name="p-Logout" component={LogoutScreen} />
    </Tab.Navigator>
  )
}

export default PartnerNavigator
