import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { getFocusedRouteNameFromRoute } from "@react-navigation/native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

/* customer */
import CustomerHome from "./HomeScreen/navigator"
import CustomerWork from "./WorkScreen/navigator"
import CustomerProfile from "./ProfileScreen/navigator"

/* Logout */
import LogoutScreen from "../logout"

const Tab = createBottomTabNavigator()

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed"

  switch (routeName) {
    case "Feed":
      return "News feed"
    case "Profile":
      return "My profile"
    case "Account":
      return "My account"
  }
}

const CustomerNavigator = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) })
  }, [navigation, route])

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
        component={CustomerHome}
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
        component={CustomerWork}
        options={{
          tabBarLabel: "รายการโพสท์",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="post" color="white" size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="c-Profile"
        component={CustomerProfile}
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
        name="c-More"
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
