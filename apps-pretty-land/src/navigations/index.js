import React, { useEffect, useMemo } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { Alert, Text, View } from "react-native"
import base64 from "react-native-base64"
import * as Facebook from "expo-facebook"

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

  const logIn = async () => {
    try {
      await Facebook.initializeAsync({
        appId: "507458737111150",
      })
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile"],
        })

      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        )
        Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`)
        // console.log(await response.json())
        // Alert.alert('Logged in!');
      } else {
        // type === 'cancel'
      }
    } catch (error) {
      Alert.alert(error)
    }
  }

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken
      dispatch({ type: "RESTORE_TOKEN", token: userToken })
    }
    bootstrapAsync()
  }, [])

  const authContext = useMemo(
    () => ({
      signIn: (data) => {
        const { username, password } = data
        firebase
          .auth()
          .signInWithEmailAndPassword(username, password)
          .then((userCredential) => {
            const user = userCredential.user
            if (user) {
              dispatch({
                type: "SIGN_IN",
                token: "dummy-auth-token",
                screen: member.memberType,
              })
            }
          })
          .catch((error) => {
            Alert.alert(error.message)
          })
      },
      signInCustomer: async (data) => {
        if (data.loginType === "facebook") {
          // const provider = new firebase.auth.FacebookAuthProvider()
          // firebase
          //   .auth()
          //   .signInWithPopup(provider)
          //   .then((result) => {
          //     const credential = result.credential
          //     const user = result.user
          //     const accessToken = credential.accessToken
          //     console.log("user:", user)
          //     console.log("accessToken:", accessToken)
          //   })
          //   .catch((error) => {
          //     // Handle Errors here.
          //     const errorCode = error.code
          //     const errorMessage = error.message
          //     // The email of the user's account used.
          //     const email = error.email
          //     // The firebase.auth.AuthCredential type that was used.
          //     const credential = error.credential
          //     console.log('login by facebook error:', error);
          //     Alert.alert(error.message)
          //   })

          // const fbAccessToken = '95b0a0d704d8f2186d477532e29f09ed'
          // const provider =
          //   firebase.auth.FacebookAuthProvider.credential(fbAccessToken)
          // firebase
          //   .auth()
          //   .signInWithCredential(provider)
          //   .then((user) => {})
          //   .catch((error) => {
          //     Alert.alert(error.message)
          //   })
          logIn()
        }
        if (data.loginType === "line") {
        }
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
