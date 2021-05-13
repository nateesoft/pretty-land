import React, { useEffect, useState } from "react"
import * as Font from "expo-font"
import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from "react-native-safe-area-context"

import AppNavigation from "./src/navigations"

const App = () => {
  const [isFontLoaded, setFontLoaded] = useState(false)

  useEffect(async () => {
    await Font.loadAsync({
      SemiBold: require("./src/fonts/Montserrat-SemiBold.otf"),
      Medium: require("./src/fonts/Montserrat-Medium.otf"),
      Regular: require("./src/fonts/Montserrat-Regular.otf"),
    })
    setFontLoaded(true)
  }, [])

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App
