import React, { useState } from "react"
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

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const goDashboard = () => {
    history.push("/partner", { member: profile })
  }
  const goRequest = () => {
    history.push("/partner-request", { profile })
  }
  const goMyWork = () => {
    history.push("/partner-my-work", { profile })
  }
  const goProfile = () => {
    history.push("/partner-profile", { profile })
  }

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
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
        icon={<MonetizationOn />}
        onClick={goRequest}
      />
      <BottomNavigationAction
        style={{ whiteSpace: "nowrap", color: "white" }}
        label="งานของฉัน"
        value="tab3"
        icon={<LibraryAddCheck />}
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
