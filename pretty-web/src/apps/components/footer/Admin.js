import React, { useState } from "react"
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

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundColor: "#ff32ee",
  }
})

export default function AdminFooter(props) {
  const { profile } = props
  const history = useHistory()
  const classes = useStyles()
  const [value, setValue] = useState("tab1")

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

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        style={{ whiteSpace: "nowrap", color: "white" }}
        label="โพสท์ทั้งหมด"
        value="tab1"
        icon={<Receipt />}
        onClick={goDashboard}
      />
      <BottomNavigationAction
        style={{ whiteSpace: "nowrap", color: "white" }}
        label="สมาชิกในระบบ"
        value="tab2"
        icon={<People />}
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
