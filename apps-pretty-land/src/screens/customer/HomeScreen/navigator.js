import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import PartnerCategoryScreen from "./partnerCategory"
import PartnerListCountryScreen from "./partnerListCountry"
import CreatePostForm from "./createPost"

import { LogoTitle } from "../../../components/Header"

const Stack = createStackNavigator()

const CustomerHomeTabNavigator = ({ navigation, route }) => {
  const { userId, status } = route.params

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
        initialParams={{ userId, status }}
      />
      <Stack.Screen
        name="Partner-List-Country"
        component={PartnerListCountryScreen}
        initialParams={{ userId, status }}
      />
      <Stack.Screen
        name="Create-Post-Form"
        component={CreatePostForm}
        options={{
          title: "สร้างโพสท์ใหม่",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "white",
          headerTitle: (props) => <LogoTitle title="Pretty Land" {...props} />,
        }}
        initialParams={{
          pageFrom: "Partner-Category",
          userId,
          status,
        }}
      />
    </Stack.Navigator>
  )
}

export default CustomerHomeTabNavigator
