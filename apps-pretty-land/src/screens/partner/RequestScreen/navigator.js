import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import ListMyRequestWork from "./listMyRequest"
import WorkDetailScreen from "./workDetail"

import { LogoTitle } from "../../../components/Header"

const Stack = createStackNavigator()

const RequestScreenNavigator = ({ navigation, route }) => {
  const { userId } = route.params

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="List-My-Work"
        component={ListMyRequestWork}
        options={{
          title: "Back",
          headerStyle: {
            backgroundColor: "#ff2fe6"
          },
          headerTintColor: "white",
          headerTitle: (props) => <LogoTitle title="Pretty Land" {...props} />
        }}
        initialParams={{ partnerType: "all", userId }}
      />
      <Stack.Screen
        name="Work-Detail"
        component={WorkDetailScreen}
        options={{
          title: "Back",
          headerStyle: {
            backgroundColor: "#ff2fe6"
          },
          headerTintColor: "white",
          headerTitle: (props) => <LogoTitle title="Pretty Land" {...props} />
        }}
        initialParams={{ partnerType: "all", userId }}
      />
    </Stack.Navigator>
  )
}

export default RequestScreenNavigator
