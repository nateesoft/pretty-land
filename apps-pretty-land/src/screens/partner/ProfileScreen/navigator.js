import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import RegisterPlanForm from "./registerPlanForm"
import RegisterPartnerForm from "./registerPartner"
import RegisterPartnerBankForm from "./registerBankForm"
import RegisterPartnerImageUpload from "./registerImageUpload"
import ViewProfileScreen from "./viewProfile"

import { LogoTitle } from "../../../components/Header"

const Stack = createStackNavigator()

const TabNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="View-Partner-Profile"
        component={ViewProfileScreen}
        options={{
          title: "Edit-Partner-Profile",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "white",
          headerTitle: (props) => (
            <LogoTitle title="Pretty Land" {...props} />
          ),
        }}
      />
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
      />
    </Stack.Navigator>
  )
}

export default TabNavigator
