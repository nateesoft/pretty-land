import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import PostListToConfirmScreen from "./memberList"
import ConfirmTaskScreen from "./memberDetail"

import { LogoTitle } from "../../../components/Header"

const Stack = createStackNavigator()

const StackNavigator = ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="List-All-Member"
        component={PostListToConfirmScreen}
        options={{
          title: "Back",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "white",
          headerTitle: (props) => <LogoTitle title="Pretty Land" {...props} />,
        }}
        initialParams={{ partnerType: "all" }}
      />
      <Stack.Screen
        name="Member-Detail"
        component={ConfirmTaskScreen}
        options={{
          title: "Back",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "white",
          headerTitle: (props) => <LogoTitle title="Pretty Land" {...props} />,
        }}
        initialParams={{ partnerType: "all" }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigator
