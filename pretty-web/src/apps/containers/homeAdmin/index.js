import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import {
  People,
  ExitToApp,
  Receipt,
  AccountBox,
  Settings
} from "@material-ui/icons"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import { useHistory } from "react-router-dom"
import Moment from "moment"

import { getConfigList } from "../../../apis"
import firebase from "../../../util/firebase"
import { snapshotToArray } from "../../../util"
import { AppConfig } from "../../../Constants"

import Dashboard from "./Dashboard"
import Members from "./Members"
import ProfileSettings from "./ProfileSetting"
import SystemConfig from "./SystemConfig"

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "fixed",
    bottom: 0
  }
}))

export default function ScrollableTabsButtonForce() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const history = useHistory()

  const [members, setMembers] = useState([])
  const [items, setItems] = useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const logout = () => {
    history.push("/")
  }

  useEffect(() => {
    const ref = firebase.database().ref(`${AppConfig.env}/members`)
    const listener = ref.on("value", (snapshot) => {
      const memberInCloud = snapshotToArray(snapshot)
      let newMemberList = memberInCloud.filter(
        (item, index) => item.memberType === "partner"
      )
      let waitApprove = memberInCloud.filter(
        (item, index) =>
          item.status === AppConfig.MemberStatus.newRegister &&
          item.memberType === "partner"
      )
      waitApprove = waitApprove.sort((a, b) => {
        return Moment(b.sys_update_date) - Moment(a.sys_update_date)
      })
      let readyApprove = memberInCloud.filter(
        (item, index) =>
          item.status === AppConfig.MemberStatus.active &&
          item.memberType === "partner"
      )
      readyApprove = readyApprove.sort((a, b) => {
        return Moment(b.sys_update_date) - Moment(a.sys_update_date)
      })
      newMemberList = waitApprove.concat(readyApprove)
      setMembers(newMemberList)

      getConfigList()
        .then((res) => {
          setItems(res)
        })
        .catch((err) => alert(err))
    })

    return () => ref.off("value", listener)
  }, [])

  return (
    <div className={classes.root}>
      <TabPanel value={value} index={0}>
        <Dashboard />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {items && items.length > 0 && (
          <Members members={members} items={items} />
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProfileSettings />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SystemConfig />
      </TabPanel>
      <AppBar position="static" style={{ backgroundColor: "#ff32ee" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="white"
        >
          <Tab label="โพสท์ทั้งหมด" icon={<Receipt />} {...a11yProps(0)} />
          <Tab label="สมาชิกในระบบ" icon={<People />} {...a11yProps(1)} />
          <Tab label="ข้อมูลส่วนตัว" icon={<AccountBox />} {...a11yProps(2)} />
          <Tab label="ตั้งค่าระบบ" icon={<Settings />} {...a11yProps(3)} />
          <Tab
            label="Logout"
            icon={<ExitToApp />}
            {...a11yProps(4)}
            onClick={logout}
          />
        </Tabs>
      </AppBar>
    </div>
  )
}
