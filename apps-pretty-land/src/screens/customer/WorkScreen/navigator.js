import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Home from "./index"
import Detail from "./detail"
import Detail2 from "./detail2"

const Stack = createStackNavigator()

const TabNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "แสดงรายการที่โพสท์",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
        }}
      />
      <Stack.Screen name="Customer-Work-Detail" component={Detail} />
      <Stack.Screen name="Customer-Work-Detail2" component={Detail2} />
    </Stack.Navigator>
  )
}

export default TabNavigator
