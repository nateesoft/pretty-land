import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import LoginScreen from "./index"
import LoginForm from "./loginForm"
import RegisterLoginImageForm from "./registerLoginForm"
import LineLoginForm from './LineLoginForm'

const Stack = createStackNavigator()

const LoginNavigator = () => {

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
        name="Partner-Login-Form"
        component={RegisterLoginImageForm}
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
        name="Line-Login-Form"
        component={LineLoginForm}
        options={{
          title: "เข้าสู่ระบบด้วย LINE",
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
