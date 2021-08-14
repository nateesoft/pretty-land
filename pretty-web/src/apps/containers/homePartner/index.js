import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import {
  AccountBox,
  ExitToApp,
  InsertEmoticon,
  MonetizationOn,
  LibraryAddCheck
} from "@material-ui/icons"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import { useHistory } from "react-router-dom"

import ProfileScreen from "./Profile"
import Dashboard from "./Dashboard"
import WorkRequest from "./WorkRequest"
import MyWork from './MyWork'

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
  const history = useHistory()
  const { member } = history.location.state

  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const logout = () => {
    history.push("/")
  }

  return (
    <div className={classes.root}>
      <TabPanel value={value} index={0}>
        <Dashboard profile={member} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WorkRequest profile={member} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MyWork profile={member} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ProfileScreen profile={member} />
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
          <Tab label="โหมดงาน" icon={<InsertEmoticon />} {...a11yProps(0)} />
          <Tab label="งานที่เสนอ" icon={<MonetizationOn />} {...a11yProps(1)} />
          <Tab label="งานของฉัน" icon={<LibraryAddCheck />} {...a11yProps(2)} />
          <Tab label="ข้อมูลส่วนตัว" icon={<AccountBox />} {...a11yProps(3)} />
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
