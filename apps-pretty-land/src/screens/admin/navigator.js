import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Foundation, MaterialIcons, Feather, MaterialCommunityIcons } from "@expo/vector-icons"

/* all screen */
import TaskNavigator from "./TaskScreen/navigator"
import TransferNavigator from "./TransferScreen/navigator"
import MemberNavigator from "./MemberScreen/navigator"
import ProfileNavigator from './ProfileScreen/navigator'

/* Logout */
import LogoutScreen from "../logout"

const Tab = createBottomTabNavigator()

const AdminNavigator = ({ navigation, route }) => {
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
        name="a-Task"
        component={TaskNavigator}
        options={{
          title: "โพสท์ใหม่",
          tabBarIcon: ({ color, size }) => (
            <Foundation name="burst-new" color="white" size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="a-Transfer"
        component={TransferNavigator}
        options={{
          title: "ตรวจเงินโอน",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="fact-check" color="white" size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="a-Member"
        component={MemberNavigator}
        options={{
          title: "สมาชิกในระบบ",
          tabBarIcon: ({ color, size }) => (
            <Feather name="users" color="white" size={size} />
          ),
        }}
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
          ),
        }}
      />
      <Tab.Screen
        name="a-Logout"
        component={LogoutScreen}
        options={{
          title: "Logout",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="logout" color="white" size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default AdminNavigator
