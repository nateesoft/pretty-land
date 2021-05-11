import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import PartnerCategoryScreen from "./partnerCategory"
import PartnerListCountryScreen from "./partnerListCountry"
import CreatePostForm from "./createPost"

const Stack = createStackNavigator()

const TabNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Partner-Category"
        component={PartnerCategoryScreen}
        options={{
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
        }}
      />
      <Stack.Screen name="Partner-List-Country" component={PartnerListCountryScreen} />
      <Stack.Screen name="Create-Post-Form" component={CreatePostForm} />
    </Stack.Navigator>
  )
}

export default TabNavigator
