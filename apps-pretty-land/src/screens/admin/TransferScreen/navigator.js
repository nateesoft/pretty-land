import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import TransferListToConfirmScreen from "./transferListToConfirm"
import ConfirmTransferTaskScreen from "./confirmTransferTask"

import { LogoTitle } from "../../../components/Header"

const Stack = createStackNavigator()

const StackNavigator = ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Transfer-List-To-Confirm"
        component={TransferListToConfirmScreen}
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
        name="Transfer-Detail"
        component={ConfirmTransferTaskScreen}
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
