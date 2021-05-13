import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import PostListScreen from "./postList"
import PartnerSelectScreen from "./partnerListSelect"
import PartnerImageScreen from "./partnerImage"
import PartnerVideoScreen from "./partnerVideo"
import PaymentForm from "./payment"
import ReviewTaskScreen from "./reviewTask"
import CreateNewPostForm from "./createPost"

const Stack = createStackNavigator()

const TabNavigator = ({ navigation, route }) => {
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
          headerTintColor: "white",
        }}
        initialParams={{ partnerType: "all" }}
      />
      <Stack.Screen
        name="Partner-List-Select"
        component={PartnerSelectScreen}
      />
      <Stack.Screen name="Partner-Image" component={PartnerImageScreen} />
      <Stack.Screen name="Partner-Video" component={PartnerVideoScreen} />
      <Stack.Screen name="Payment-Form" component={PaymentForm} />
      <Stack.Screen name="Review-Task" component={ReviewTaskScreen} />
      <Stack.Screen name="Create-New_Post" component={CreateNewPostForm} />
    </Stack.Navigator>
  )
}

export default TabNavigator
