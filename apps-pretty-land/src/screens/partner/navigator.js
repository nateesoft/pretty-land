import React, { useState, useEffect } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {
  FontAwesome5,
  Foundation,
  MaterialCommunityIcons
} from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"

/* all screen */
import HomeNavigator from "./HomeScreen/navigator"
import WorkNavigator from "./WorkScreen/navigator"
import RequestNavigator from "./RequestScreen/navigator"
import ProfileNavigator from "./ProfileScreen/navigator"

/* Logout */
import LogoutScreen from "../logout"
import firebase from "../../../util/firebase"
import { snapshotToArray } from "../../../util"
import { AppConfig } from "../../Constants"

const Tab = createBottomTabNavigator()

const PartnerNavigator = ({ navigation, route }) => {
  const { userId, status } = route.params
  const [reqCount, setReqCount] = useState(0)
  const [myPostCount, setMyPostCount] = useState(0)

  const countOfPostsNew = (snapshot) => {
    return new Promise((resolve, reject) => {
      const data = snapshotToArray(snapshot)
      let count1 = 0
      let count2 = 0
      for (let i = 0; i < data.length; i++) {
        if (data[i].status === AppConfig.PostsStatus.waitCustomerSelectPartner) {
          count1 = count1 + 1
        }
        if (data[i].status === AppConfig.PostsStatus.waitCustomerPayment) {
          count2 = count2 + 1
        }
      }
      setReqCount(count1)
      setMyPostCount(count2)
      resolve(true)
    })
  }

  useEffect(() => {
    const ref = firebase.database().ref(`posts`)
    const listener = ref.on("value", (snapshot) => {
      countOfPostsNew(snapshot).catch((err) => Alert.alert(err))
    })
    return () => ref.off("value", listener)
  }, [])

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "purple",
        inactiveTintColor: "white",
        style: {
          backgroundColor: "#ff2fe6"
        }
      }}
    >
      <Tab.Screen
        name="p-Home"
        component={HomeNavigator}
        options={{
          title: "โหมดงาน",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="kiss-wink-heart" color="white" size={size} />
          )
        }}
        initialParams={{ userId, status }}
      />
      <Tab.Screen
        name="p-Quatation"
        component={RequestNavigator}
        options={{
          title: "งานที่เสนอ",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="request-quote" color="white" size={size} />
          ),
          tabBarBadge: reqCount ? reqCount : null
        }}
        initialParams={{ userId, status }}
      />
      <Tab.Screen
        name="p-Work"
        component={WorkNavigator}
        options={{
          title: "งานของฉัน",
          tabBarIcon: ({ color, size }) => (
            <Foundation name="social-foursquare" color="white" size={size} />
          ),
          tabBarBadge: myPostCount ? myPostCount : null
        }}
        initialParams={{ userId, status }}
      />
      <Tab.Screen
        name="p-Profile"
        component={ProfileNavigator}
        options={{
          title: "ข้อมูลส่วนตัว",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="card-account-details"
              color="white"
              size={size}
            />
          )
        }}
        initialParams={{ userId, status }}
      />
      <Tab.Screen
        name="p-Logout"
        component={LogoutScreen}
        options={{
          title: "Logout",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="logout" color="white" size={size} />
          )
        }}
        initialParams={{ userId, status }}
      />
    </Tab.Navigator>
  )
}

export default PartnerNavigator
