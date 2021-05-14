import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {
  createBottomStackNavigator,
  createStackNavigator,
} from "@react-navigation/stack"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import { Button, Text, TextInput, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"

/* admin */
import AdminHomeScreen from "../screens/admin/HomeScreen"
import AdminWorkScreen from "../screens/admin/WorkScreen"
import AdminProfileScreen from "../screens/admin/ProfileScreen"
/* partner */
import PartnerHomeScreen from "../screens/partner/HomeScreen"
import PartnerWorkScreen from "../screens/partner/WorkScreen"
import PartnerProfileScreen from "../screens/partner/ProfileScreen"
/* customer */
import CustomerHome from "../screens/customer/HomeScreen/navigator"
import CustomerWork from "../screens/customer/WorkScreen/navigator"
import CustomerProfile from "../screens/customer/ProfileScreen/navigator"
/* Logout */
import LogoutScreen from "../screens/logout"

/* Login */
import LoginNavigator from "../screens/login/navigator"
/* Customer */
import CustomerNavigator from "../screens/customer/navigator"

import { Context as AuthContext } from "../context/AuthContext"
import { Provider as AuthProvider } from "../context/AuthContext"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  )
}

function AdminScreen() {
  const { signOut } = React.useContext(AuthContext)

  return (
    <View>
      <Text>Admin Signed in!</Text>
      <Button title="Sign out" onPress={signOut} />
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
                ? PartnerScreen
                : AdminScreen
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
