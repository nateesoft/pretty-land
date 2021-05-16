import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import PostListAllScreen from "./postListAll"
import DetailTaskScreen from "./detailTask"
import VerifyPaymentSlipScreen from "./verifyPaymentSlip"

import { LogoTitle } from "../../../components/Header"

const Stack = createStackNavigator()

const StackNavigator = ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Post-List-All"
        component={PostListAllScreen}
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
        name="Detail-Task"
        component={DetailTaskScreen}
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
        name="Verify-Payment-Slip"
        component={VerifyPaymentSlipScreen}
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
