import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import PostListScreen from "./postList"
import PartnerSelectScreen from "./partnerListSelect"
import PartnerImageScreen from "./partnerImage"
import PartnerVideoScreen from "./partnerVideo"
import PaymentForm from "./payment"

const Stack = createStackNavigator()

const TabNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Post-List"
        component={PostListScreen}
        options={{
          title: "แสดงรายการที่โพสท์",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
        }}
      />
      <Stack.Screen name="Partner-List-Select" component={PartnerSelectScreen} />
      <Stack.Screen name="Partner-Image" component={PartnerImageScreen} />
      <Stack.Screen name="Partner-Video" component={PartnerVideoScreen} />
      <Stack.Screen name="Payment-Form" component={PaymentForm} />
    </Stack.Navigator>
  )
}

export default TabNavigator
