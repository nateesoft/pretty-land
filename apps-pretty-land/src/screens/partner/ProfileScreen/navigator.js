import React, { useContext } from "react"
import { createStackNavigator } from "@react-navigation/stack"

import { Context as AuthContext } from "../../../context/AuthContext"

import ProfileHomeScreen from "./Home"
import RegisterPlanForm from "./registerPlanForm"
import RegisterPartnerForm from "./registerPartner"
import RegisterPartnerBankForm from "./registerBankForm"
import RegisterPartnerImageUpload from "./registerImageUpload"

import { LogoTitle } from "../../../components/Header"

const Stack = createStackNavigator()

const TabNavigator = ({ navigation, route }) => {
  const { userId, status } = route.params

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile-Home"
        component={ProfileHomeScreen}
        options={{
          title: "Back",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "white",
          headerTitle: (props) => <LogoTitle title="Pretty Land" {...props} />,
        }}
        initialParams={{ userId, status }}
      />
      <Stack.Screen
        name="Register-Plan-Form"
        component={RegisterPlanForm}
        options={{
          title: "Back",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "white",
          headerTitle: (props) => <LogoTitle title="Pretty Land" {...props} />,
        }}
        initialParams={{ userId, status }}
      />
      <Stack.Screen
        name="Register-Partner-Form"
        component={RegisterPartnerForm}
        options={{
          title: "Back",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "white",
          headerTitle: (props) => <LogoTitle title="Pretty Land" {...props} />,
        }}
        initialParams={{ userId, status }}
      />
      <Stack.Screen
        name="Partner-Register-Bank-Form"
        component={RegisterPartnerBankForm}
        options={{
          title: "Back",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "white",
          headerTitle: (props) => <LogoTitle title="Pretty Land" {...props} />,
        }}
        initialParams={{ userId, status }}
      />
      <Stack.Screen
        name="Partner-Register-Image-Upload"
        component={RegisterPartnerImageUpload}
        options={{
          title: "Back",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "white",
          headerTitle: (props) => <LogoTitle title="Pretty Land" {...props} />,
        }}
        initialParams={{ userId, status }}
      />
    </Stack.Navigator>
  )
}

export default TabNavigator
