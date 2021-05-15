import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import PartnerCategoryScreen from "./partnerCategory"
import PartnerListCountryScreen from "./partnerListCountry"
import PartnerListPostScreen from "./partnerPostList"
import CreatePostForm from "./createPost"

import { LogoTitle } from "../../../components/Header"

const Stack = createStackNavigator()

const TabNavigator = ({ title }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Partner-Category"
        component={PartnerCategoryScreen}
        options={{
          title: "Back",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTitle: (props) => (
            <LogoTitle title="แสดงกลุ่มพาทเนอร์" {...props} />
          ),
        }}
      />
      <Stack.Screen
        name="Partner-List-Country"
        component={PartnerListCountryScreen}
      />
      <Stack.Screen
        name="Partner-List-Post"
        component={PartnerListPostScreen}
      />
      <Stack.Screen
        name="Create-Post-Form"
        component={CreatePostForm}
        options={{
          title: 'สร้างโพสท์ใหม่',
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "white",
          headerTitle: (props) => (
            <LogoTitle title="Pretty Land" {...props} />
          ),
        }}
      />
    </Stack.Navigator>
  )
}

export default TabNavigator
