import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import MemberAllListScreen from "./memberList"
import MemberDetailScreen from "./memberDetail"

import { LogoTitle } from "../../../components/Header"

const Stack = createStackNavigator()

const StackNavigator = ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="List-All-Member"
        component={MemberAllListScreen}
        options={{
          title: "Back",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "white",
          headerTitle: (props) => <LogoTitle title="Pretty Land" {...props} />,
        }}
      />
      <Stack.Screen
        name="Member-Detail"
        component={MemberDetailScreen}
        options={{
          title: "Back",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "white",
          headerTitle: (props) => <LogoTitle title="Pretty Land" {...props} />,
        }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigator
