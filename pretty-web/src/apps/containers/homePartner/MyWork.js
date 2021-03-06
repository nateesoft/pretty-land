import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import Moment from "moment"
import { useHistory } from "react-router-dom"
import Cookies from "js-cookie"
import { NotificationManager } from "react-notifications"

import ImageBackground from "../../components/background"
import Header from "../../components/header"
import Footer from "../../components/footer/Partner"

import { AppConfig } from "../../../Constants"
import firebase from "../../../util/firebase"
import { snapshotToArray } from "../../../util"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    position: "relative",
    overflow: "auto",
    maxHeight: window.innerHeight - 120
  }
}))

export default function WorkRequest() {
  const history = useHistory()
  if (!Cookies.get("logged_in")) {
    window.location.href = ""
  }
  const classes = useStyles()
  const { profile } = history.location.state
  const [filterList, setFilterList] = useState([])

  const onPressOptions = (item) => {
    if (item.status !== AppConfig.PostsStatus.waitAdminConfirmPayment) {
      history.push("/partner-send-customer", { profile, item })
    }
  }

  const getListMyWork = (snapshot) => {
    return new Promise((resolve, reject) => {
      const posts = snapshotToArray(snapshot)
      let myWorkList = []
      posts.forEach((item) => {
        const data = item.partnerSelect
        for (let key in data) {
          const obj = data[key]
          if (
            obj.selectStatus === AppConfig.PostsStatus.customerPayment &&
            (item.status === AppConfig.PostsStatus.adminConfirmPayment ||
              item.status === AppConfig.PostsStatus.startWork ||
              item.status === AppConfig.PostsStatus.closeJob) &&
            obj.partnerId === profile.id
          ) {
            myWorkList.push(item)
          }
        }
      })
      myWorkList.sort((a, b) => {
        return Moment(b.sys_update_date) - Moment(a.sys_update_date)
      })
      setFilterList(myWorkList)
      resolve(true)
    })
  }

  useEffect(() => {
    const ref = firebase.database().ref(`${AppConfig.env}/posts`)
    const listener = ref.on("value", (snapshot) => {
      getListMyWork(snapshot).catch((err) => NotificationManager.error(err))
    })
    return () => ref.off("value", listener)
  }, [])

  return (
    <ImageBackground>
      <Header profile={profile} hideBack />
      <div align="center" style={{ marginTop: 55 }}>
        <div
          align="center"
          style={{
            backgroundColor: "#ff2fe6",
            padding: 10,
            fontSize: 22,
            fontWeight: "bold",
            color: "white"
          }}
        >
          ???????????????????????????
        </div>
        {filterList.length === 0 && (
          <div
            style={{
              fontSize: 23,
              margin: 20,
              fontWeight: "bold",
              color: "gray"
            }}
          >
            ??????????????????????????????????????????????????????????????????
          </div>
        )}
        <List className={classes.root}>
          {filterList &&
            filterList.map((item, index) => (
              <ListItem key={item.id} onClick={() => onPressOptions(item)}>
                <ListItemAvatar>
                  <Avatar
                    src={item.partnerImage}
                    alt=""
                    variant="circular"
                    style={{ width: 64, height: 64, margin: 5 }}
                  />
                </ListItemAvatar>
                {item.status !== AppConfig.PostsStatus.adminConfirmPayment && (
                  <div style={{ margin: 10 }}>
                    <div>?????????????????????: {item.partnerRequest}</div>
                    <div>?????????????????????: {item.provinceName}</div>
                    <div>
                      ??????????????????????????????:{" "}
                      {Moment(item.sys_create_date).format("D MMM YYYY")}
                    </div>
                    <hr />
                    <div>??????????????????: {item.customerName}</div>
                    <div>Lv.??????????????????: {item.customerLevel}</div>
                    <hr />
                    <div>????????????????????????: {item.customerRemark}</div>
                  </div>
                )}
                {item.status === AppConfig.PostsStatus.adminConfirmPayment && (
                  <div>
                    <div>?????????????????????: {item.partnerRequest}</div>
                    <div>?????????????????????: {item.provinceName}</div>
                    <div>
                      ??????????????????????????????:{" "}
                      {Moment(item.sys_create_date).format("D MMM YYYY")}
                    </div>
                    <hr />
                    <div>??????????????????: {item.customerName}</div>
                    <div>Lv.??????????????????: {item.customerLevel}</div>
                    <div>?????????????????????????????????: {item.customerPhone}</div>
                    <hr />
                    <div
                      style={{
                        padding: 5,
                        backgroundColor: "blue",
                        color: "white"
                      }}
                    >
                      ???????????????: {item.statusText}
                    </div>
                  </div>
                )}
              </ListItem>
            ))}
        </List>
      </div>
      <Footer profile={profile} />
    </ImageBackground>
  )
}
