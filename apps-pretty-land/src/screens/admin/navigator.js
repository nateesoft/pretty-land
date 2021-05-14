import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

/* all screen */
import HomeScreen from "./HomeScreen"
import WorkScreen from "./WorkScreen"
import ProfileScreen from "./ProfileScreen"

/* Logout */
import LogoutScreen from "../logout"

const Tab = createBottomTabNavigator()

const AdminNavigator = ({ navigation, route }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="a-Home" component={HomeScreen} />
      <Tab.Screen name="a-Work" component={WorkScreen} />
      <Tab.Screen name="a-Profile" component={ProfileScreen} />
      <Tab.Screen name="a-Logout" component={LogoutScreen} />
    </Tab.Navigator>
  )
}

export default AdminNavigator
