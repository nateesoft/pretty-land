import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {
  Ionicons,
  MaterialIcons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons"

/* all screen */
import TaskNavigator from "./CustomerPostScreen/navigator"
import MemberNavigator from "./MemberScreen/navigator"
import ProfileNavigator from "./ProfileScreen/navigator"
import SettingsNavigator from "./SettingsScreen/navigator"

/* Logout */
import LogoutScreen from "../logout"

const Tab = createBottomTabNavigator()

const AdminNavigator = ({ navigation, route }) => {
  const { userId, screen } = route.params

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
        name="a-Member"
        component={MemberNavigator}
        options={{
          title: "สมาชิกในระบบ",
          tabBarIcon: ({ color, size }) => (
            <Feather name="users" color="white" size={size} />
          ),
        }}
        initialParams={{ userId }}
      />
      <Tab.Screen
        name="a-Task"
        component={TaskNavigator}
        options={{
          title: "โพสท์ทั้งหมด",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="fact-check" color="white" size={size} />
          ),
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
          ),
        }}
        initialParams={{ userId }}
      />
      {screen === "superadmin" && (
        <Tab.Screen
          name="a-Settings"
          component={SettingsNavigator}
          options={{
            title: "ตั้งค่าระบบ",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-settings-outline" color="white" size={size} />
            ),
          }}
          initialParams={{ userId }}
        />
      )}
      <Tab.Screen
        name="a-Logout"
        component={LogoutScreen}
        options={{
          title: "Logout",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="logout" color="white" size={size} />
          ),
        }}
        initialParams={{ userId }}
      />
    </Tab.Navigator>
  )
}

export default AdminNavigator
