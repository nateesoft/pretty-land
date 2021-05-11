import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
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
import LogoutScreen from '../screens/logout';

const Tab = createBottomTabNavigator()
const loginAs = "customer"

const AppNavigation = () => {
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
      <Tab.Navigator>
        <Tab.Screen
          name="c-Home"
          component={CustomerHome}
          options={{
            tabBarLabel: "หน้าหลัก",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="firebase" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen name="c-Work" component={CustomerWork} 
        options={{
          tabBarLabel: 'รายการโพสท์',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="charity" color={color} size={size} />
          ),
        }} />
        <Tab.Screen
          name="c-Profile"
          component={CustomerProfile}
          options={{
            tabBarLabel: "ข้อมูลส่วนตัว",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="card-account-details"
                color={color}
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
              <MaterialCommunityIcons
                name="logout"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    )
  }
}

export default AppNavigation
