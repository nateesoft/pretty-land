import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {
  createBottomStackNavigator,
  createStackNavigator,
} from "@react-navigation/stack"
import { MaterialCommunityIcons } from "@expo/vector-icons"

/* admin */
import AdminHomeScreen from "../screens/admin/HomeScreen"
import AdminWorkScreen from "../screens/admin/WorkScreen"
import AdminProfileScreen from "../screens/admin/ProfileScreen"
/* partner */
import PartnerHomeScreen from "../screens/partner/HomeScreen"
import PartnerWorkScreen from "../screens/partner/WorkScreen"
import PartnerProfileScreen from "../screens/partner/ProfileScreen"
/* customer */
import CustomerHome from "../screens/customer/HomeScreen/navigator"
import CustomerWork from "../screens/customer/WorkScreen/navigator"
import CustomerProfile from "../screens/customer/ProfileScreen/navigator"
/* Logout */
import LogoutScreen from "../screens/logout"

/* Login */
import LoginScreen from "../screens/login"
import LoginForm from "../screens/login/loginForm"
import WalkthroughScreen from "../screens/walkthrough"

/* icons */
import HomeIcon from "../../assets/icons/home.png"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const loginAs = ""

const AppNavigation = () => {
  if (loginAs === "") {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{
            title: "Home",
            headerStyle: {
              backgroundColor: "#ff2fe6",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Login-Form"
          component={LoginForm}
          options={{
            title: "Login Form",
            headerStyle: {
              backgroundColor: "#ff2fe6",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    )
  }
  if (loginAs === "intro") {
    return (
      <Tab.Navigator>
        <Tab.Screen name="walkthrough" component={WalkthroughScreen} />
      </Tab.Navigator>
    )
  }
  if (loginAs === "admin") {
    return (
      <Tab.Navigator>
        <Tab.Screen name="a-Home" component={AdminHomeScreen} />
        <Tab.Screen name="a-Work" component={AdminWorkScreen} />
        <Tab.Screen name="a-Profile" component={AdminProfileScreen} />
      </Tab.Navigator>
    )
  }
  if (loginAs === "partner") {
    return (
      <Tab.Navigator>
        <Tab.Screen name="p-Home" component={PartnerHomeScreen} />
        <Tab.Screen name="p-Work" component={PartnerWorkScreen} />
        <Tab.Screen name="p-Profile" component={PartnerProfileScreen} />
      </Tab.Navigator>
    )
  }
  if (loginAs === "customer") {
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
}

export default AppNavigation
