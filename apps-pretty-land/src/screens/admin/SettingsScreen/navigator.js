import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import SettingsCategoryScreen from "./settingsCategory"
import ViewSettingsForm from "./viewSettingsForm"
import NewAdminFormScreen from "./addNewAdmin"

import { LogoTitle } from "../../../components/Header"

const Stack = createStackNavigator()

const AdminSettingsNavigator = ({ navigation, route }) => {
  const { userId } = route.params

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
          headerTitle: (props) => <LogoTitle title="Pretty Land" {...props} />,
        }}
        initialParams={{userId}}
      />
      <Stack.Screen
        name="View-Settings"
        component={ViewSettingsForm}
        options={{
          title: "Edit-Admin-Profile",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "white",
          headerTitle: (props) => <LogoTitle title="Pretty Land" {...props} />,
        }}
        initialParams={{userId}}
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
          headerTitle: (props) => <LogoTitle title="Pretty Land" {...props} />,
        }}
        initialParams={{userId}}
      />
    </Stack.Navigator>
  )
}

export default AdminSettingsNavigator
