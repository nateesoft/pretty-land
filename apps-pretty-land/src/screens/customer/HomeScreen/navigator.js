import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { Image, View, Text } from "react-native"

import PartnerCategoryScreen from "./partnerCategory"
import PartnerListCountryScreen from "./partnerListCountry"
import PartnerListPostScreen from "./partnerPostList"
import CreatePostForm from "./createPost"

import Logo from "../../../../assets/login.png"

const Stack = createStackNavigator()

const LogoTitle = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Image style={{ width: 30, height: 30, marginRight: 15 }} source={Logo} />
      <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
        แสดงกลุ่มพาทเนอร์
      </Text>
    </View>
  )
}

const TabNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Partner-Category"
        component={PartnerCategoryScreen}
        options={{
          title: "แสดงกลุ่มพาทเนอร์",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTitle: (props) => <LogoTitle {...props} />,
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
      <Stack.Screen name="Create-Post-Form" component={CreatePostForm} />
    </Stack.Navigator>
  )
}

export default TabNavigator
