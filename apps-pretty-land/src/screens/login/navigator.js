import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { getFocusedRouteNameFromRoute } from "@react-navigation/native"

import LoginScreen from "./index"
import LoginForm from "./loginForm"
import RegisterPartnerForm from "./registerPartner"
import RegisterPartnerBankForm from "./registerPartner2"
import RegisterPartnerImageForm from "./registerPartner3"

const Stack = createStackNavigator()

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed"

  switch (routeName) {
    case "Feed":
      return "News feed"
    case "Profile":
      return "My profile"
    case "Account":
      return "My account"
  }
}

const LoginNavigator = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) })
  }, [navigation, route])

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login-Form"
        component={LoginForm}
        options={{
          title: "Login Form",
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
        name="Partner-Register-Image-Form"
        component={RegisterPartnerImageForm}
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

export default LoginNavigator
