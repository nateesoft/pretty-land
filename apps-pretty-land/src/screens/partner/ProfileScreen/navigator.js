import React, { useContext} from "react"
import { createStackNavigator } from "@react-navigation/stack"

import { Context as AuthContext } from "../../../context/AuthContext"

import RegisterPlanForm from "./registerPlanForm"
import RegisterPartnerForm from "./registerPartner"
import RegisterPartnerBankForm from "./registerBankForm"
import RegisterPartnerImageUpload from "./registerImageUpload"

const Stack = createStackNavigator()

const TabNavigator = ({ navigation, route }) => {
  const { userId, status } = route.params

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register-Plan-Form"
        component={RegisterPlanForm}
        options={{
          title: "ลงทะเบียนผู้ร่วมงาน",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        initialParams={{ userId, status }}
      />
      <Stack.Screen
        name="Register-Partner-Form"
        component={RegisterPartnerForm}
        options={{
          title: "ลงทะเบียนผู้ร่วมงาน",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        initialParams={{ userId, status }}
      />
      <Stack.Screen
        name="Partner-Register-Bank-Form"
        component={RegisterPartnerBankForm}
        options={{
          title: "ลงทะเบียนผู้ร่วมงาน",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        initialParams={{ userId, status }}
      />
      <Stack.Screen
        name="Partner-Register-Image-Upload"
        component={RegisterPartnerImageUpload}
        options={{
          title: "ลงทะเบียนผู้ร่วมงาน",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        initialParams={{ userId, status }}
      />
    </Stack.Navigator>
  )
}

export default TabNavigator
