import React, { useEffect, useMemo, useReducer } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { Alert, Text, View } from "react-native"
import * as Facebook from "expo-facebook"
import base64 from "react-native-base64"

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

const AppNavigation = ({ navigation }) => {
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
          .database()
          .ref("members")
          .orderByChild("username")
          .equalTo(username)
          .on("value", (snapshot) => {
            const user = snapshotToArray(snapshot)[0]
            if (user) {
              const passwordDb = base64.decode(user.password)
              if (passwordDb === password) {
                dispatch({
                  type: "SIGN_IN",
                  token: user.id,
                  screen: user.memberType,
                  status: user.status,
                })
              } else {
                Alert.alert("รหัสผ่านไม่ถูกต้อง !!!")
              }
            } else {
              Alert.alert("ไม่พบข้อมูลผู้ใช้งานในระบบ !!!")
            }
          })
      },
      signInCustomer: async (data) => {
        if (data.loginType === "facebook") {
          // facebookLogin()
          Alert.alert("อยู่ในระหว่างการพัฒนา")
        }
        if (data.loginType === "line") {
          Alert.alert("อยู่ในระหว่างการพัฒนา")
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
                ? state.status === "new_register"
                  ? PartnerProfileNavigator
                  : PartnerNavigator
                : AdminNavigator
            }
            options={{
              headerShown: false,
            }}
            initialParams={{
              userId: state.userToken,
              status: state.status,
            }}
          />
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  )
}

export default AppNavigation
