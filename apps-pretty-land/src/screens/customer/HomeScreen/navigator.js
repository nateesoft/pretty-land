import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import CustomerDashboard from "./customerDashboard"
import PartnerListCountryScreen from "./partnerListCountry"
import CreatePostForm from "./createPost"
import SelectProvinceForm from "./selectProvince"
import PlaceForm from "./placeForm"

import { LogoTitle } from "../../../components/Header"

const Stack = createStackNavigator()

const CustomerHomeTabNavigator = ({ navigation, route }) => {
  const { userId, status } = route.params

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Customer-Dashboard"
        component={CustomerDashboard}
        options={{
          title: "Back",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTitle: (props) => (
            <LogoTitle title="โหมดงานในระบบ" {...props} />
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
      <Stack.Screen
        name="Select-Province-Form"
        component={SelectProvinceForm}
        options={{
          title: "เลือกจังหวัด",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "white",
          headerTitle: (props) => <LogoTitle title="Pretty Land" {...props} />,
        }}
        initialParams={{
          pageFrom: "Select-Province-Form",
          userId,
          status,
        }}
      />
      <Stack.Screen
        name="Place-Form"
        component={PlaceForm}
        options={{
          title: "ข้อมูลสถานที่",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "white",
          headerTitle: (props) => <LogoTitle title="Pretty Land" {...props} />,
        }}
        initialParams={{
          pageFrom: "Select-Province-Form",
          userId,
          status,
        }}
      />
    </Stack.Navigator>
  )
}

export default CustomerHomeTabNavigator
