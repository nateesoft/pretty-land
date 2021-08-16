import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import BottomNavigation from "@material-ui/core/BottomNavigation"
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction"
import { ListAlt, ExitToApp, ContactPhone, Home } from "@material-ui/icons"
import { useHistory } from "react-router-dom"

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundColor: "#ff32ee"
  }
})

export default function CustomerFooter(props) {
  const { profile } = props
  const history = useHistory()
  const classes = useStyles()
  const [value, setValue] = useState("tab1")

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const goDashboard = () => {
    history.push("/customer", { member: profile })
  }

  const goPosts = () => {
    history.push("/customer-posts", { member: profile })
  }

  const goContactAdmin = () => {
    history.push("/customer-admin", { member: profile })
  }

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        style={{ whiteSpace: "nowrap", color: "white" }}
        label="หน้าหลัก"
        value="tab1"
        icon={<Home />}
        onClick={goDashboard}
      />
      <BottomNavigationAction
        style={{ whiteSpace: "nowrap", color: "white" }}
        label="รายการโพสท์"
        value="tab2"
        icon={<ListAlt />}
        onClick={goPosts}
      />
      <BottomNavigationAction
        style={{ whiteSpace: "nowrap", color: "white" }}
        label="ติดต่อ Admin"
        value="tab3"
        icon={<ContactPhone />}
        onClick={goContactAdmin}
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
