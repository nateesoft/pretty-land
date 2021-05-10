import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Home from "./index"
import Detail from "./detail"
import Detail2 from "./detail2"
import Detail3 from "./detail3"

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
      <Stack.Screen name="Customer-Work-Detail3" component={Detail3} />
    </Stack.Navigator>
  )
}

export default TabNavigator
