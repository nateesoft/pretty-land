import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import SettingsCategoryScreen from "./settingsCategory"
import ViewProfileScreen from "./viewSettings"
import NewAdminFormScreen from "./addNewAdmin"

import { LogoTitle } from "../../../components/Header"

const Stack = createStackNavigator()

const TabNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings-Category"
        component={SettingsCategoryScreen}
        options={{
          title: "Back",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "white",
          headerTitle: (props) => (
            <LogoTitle title="Pretty Land" {...props} />
          ),
        }}
      />
      <Stack.Screen
        name="View-Settings"
        component={ViewProfileScreen}
        options={{
          title: "Edit-Admin-Profile",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "white",
          headerTitle: (props) => (
            <LogoTitle title="Pretty Land" {...props} />
          ),
        }}
      />
      <Stack.Screen
        name="New-Admin-Form"
        component={NewAdminFormScreen}
        options={{
          title: "Edit-Admin-Profile",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "white",
          headerTitle: (props) => (
            <LogoTitle title="Pretty Land" {...props} />
          ),
        }}
      />
    </Stack.Navigator>
  )
}

export default TabNavigator
