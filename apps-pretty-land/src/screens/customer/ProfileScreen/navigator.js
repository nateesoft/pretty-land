import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import ViewProfileScreen from "./viewProfile"

const Stack = createStackNavigator()

const TabNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="View-Profile"
        component={ViewProfileScreen}
        options={{
          title: "แก้ไขข้อมูลส่วนตัว",
        }}
      />
    </Stack.Navigator>
  )
}

export default TabNavigator
