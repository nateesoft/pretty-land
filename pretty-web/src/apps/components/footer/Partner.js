import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import BottomNavigation from "@material-ui/core/BottomNavigation"
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction"
import { useHistory } from "react-router-dom"
import {
  AccountBox,
  ExitToApp,
  InsertEmoticon,
  MonetizationOn,
  LibraryAddCheck
} from "@material-ui/icons"
import { Badge } from "@material-ui/core"

import firebase from "../../../util/firebase"
import { AppConfig } from "../../../Constants"

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundColor: "#ff32ee"
  }
})

export default function PartnerFooter(props) {
  const { profile } = props
  const history = useHistory()
  const classes = useStyles()
  const [value, setValue] = useState("tab1")

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
            if (partnerObj.partnerId === profile.id) {
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
            if (
              partnerObj.partnerId === profile.id &&
              partnerObj.selectStatus === AppConfig.PostsStatus.customerPayment
            ) {
              count = count + 1
            }
          }
        }
      }
      resolve(count)
    })
  }

  useEffect(() => {
    const ref = firebase.database().ref(`${AppConfig.env}/posts`)
    const listener = ref.on("value", (snapshot) => {
      getWorkRequest(snapshot).then((res) => setReqCount(res))
      getMyWorkProcess(snapshot).then((res) => setMyPostCount(res))
    })

    return () => ref.off("value", listener)
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const goDashboard = () => {
    history.push("/partner", { member: profile })
  }
  const goRequest = () => {
    history.push("/partner-request", { member: profile })
  }
  const goMyWork = () => {
    history.push("/partner-my-work", { profile })
  }
  const goProfile = () => {
    history.push("/partner-profile", { profile })
  }

  const NotiAllRequest = () => {
    return (
      <Badge badgeContent={reqCount} color="primary">
        <MonetizationOn />
      </Badge>
    )
  }
  const NotiAllWork = () => {
    return (
      <Badge badgeContent={myPostCount} color="primary">
        <LibraryAddCheck />
      </Badge>
    )
  }

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
      showLabels
    >
      <BottomNavigationAction
        style={{ whiteSpace: "nowrap", color: "white" }}
        label="โหมดงาน"
        value="tab1"
        icon={<InsertEmoticon />}
        onClick={goDashboard}
      />
      <BottomNavigationAction
        style={{ whiteSpace: "nowrap", color: "white" }}
        label="งานที่เสนอ"
        value="tab2"
        icon={<NotiAllRequest />}
        onClick={goRequest}
      />
      <BottomNavigationAction
        style={{ whiteSpace: "nowrap", color: "white" }}
        label="งานของฉัน"
        value="tab3"
        icon={<NotiAllWork />}
        onClick={goMyWork}
      />
      <BottomNavigationAction
        style={{ whiteSpace: "nowrap", color: "white" }}
        label="ข้อมูลส่วนตัว"
        value="tab4"
        icon={<AccountBox />}
        onClick={goProfile}
      />
      <BottomNavigationAction
        style={{ whiteSpace: "nowrap", color: "white" }}
        label="Logout"
        value="tab5"
        icon={<ExitToApp />}
        onClick={() => history.push("/")}
      />
    </BottomNavigation>
  )
}
