import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import BottomNavigation from "@material-ui/core/BottomNavigation"
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction"
import { ListAlt, ExitToApp, ContactPhone, Home } from "@material-ui/icons"
import { useHistory } from "react-router-dom"
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

export default function CustomerFooter(props) {
  const { profile } = props
  const history = useHistory()
  const classes = useStyles()
  const [value, setValue] = useState("tab1")
  const [postsChangeCount, setPostsChangeCount] = useState(0)

  const getCustomerPostChange = (snapshot) => {
    return new Promise((resolve, reject) => {
      const list = snapshot.val()
      let count = 0
      for (let key in list) {
        const postObj = list[key]
        if (
          postObj.status === AppConfig.PostsStatus.waitCustomerPayment &&
          postObj.customerId === profile.id
        ) {
          count = count + 1
        }
      }
      resolve(count)
    })
  }

  useEffect(() => {
    const ref = firebase.database().ref(`${AppConfig.env}/posts`)
    const listener = ref.on("value", (snapshot) => {
      getCustomerPostChange(snapshot).then((res) => setPostsChangeCount(res))
    })

    return () => ref.off("value", listener)
  }, [])


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

  const NotiAllPost = () => {
    return (
      <Badge badgeContent={postsChangeCount} color="primary">
        <ListAlt />
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
        label="หน้าหลัก"
        value="tab1"
        icon={<Home />}
        onClick={goDashboard}
      />
      <BottomNavigationAction
        style={{ whiteSpace: "nowrap", color: "white" }}
        label="รายการโพสท์"
        value="tab2"
        icon={<NotiAllPost />}
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
