import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {
  createStackNavigator,
} from "@react-navigation/stack"

import { Button, Text, View } from "react-native"

import LoginNavigator from "../screens/login/navigator"

import CustomerNavigator from "../screens/customer/navigator"
import AdminNavigator from "../screens/admin/navigator"
import PartnerNavigator from "../screens/partner/navigator"

import { Context as AuthContext } from "../context/AuthContext"

const Stack = createStackNavigator()

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  )
}

function PartnerScreen() {
  const { signOut } = React.useContext(AuthContext)

  return (
    <View>
      <Text>Partner Signed in!</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  )
}

const AppNavigation = ({ navigation }) => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          }
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            screen: action.screen,
          }
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  )

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken
      dispatch({ type: "RESTORE_TOKEN", token: userToken })
    }
    bootstrapAsync()
  }, [])

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        const { username, password, screen } = data;
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token", screen })
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" })
      },
    }),
    []
  )

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator>
        {state.isLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : state.userToken == null ? (
          <Stack.Screen
            name="app-login"
            component={LoginNavigator}
            options={{
              title: "Pretty Land",
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
        ) : (
          <Stack.Screen
            name="Home"
            component={
              state.screen === "customer"
                ? CustomerNavigator
                : state.screen === "partner"
                ? PartnerNavigator
                : AdminNavigator
            }
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  )
}

export default AppNavigation
