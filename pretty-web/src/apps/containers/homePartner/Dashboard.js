import React, { memo, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import Cookies from "js-cookie"
import { NotificationManager } from "react-notifications"

import Dashboard from "../../components/dashboard"
import { AppConfig } from "../../../Constants"
import firebase from "../../../util/firebase"
import { snapshotToArray } from "../../../util"
import {
  getPartnerDashboardType1,
  getPartnerDashboardType2,
  getPartnerDashboardType3,
  getPartnerDashboardType4
} from "../../../apis"

const DashboardComponent = () => {
  const history = useHistory()
  if (!Cookies.get("logged_in")) {
    window.location.href = ""
  }
  const { member } = history.location.state

  const [sumType1, setSumType1] = useState("0")
  const [sumType2, setSumType2] = useState("0")
  const [sumType3, setSumType3] = useState("0")
  const [sumType4, setSumType4] = useState("0")

  const [postType1Count, setPostType1Count] = useState(null)
  const [postType2Count, setPostType2Count] = useState(null)
  const [postType3Count, setPostType3Count] = useState(null)
  const [postType4Count, setPostType4Count] = useState(null)

  const getComputeGroup = (snapshot) => {
    return new Promise((resolve, reject) => {
      const listTrue = []
      const arr = snapshotToArray(snapshot)
      let type1 = 0,
        type2 = 0,
        type3 = 0,
        type4 = 0

      let countType1 = 0,
        countType2 = 0,
        countType3 = 0,
        countType4 = 0

      // all available post in system for this partner
      arr.forEach((item) => {
        const statusMatch =
          item.status !== AppConfig.PostsStatus.postTimeout &&
          item.status !== AppConfig.PostsStatus.notApprove &&
          item.status !== AppConfig.PostsStatus.closeJob &&
          item.status !== AppConfig.PostsStatus.customerNewPostDone &&
          item.status !== AppConfig.PostsStatus.waitAdminConfirmPayment
        let sexMatch = false
        if (item.sexTarget === "female") {
          sexMatch = member.gender === "female" || member.gender === "other"
        } else {
          sexMatch = item.sexTarget === member.gender
        }
        if (statusMatch && sexMatch) {
          if (item.partnerRequest === AppConfig.PartnerType.type1) {
            type1 = type1 + 1
          }
          if (item.partnerRequest === AppConfig.PartnerType.type2) {
            type2 = type2 + 1
          }
          if (item.partnerRequest === AppConfig.PartnerType.type3) {
            type3 = type3 + 1
          }
          if (item.partnerRequest === AppConfig.PartnerType.type4) {
            type4 = type4 + 1
          }
          listTrue.push(item)
        }
      })
      setSumType1(type1)
      setSumType2(type2)
      setSumType3(type3)
      setSumType4(type4)

      // work to wait process
      arr.forEach((item) => {
        const statusMatch =
          item.status === AppConfig.PostsStatus.adminConfirmNewPost ||
          item.status === AppConfig.PostsStatus.waitCustomerSelectPartner ||
          item.status === AppConfig.PostsStatus.waitPartnerConfrimWork
        if (item.status !== AppConfig.PostsStatus.closeJob) {
          if (statusMatch) {
            if (item.partnerRequest === AppConfig.PartnerType.type1) {
              countType1 = countType1 + 1
            }
            if (item.partnerRequest === AppConfig.PartnerType.type2) {
              countType2 = countType2 + 1
            }
            if (item.partnerRequest === AppConfig.PartnerType.type3) {
              countType3 = countType3 + 1
            }
            if (item.partnerRequest === AppConfig.PartnerType.type4) {
              countType4 = countType4 + 1
            }
          }
        }
      })
      setPostType1Count(countType1)
      setPostType2Count(countType2)
      setPostType3Count(countType3)
      setPostType4Count(countType4)

      resolve(true)
    })
  }

  useEffect(() => {
    getPartnerDashboardType1()
      .then((res) => setPostType1Count(res))
      .catch((err) => NotificationManager.error(err))
    getPartnerDashboardType2()
      .then((res) => setPostType2Count(res))
      .catch((err) => NotificationManager.error(err))
    getPartnerDashboardType3()
      .then((res) => setPostType3Count(res))
      .catch((err) => NotificationManager.error(err))
    getPartnerDashboardType4()
      .then((res) => setPostType4Count(res))
      .catch((err) => NotificationManager.error(err))
  }, [])

  useEffect(() => {
    const ref = firebase.database().ref(`${AppConfig.env}/posts`)
    const listener = ref.on("value", (snapshot) => {
      getComputeGroup(snapshot).catch((err) => NotificationManager.error(err))
    })
    return () => {
      ref.off("value", listener)
    }
  }, [])

  const onPressOptions = (type, partnerTypeNme) => {
    if (type === 4) {
      history.push("/partner-request", { member })
    } else if (type === 1 || type === 2 || type === 3) {
      history.push("/partner-customer-posts", {
        partnerType: type,
        profile: member,
        partnerTypeNme
      })
    }
  }
  return (
    <Dashboard
      type="partner"
      profile={member}
      onPressOptions={onPressOptions}
      partnerProps={{
        notifys: [
          postType1Count,
          postType2Count,
          postType3Count,
          postType4Count
        ],
        works: [sumType1, sumType2, sumType3, sumType4]
      }}
    />
  )
}

export default memo(DashboardComponent)
