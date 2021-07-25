import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import ViewProfileScreen from "./viewProfile"
import { LogoTitle } from "../../../components/Header"

const Stack = createStackNavigator()

const ProfileNavigator = ({ navigation, route }) => {
  const { userId, status } = route.params
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="View-Admin-Profile"
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
        initialParams={{userId, status}}
      />
    </Stack.Navigator>
  )
}

export default ProfileNavigator
