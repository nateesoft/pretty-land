import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import BottomNavigation from "@material-ui/core/BottomNavigation"
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction"
import { useHistory } from "react-router-dom"
import {
  People,
  ExitToApp,
  Receipt,
  AccountBox,
  Settings
} from "@material-ui/icons"
import { Badge } from "@material-ui/core"

import firebase from '../../../util/firebase'
import { AppConfig } from "../../../Constants"

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundColor: "#ff32ee"
  }
})

export default function AdminFooter(props) {
  const { profile } = props
  const history = useHistory()
  const classes = useStyles()
  const [value, setValue] = useState("tab1")

  const [memberCount, setMemberCount] = useState(0)
  const [postsCount, setPostCount] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const goDashboard = () => {
    history.push("/admin", { member: profile })
  }

  const goMembers = () => {
    history.push("/admin-members", { member: profile })
  }

  const goSetting = () => {
    history.push("/admin-profile", { member: profile })
  }

  const goSystemConfig = () => {
    history.push("/admin-config-system", { member: profile })
  }

  const NotiAllPost = () => {
    return (
      <Badge badgeContent={postsCount} color="primary">
        <Receipt />
      </Badge>
    )
  }
  const NotiAllMember = () => {
    return (
      <Badge badgeContent={memberCount} color="primary">
        <People />
      </Badge>
    )
  }

  useEffect(() => {
    const ref = firebase
      .database()
      .ref(`${AppConfig.env}/members`)
      .orderByChild("status")
      .equalTo(AppConfig.MemberStatus.newRegister)
    const listener = ref.on("value", (snapshot) => {
      setMemberCount(snapshot.numChildren())
    })
    return () => ref.off("value", listener)
  }, [])

  useEffect(() => {
    const ref = firebase
      .database()
      .ref(`${AppConfig.env}/posts`)
      .orderByChild("status")
      .equalTo(AppConfig.PostsStatus.customerNewPostDone)
    const listener = ref.on("value", (snapshot) => {
      setPostCount(snapshot.numChildren())
    })
    return () => ref.off("value", listener)
  }, [])

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
      showLabels
    >
      <BottomNavigationAction
        style={{ whiteSpace: "nowrap", color: "white" }}
        label="โพสท์ทั้งหมด"
        value="tab1"
        icon={<NotiAllPost />}
        onClick={goDashboard}
      />
      <BottomNavigationAction
        style={{ whiteSpace: "nowrap", color: "white" }}
        label="สมาชิกในระบบ"
        value="tab2"
        icon={<NotiAllMember />}
        onClick={goMembers}
      />
      <BottomNavigationAction
        style={{ whiteSpace: "nowrap", color: "white" }}
        label="ข้อมูลส่วนตัว"
        value="tab3"
        icon={<AccountBox />}
        onClick={goSetting}
      />
      <BottomNavigationAction
        style={{ whiteSpace: "nowrap", color: "white" }}
        label="ตั้งค่าระบบ"
        value="tab4"
        icon={<Settings />}
        onClick={goSystemConfig}
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
