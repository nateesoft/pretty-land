import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import ViewContactScreen from "./viewContact"
import { LogoTitle } from "../../../components/Header"

const Stack = createStackNavigator()

const ContactAdminNavigator = ({ navigation, route }) => {
  const { userId } = route.params

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="View-Profile"
        component={ViewContactScreen}
        options={{
          title: "Edit-Profile",
          headerStyle: {
            backgroundColor: "#ff2fe6",
          },
          headerTintColor: "white",
          headerTitle: (props) => <LogoTitle title="Pretty Land" {...props} />,
        }}
        initialParams={{ userId }}
      />
    </Stack.Navigator>
  )
}

export default ContactAdminNavigator
