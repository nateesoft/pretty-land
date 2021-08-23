import React, { memo, useEffect, useState } from "react"
import Cookies from "js-cookie"
import { NotificationManager } from "react-notifications"
import { useHistory } from "react-router"

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
  const [sumGirl1, setSumGirl1] = useState("0")
  const [sumGirl2, setSumGirl2] = useState("0")
  const [sumGirl3, setSumGirl3] = useState("0")
  const [sumGirl4, setSumGirl4] = useState("0")

  const [sumBoy1, setSumBoy1] = useState("0")
  const [sumBoy2, setSumBoy2] = useState("0")
  const [sumBoy3, setSumBoy3] = useState("0")
  const [sumBoy4, setSumBoy4] = useState("0")

  const getAllPartnerList = (snapshot) => {
    return new Promise((resolve, reject) => {
      const arr = snapshotToArray(snapshot)
      let typeGirl1 = 0,
        typeBoy1 = 0,
        typeGirl2 = 0,
        typeBoy2 = 0,
        typeGirl3 = 0,
        typeBoy3 = 0,
        typeGirl4 = 0,
        typeBoy4 = 0
      arr.forEach((item) => {
        if (item.memberType === "partner") {
          if (item.type1) {
            if (item.gender === "female") {
              typeGirl1 = typeGirl1 + 1
            } else if (item.gender === "male") {
              typeBoy1 = typeBoy1 + 1
            }
          }
          if (item.type2) {
            if (item.gender === "female") {
              typeGirl2 = typeGirl2 + 1
            } else if (item.gender === "male") {
              typeBoy2 = typeBoy2 + 1
            }
          }
          if (item.type3) {
            if (item.gender === "female") {
              typeGirl3 = typeGirl3 + 1
            } else if (item.gender === "male") {
              typeBoy3 = typeBoy3 + 1
            }
          }
          if (item.type4) {
            if (item.gender === "female") {
              typeGirl4 = typeGirl4 + 1
            } else if (item.gender === "male") {
              typeBoy4 = typeBoy4 + 1
            }
          }
        }
      })
      setSumGirl1(typeGirl1)
      setSumGirl2(typeGirl2)
      setSumGirl3(typeGirl3)
      setSumGirl4(typeGirl4)

      setSumBoy1(typeBoy1)
      setSumBoy2(typeBoy2)
      setSumBoy3(typeBoy3)
      setSumBoy4(typeBoy4)

      const dataShow = {
        girl: [typeGirl1, typeGirl2, typeGirl3, typeGirl4],
        boy: [typeBoy1, typeBoy2, typeBoy3, typeBoy4]
      }

      resolve(true)
    })
  }

  useEffect(() => {
    const ref = firebase.database().ref(`${AppConfig.env}/members`)
    const listener = ref.on("value", (snapshot) => {
      getAllPartnerList(snapshot).catch((err) => NotificationManager.error(err))
    })
    return () => {
      ref.off("value", listener)
    }
  }, [])

  const loadDetailWork = (type, imageUrl, appconfigMaster) => {
    let partnerRequest = ""
    if (type === 1) {
      partnerRequest = AppConfig.PartnerType.type1
    } else if (type === 2) {
      partnerRequest = AppConfig.PartnerType.type2
    } else if (type === 3) {
      partnerRequest = AppConfig.PartnerType.type3
    } else if (type === 4) {
      partnerRequest = AppConfig.PartnerType.type4
    }
    if (type === 4) {
      history.push("/customer-create-work4", {
        customerProfile: member,
        partnerRequest,
        partnerType: type,
        appconfig: appconfigMaster,
        partnerImage: imageUrl
      })
    } else {
      history.push("/customer-create-work", {
        customerProfile: member,
        partnerRequest,
        partnerType: type,
        appconfig: appconfigMaster,
        partnerImage: imageUrl
      })
    }
  }

  return (
    <Dashboard
      type="customer"
      profile={member}
      loadDetailWork={loadDetailWork}
      customerProps={{
        girl: [sumGirl1, sumGirl2, sumGirl3, sumGirl4],
        boy: [sumBoy1, sumBoy2, sumBoy3, sumBoy4]
      }}
    />
  )
}

export default memo(DashboardComponent)
