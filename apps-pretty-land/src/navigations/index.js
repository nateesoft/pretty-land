import React, { useEffect, useMemo } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { Text, View } from "react-native"
import base64 from "react-native-base64"

import firebase from "../../util/firebase"

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

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken
      dispatch({ type: "RESTORE_TOKEN", token: userToken })
    }
    bootstrapAsync()
  }, [])

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        const { username, password } = data
        const ref = firebase.database().ref("members")
        ref.on("value", (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const member = childSnapshot.val()
            member.key = childSnapshot.key
            const isUser = member.username === username
            const isPass = base64.decode(member.password) === password
            if (isUser && isPass) {
              dispatch({
                type: "SIGN_IN",
                token: "dummy-auth-token",
                screen: member.memberType,
              })
            }
          })
        })
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
