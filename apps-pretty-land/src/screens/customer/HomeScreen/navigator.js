import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import CustomerDashboard from "./customerDashboard"
import PartnerListCountryScreen from "./partnerListCountry"
import SelectProvinceForm from "./selectProvince"
import SelectProvinceFormType4 from "./selectProvinceType4"
import PlaceForm from "./placeForm"
import TimePriceForm from "./timePriceForm"

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
            <LogoTitle title="โหมดงานที่รับสมัคร" {...props} />
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
        name="Select-Province-Form-Type4"
        component={SelectProvinceFormType4}
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
      <Stack.Screen
        name="Time-Price-Form"
        component={TimePriceForm}
        options={{
          title: "เวลาเริ่ม",
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
