import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import PostListScreen from "./postList"
import PartnerSelectScreen from "./partnerListSelect"
import PartnerImageScreen from "./partnerImage"
import ImagePreviewScreen from "./imagePreview"
import PaymentForm from "./payment"
import ReviewTaskScreen from "./reviewTask"
import CreateNewPostForm from "../HomeScreen/createPost"

import { LogoTitle } from "../../../components/Header"

const Stack = createStackNavigator()

const TabNavigator = ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Post-List"
        component={PostListScreen}
        options={{
          title: "Back",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "white",
          headerTitle: (props) => <LogoTitle title="Pretty Land" {...props} />,
        }}
        initialParams={{ partnerType: "all" }}
      />
      <Stack.Screen
        name="Partner-List-Select"
        component={PartnerSelectScreen}
        options={{
          title: "Back",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "white",
          headerTitle: (props) => <LogoTitle title="Pretty Land" {...props} />,
        }}
      />
      <Stack.Screen
        name="Partner-Image"
        component={PartnerImageScreen}
        options={{
          title: "Back",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "white",
          headerTitle: (props) => <LogoTitle title="Pretty Land" {...props} />,
        }}
      />
      <Stack.Screen
        name="Image-Preview"
        component={ImagePreviewScreen}
        options={{
          title: "Back",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "white",
          headerTitle: (props) => <LogoTitle title="Pretty Land" {...props} />,
        }}
      />
      <Stack.Screen
        name="Payment-Form"
        component={PaymentForm}
        options={{
          title: "Back",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "white",
          headerTitle: (props) => <LogoTitle title="Pretty Land" {...props} />,
        }}
      />
      <Stack.Screen
        name="Review-Task"
        component={ReviewTaskScreen}
        options={{
          title: "Back",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "white",
          headerTitle: (props) => <LogoTitle title="Pretty Land" {...props} />,
        }}
      />
      <Stack.Screen
        name="Create-New-Post"
        component={CreateNewPostForm}
        options={{
          title: "Back",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "white",
          headerTitle: (props) => <LogoTitle title="Pretty Land" {...props} />,
        }}
      />
    </Stack.Navigator>
  )
}

export default TabNavigator
