import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import { People, ExitToApp } from "@material-ui/icons"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import { useHistory } from "react-router-dom"

import { getConfigList } from "../../../apis"
import firebase from "../../../util/firebase"
import { snapshotToArray } from "../../../util"
import { AppConfig } from "../../../Constants"
import Members from "./Members"

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
        {items && items.length > 0 && (
          <Members members={members} items={items} />
        )}
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
          <Tab label="สมาชิกในระบบ" icon={<People />} {...a11yProps(0)} />
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
