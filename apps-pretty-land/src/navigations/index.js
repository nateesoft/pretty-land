import React, { useEffect, useMemo, useReducer } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { Alert, Text, View } from "react-native"
import * as Facebook from "expo-facebook"
import base64 from "react-native-base64"

import { AppConfig } from "../Constants"
import { snapshotToArray } from "../../util"
import firebase from "../../util/firebase"

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
            userToken: action.token,
            isLoading: false,
          }
        case "SIGN_IN":
          // console.log('SIGN_IN_data:', action)
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            screen: action.screen,
            status: action.status,
          }
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            screen: null,
            status: null,
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  )

  const facebookLogin = async () => {
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
        // console.log("Logged in!", `Hi ${(await response.json()).name}!`)
        const fbProfile = await response.json()
        // save facebook account to database
        // const fbProfile = await Facebook.getAuthenticationCredentialAsync()
        // console.log(fbProfile)
        // demo into customer scree
        Alert.alert(
          `สวัสดีค่ะ คุณ ${fbProfile.name} ยินดีต้อนรับเข้าสู่ Pretty Land`
        )
        dispatch({
          type: "SIGN_IN",
          token: "dummy-auth-token",
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
      signInCustomer: async (data) => {
        if (data.loginType === "facebook") {
          // facebookLogin()
          // Alert.alert("Pretty Land", "Function นี้ยังอยู่ในระหว่างการพัฒนา")
          // dispatch({
          //   type: "SIGN_IN",
          //   token: "dummy-auth-token",
          //   screen: "customer",
          // })
        }
        if (data.loginType === "line") {
          // Alert.alert("Pretty Land", "Function นี้ยังอยู่ในระหว่างการพัฒนา")
        }
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
        ) : state.userToken == null || state.screen === null ? (
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
                : (state.screen === "partner" && state.status === AppConfig.MemberStatus.newRegister) ? PartnerProfileNavigator
                : (state.screen === "partner" && state.status === AppConfig.MemberStatus.active) ? PartnerNavigator
                : (state.screen === "admin" || state.screen === "superadmin") ? AdminNavigator : null
            }
            options={{
              headerShown: false,
            }}
            initialParams={{
              userId: state.userToken,
              screen: state.screen,
            }}
          />
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  )
}

export default AppNavigation
