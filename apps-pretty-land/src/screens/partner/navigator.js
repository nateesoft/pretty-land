import React, { useState, useEffect } from "react"
import { Alert } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {
  FontAwesome5,
  Foundation,
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons"

/* all screen */
import HomeNavigator from "./HomeScreen/navigator"
import WorkNavigator from "./WorkScreen/navigator"
import RequestNavigator from "./RequestScreen/navigator"
import ProfileNavigator from "./ProfileScreen/navigator"

/* Logout */
import firebase from "../../../util/firebase"
import LogoutScreen from "../logout"
import { getDocument } from "../../../util"
import { AppConfig } from "../../Constants"

const Tab = createBottomTabNavigator()

const PartnerNavigator = ({ navigation, route }) => {
  const { userId, status } = route.params
  const [reqCount, setReqCount] = useState(0)
  const [myPostCount, setMyPostCount] = useState(0)

  const getWorkRequest = (snapshot) => {
    return new Promise((resolve, reject) => {
      const list = snapshot.val()
      let count = 0
      for (let key in list) {
        const postObj = list[key]
        if (postObj.status === AppConfig.PostsStatus.waitPartnerConfrimWork) {
          const listPartner = postObj.partnerSelect
          for (let key2 in listPartner) {
            const partnerObj = listPartner[key2]
            if (partnerObj.partnerId === userId) {
              count = count + 1
            }
          }
        }
      }
      resolve(count)
    })
  }

  const getMyWorkProcess = (snapshot) => {
    return new Promise((resolve, reject) => {
      const list = snapshot.val()
      let count = 0
      for (let key in list) {
        const postObj = list[key]
        if (postObj.status === AppConfig.PostsStatus.adminConfirmPayment) {
          const listPartner = postObj.partnerSelect
          for (let key2 in listPartner) {
            const partnerObj = listPartner[key2]
            if (partnerObj.partnerId === userId) {
              count = count + 1
            }
          }
        }
      }
      resolve(count)
    })
  }

  useEffect(() => {
    const ref = firebase.database().ref(getDocument(`posts`))
    const listener = ref.on("value", (snapshot) => {
      getWorkRequest(snapshot).then((res) => setReqCount(res))
      getMyWorkProcess(snapshot).then((res) => setMyPostCount(res))
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
          title: "?????????????????????",
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
          title: "??????????????????????????????",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="request-quote" color="white" size={size} />
          ),
          tabBarBadge: reqCount ? reqCount : null,
          tabBarBadgeStyle: {
            backgroundColor: "rgb(70, 240, 238)",
            color: "red"
          }
        }}
        initialParams={{ userId, status }}
      />
      <Tab.Screen
        name="p-Work"
        component={WorkNavigator}
        options={{
          title: "???????????????????????????",
          tabBarIcon: ({ color, size }) => (
            <Foundation name="social-foursquare" color="white" size={size} />
          ),
          tabBarBadge: myPostCount ? myPostCount : null,
          tabBarBadgeStyle: {
            backgroundColor: "rgb(70, 240, 238)",
            color: "red"
          }
        }}
        initialParams={{ userId, status }}
      />
      <Tab.Screen
        name="p-Profile"
        component={ProfileNavigator}
        options={{
          title: "???????????????????????????????????????",
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
