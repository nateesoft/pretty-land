import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import AllTaskListScreen from "./allTaskList"
import TaskDetail from "./taskDetail"

import { LogoTitle } from "../../../components/Header"

const Stack = createStackNavigator()

const StackNavigator = ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="All-Task-List"
        component={AllTaskListScreen}
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
        name="Task-Detail"
        component={TaskDetail}
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
