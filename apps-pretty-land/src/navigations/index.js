import React, { useEffect, useMemo, useReducer } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { Alert, Text, View } from "react-native"
import * as Facebook from "expo-facebook"
import base64 from "react-native-base64"

import { AppConfig } from "../Constants"
import { snapshotToArray, getDocument } from "../../util"
import firebase from "../../util/firebase"
import { facebookConfig } from "../../util/appConfig"

import LoginNavigator from "../screens/login/navigator"
import CustomerNavigator from "../screens/customer/navigator"
import AdminNavigator from "../screens/admin/navigator"

import PartnerNavigator from "../screens/partner/navigator"
import PartnerProfileNavigator from "../screens/partner/ProfileScreen/navigator"

import { Context as AuthContext } from "../context/AuthContext"
import {
  registerForPushNotificationsAsync,
  saveExponentPushToken
} from "../apis"

const Stack = createStackNavigator()

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  )
}

const AppNavigation = () => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            token: action.token,
            isLoading: false
          }
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            token: action.token,
            profile: action.profile,
            screen: action.screen,
            status: action.status
          }
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            token: null,
            screen: null,
            status: null
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      token: null
    }
  )

  const lineLogin = async (data) => {
    firebase
      .database()
      .ref(getDocument(`members/${data.id}`))
      .set({
        id: data.id,
        profile: data.name,
        image: data.picture,
        customerType: "line",
        memberType: "customer",
        status: "active",
        loginDate: new Date().toUTCString(),
        customerLevel: 0
      })

    // update expo token to firebase
    await registerForPushNotificationsAsync().then((token) => {
      saveExponentPushToken({ userId: data.id, token, member_type: "customer" })
    })

    dispatch({
      type: "SIGN_IN",
      token: data.id,
      screen: "customer"
    })
  }

  const appleLogin = async ({ userId, email, fullName }) => {
    const id = base64.encode(email)
    firebase
      .database()
      .ref(getDocument(`members/${id}`))
      .set({
        id,
        userId,
        email: email.toString().toLowerCase(),
        customerType: "apple",
        memberType: "customer",
        status: "active",
        loginDate: new Date().toUTCString(),
        customerLevel: 0
      })

    // update expo token to firebase
    await registerForPushNotificationsAsync().then((token) => {
      saveExponentPushToken({ userId: id, token, member_type: "customer" })
    })

    dispatch({
      type: "SIGN_IN",
      token: id,
      screen: "customer"
    })
  }

  const facebookLogin = async () => {
    try {
      await Facebook.initializeAsync({
        appId: facebookConfig.appId
      }).catch((err) => {
        Alert.alert(`Facebook initializeAsync: ${err}`)
      })

      const data = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"]
      }).catch((err) => {
        Alert.alert(`Facebook logInWithReadPermissionAsync: ${err}`)
      })

      const { status, authResponse, appId, token, type, userId } = data
      if (status === "success" || type === "success") {
        const { accessToken, userID } = authResponse || {}
        const graphUri = `https://graph.facebook.com/me?access_token=${
          accessToken || token
        }`
        const response = await fetch(graphUri).catch((err) => {
          Alert.alert(`fetch graph: ${err}`)
        })
        const fbProfile = await response.json()
        firebase
          .database()
          .ref(getDocument(`members/${userID || appId}`))
          .set({
            id: userID || appId,
            profile: fbProfile.name || userID || appId,
            customerType: "facebook",
            memberType: "customer",
            status: "active",
            loginDate: new Date().toUTCString(),
            customerLevel: 0
          })

        // update expo token to firebase
        await registerForPushNotificationsAsync().then((token) => {
          saveExponentPushToken({
            userId: userID || appId,
            token,
            member_type: "customer"
          })
        })

        dispatch({
          type: "SIGN_IN",
          token: fbProfile.id,
          screen: "customer"
        })
      } else {
        console.log("Cancel fackbook login action")
      }
    } catch (error) {
      Alert.alert("Error", error)
    }
  }

  useEffect(() => {
    const bootstrapAsync = async () => {
      dispatch({ type: "RESTORE_TOKEN", token: null })
    }
    bootstrapAsync()
  }, [])

  const authContext = useMemo(
    () => ({
      signIn: (data) => {
        const { username, password } = data
        firebase
          .database()
          .ref(getDocument("members"))
          .orderByChild("username")
          .equalTo(username)
          .once("value", async (snapshot) => {
            const user = snapshotToArray(snapshot)[0]
            if (user) {
              const passwordDb = base64.decode(user.password)
              if (passwordDb === password) {
                if (user.status === AppConfig.MemberStatus.suspend) {
                  Alert.alert(
                    "???????????????????????????",
                    AppConfig.MemberStatus.suspendMessagePopup
                  )
                } else {
                  // update expo token to firebase
                  await registerForPushNotificationsAsync().then((token) => {
                    saveExponentPushToken({
                      userId: user.id,
                      token,
                      member_type: user.memberType
                    })
                  })

                  dispatch({
                    type: "SIGN_IN",
                    token: user.id,
                    screen: user.memberType,
                    status: user.status
                  })
                }
              } else {
                Alert.alert("???????????????????????????", "?????????????????????????????????????????????????????? !!!")
              }
            } else {
              Alert.alert("???????????????????????????", "?????????????????????????????????????????????????????????????????????????????? !!!")
            }
          })
          .catch((err) => {
            Alert.alert(
              "??????????????????????????? !!!",
              "????????????????????????????????????????????????????????????????????????????????????????????? ??????????????????????????????????????????????????????????????????"
            )
          })
      },
      signInFacebook: () => {
        facebookLogin()
      },
      signInLine: (data) => {
        lineLogin(data)
      },
      signInApple: (data) => {
        appleLogin(data)
      },
      signOut: () => dispatch({ type: "SIGN_OUT" })
    }),
    []
  )

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator>
        {state.isLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : state.token == null || state.screen === null ? (
          <Stack.Screen
            name="app-login"
            component={LoginNavigator}
            options={{
              title: "Pretty Land",
              headerStyle: {
                backgroundColor: "#ff2fe6"
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold"
              },
              headerShown: false
            }}
          />
        ) : (
          <Stack.Screen
            name="Home"
            component={
              state.screen === "customer"
                ? CustomerNavigator
                : state.screen === "partner" &&
                  state.status === AppConfig.MemberStatus.newRegister
                ? PartnerProfileNavigator
                : state.screen === "partner" &&
                  state.status === AppConfig.MemberStatus.active
                ? PartnerNavigator
                : state.screen === "admin" || state.screen === "superadmin"
                ? AdminNavigator
                : null
            }
            options={{
              headerShown: false
            }}
            initialParams={{
              userId: state.token,
              status: state.status,
              screen: state.screen
            }}
          />
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  )
}

export default AppNavigation
