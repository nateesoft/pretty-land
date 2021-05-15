import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import ListMyWorkScreen from "./listMyWork"
import WorkDetailScreen from "./workDetail"

import { LogoTitle } from "../../../components/Header"

const Stack = createStackNavigator()

const StackNavigator = ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="List-My-Work"
        component={ListMyWorkScreen}
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
        name="Work-Detail"
        component={WorkDetailScreen}
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
