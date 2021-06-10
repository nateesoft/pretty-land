import React, { useEffect, useMemo, useReducer } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { Alert, Text, View, Linking } from "react-native"
import * as Facebook from "expo-facebook"
import base64 from "react-native-base64"

import { AppConfig } from "../Constants"
import { snapshotToArray } from "../../util"
import firebase from "../../util/firebase"
import { facebookConfig } from "../../util/appConfig"

import LoginNavigator from "../screens/login/navigator"
import CustomerNavigator from "../screens/customer/navigator"
import AdminNavigator from "../screens/admin/navigator"

import PartnerNavigator from "../screens/partner/navigator"
import PartnerProfileNavigator from "../screens/partner/ProfileScreen/navigator"

import { Context as AuthContext } from "../context/AuthContext"

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
            isLoading: false,
          }
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            token: action.token,
            profile: action.profile,
            screen: action.screen,
            status: action.status,
          }
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            token: null,
            screen: null,
            status: null,
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      token: null,
    }
  )

  const lineLogin = (data) => {
    firebase.database().ref(`customers/${data.id}`).set({
      id: data.id,
      profile: data.name,
      profile_image: data.picture,
      customerType: "line",
      status: "active",
      loginDate: new Date().toUTCString(),
      customerLevel: 0,
    })
    dispatch({
      type: "SIGN_IN",
      token: data.id,
      screen: "customer",
    })
  }

  const appleLogin = ({ userId, email, fullName }) => {
    const id = base64.encode(email)
    firebase.database().ref(`customers/${id}`).set({
      id,
      userId,
      email: email.toString().toLowerCase(),
      customerType: "apple",
      status: "active",
      loginDate: new Date().toUTCString(),
      customerLevel: 0,
    })
    dispatch({
      type: "SIGN_IN",
      token: id,
      screen: "customer",
    })
  }

  const facebookLogin = async () => {
    try {
      await Facebook.initializeAsync({
        appId: facebookConfig.appId,
      })

      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      })

      if (type === "success") {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        )
        const fbProfile = await response.json()
        firebase.database().ref(`customers/${fbProfile.id}`).set({
          id: fbProfile.id,
          profile: fbProfile.name,
          customerType: "facebook",
          status: "active",
          loginDate: new Date().toUTCString(),
          customerLevel: 0,
        })
        dispatch({
          type: "SIGN_IN",
          token: fbProfile.id,
          screen: "customer",
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
          .ref("members")
          .orderByChild("username")
          .equalTo(username)
          .once("value", (snapshot) => {
            const user = snapshotToArray(snapshot)[0]
            if (user) {
              const passwordDb = base64.decode(user.password)
              if (passwordDb === password) {
                if (user.status === AppConfig.MemberStatus.suspend) {
                  Alert.alert(
                    "แจ้งเตือน",
                    AppConfig.MemberStatus.suspendMessagePopup
                  )
                } else {
                  dispatch({
                    type: "SIGN_IN",
                    token: user.id,
                    screen: user.memberType,
                    status: user.status,
                  })
                }
              } else {
                Alert.alert("แจ้งเตือน", "รหัสผ่านไม่ถูกต้อง !!!")
              }
            } else {
              Alert.alert("แจ้งเตือน", "ไม่พบข้อมูลผู้ใช้งานในระบบ !!!")
            }
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
      signOut: () => dispatch({ type: "SIGN_OUT" }),
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
              headerShown: false,
            }}
            initialParams={{
              userId: state.token,
              status: state.status,
              screen: state.screen,
            }}
          />
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  )
}

export default AppNavigation
