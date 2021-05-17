import React from "react"
import * as Font from "expo-font"
import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from "react-native-safe-area-context"

import AppNavigation from "./src/navigations"

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App
