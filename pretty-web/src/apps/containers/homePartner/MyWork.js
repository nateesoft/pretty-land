import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import Moment from "moment"
import { useHistory } from "react-router-dom"

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
  const classes = useStyles()
  const { profile } = history.location.state
  const [filterList, setFilterList] = useState([])

  const onPressOptions = (item) => {
    if (item.status !== AppConfig.PostsStatus.waitAdminConfirmPayment) {
      // navigation.navigate("Work-Detail", { item })
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
              item.status === AppConfig.PostsStatus.startWork) &&
            obj.partnerId === profile.id
          ) {
            myWorkList.push(item)
          }
        }
      })
      setFilterList(myWorkList)
      resolve(true)
    })
  }

  useEffect(() => {
    const ref = firebase.database().ref(`${AppConfig.env}/posts`)
    const listener = ref.on("value", (snapshot) => {
      getListMyWork(snapshot).catch((err) => alert(err))
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
          งานที่รอดำเนินการ
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
            ไม่พบข้อมูลโพสท์ในระบบ
          </div>
        )}
        <List className={classes.root}>
          {filterList &&
            filterList.map((item, index) => (
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <Avatar
                    src={item.partnerImage}
                    alt=""
                    variant="circular"
                    style={{ width: 64, height: 64 }}
                  />
                </ListItemAvatar>
                {item.status !== AppConfig.PostsStatus.adminConfirmPayment && (
                  <div style={{ margin: 10 }}>
                    <div>โหมดงาน: {item.partnerRequest}</div>
                    <div>จังหวัด: {item.provinceName}</div>
                    <div>
                      วันที่แจ้ง:{" "}
                      {Moment(item.sys_create_date).format("D MMM YYYY")}
                    </div>
                    <hr />
                    <div>ลูกค้า: {item.customerName}</div>
                    <div>Lv.ลูกค้า: {item.customerLevel}</div>
                    <hr />
                    <div>หมายเหตุ: {item.customerRemark}</div>
                  </div>
                )}
                {item.status === AppConfig.PostsStatus.adminConfirmPayment && (
                  <div>
                    <div>โหมดงาน: {item.partnerRequest}</div>
                    <div>จังหวัด: {item.provinceName}</div>
                    <div>
                      วันที่แจ้ง:{" "}
                      {Moment(item.sys_create_date).format("D MMM YYYY")}
                    </div>
                    <hr />
                    <div>ลูกค้า: {item.customerName}</div>
                    <div>Lv.ลูกค้า: {item.customerLevel}</div>
                    <div>เบอร์ติดต่อ: {item.customerPhone}</div>
                    <hr />
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
