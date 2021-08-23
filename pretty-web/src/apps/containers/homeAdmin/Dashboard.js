import React, { memo, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import Cookies from "js-cookie"
import { NotificationManager } from "react-notifications"

import { AppConfig } from "../../../Constants"
import firebase from "../../../util/firebase"
import { snapshotToArray } from "../../../util"
import Dashboard from "../../components/dashboard"

const DashboardComponent = () => {
  if (!Cookies.get("logged_in")) {
    window.location.href = ""
  }
  const history = useHistory()
  const { member } = history.location.state
  console.log(member);
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
      const arr = snapshotToArray(snapshot)
      let type1 = 0,
        type2 = 0,
        type3 = 0,
        type4 = 0

      let countType1 = 0,
        countType2 = 0,
        countType3 = 0,
        countType4 = 0

      // all available post in system
      arr.forEach((item) => {
        const statusMatch =
          item.status !== AppConfig.PostsStatus.postTimeout &&
          item.status !== AppConfig.PostsStatus.notApprove &&
          item.status !== AppConfig.PostsStatus.closeJob
        if (item.partnerRequest === AppConfig.PartnerType.type1) {
          if (statusMatch) {
            type1 = type1 + 1
          }
        }
        if (item.partnerRequest === AppConfig.PartnerType.type2) {
          if (statusMatch) {
            type2 = type2 + 1
          }
        }
        if (item.partnerRequest === AppConfig.PartnerType.type3) {
          if (statusMatch) {
            type3 = type3 + 1
          }
        }
        if (item.partnerRequest === AppConfig.PartnerType.type4) {
          if (
            statusMatch ||
            item.status === AppConfig.PostsStatus.waitAdminApprovePost
          ) {
            type4 = type4 + 1
          }
        }
      })
      setSumType1(type1)
      setSumType2(type2)
      setSumType3(type3)
      setSumType4(type4)

      // work to wait process
      arr.forEach((item) => {
        const statusMatch =
          item.status === AppConfig.PostsStatus.customerNewPostDone ||
          item.status === AppConfig.PostsStatus.waitAdminConfirmPayment
        if (item.partnerRequest === AppConfig.PartnerType.type1) {
          if (statusMatch) {
            countType1 = countType1 + 1
          }
        }
        if (item.partnerRequest === AppConfig.PartnerType.type2) {
          if (statusMatch) {
            countType2 = countType2 + 1
          }
        }
        if (item.partnerRequest === AppConfig.PartnerType.type3) {
          if (statusMatch) {
            countType3 = countType3 + 1
          }
        }
        if (item.partnerRequest === AppConfig.PartnerType.type4) {
          if (
            statusMatch ||
            item.status === AppConfig.PostsStatus.waitAdminApprovePost
          ) {
            countType4 = countType4 + 1
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
    const ref = firebase.database().ref(`${AppConfig.env}/posts`)
    const listener = ref.on("value", (snapshot) => {
      getComputeGroup(snapshot).catch((err) => NotificationManager.error(err))
    })
    return () => {
      ref.off("value", listener)
    }
  }, [])

  const onPressOptions = (type) => {
    history.push("/admin-customer-posts", { partnerType: type, member })
  }

  return (
    <Dashboard
      type="admin"
      profile={member}
      onPressOptions={onPressOptions}
      adminProps={{
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
