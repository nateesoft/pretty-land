import React, { useEffect, useState } from "react"
import Moment from "moment"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import { useHistory } from "react-router-dom"

import Header from "../../../components/header"
import Footer from "../../../components/footer/Customer"
import ImageBackground from "../../../components/background"

import { AppConfig } from "../../../../Constants"
import firebase from "../../../../util/firebase"
import { snapshotToArray } from "../../../../util"
import { updatePosts } from "../../../../apis"

export default function CustomerPosts(props) {
  const [filterList, setFilterList] = useState([])
  const history = useHistory()
  const { partnerType, member } = history.location.state

  const onPressOptions = (item) => {
    if (item.status === AppConfig.PostsStatus.waitAdminConfirmPayment) {
      history.push("/admin-check-slip", { item, member })
    } else {
      history.push("/admin-customer-post-detail", { item, member })
    }
  }

  useEffect(() => {
    const ref = firebase.database().ref(`${AppConfig.env}/posts`)
    const listener = ref.on("value", (snapshot) => {
      const postsList = snapshotToArray(snapshot)
      let listData = postsList.filter((item, index) => {
        if (
          item.status !== AppConfig.PostsStatus.notApprove &&
          item.status !== AppConfig.PostsStatus.customerCancelPost &&
          item.status !== AppConfig.PostsStatus.closeJob &&
          item.status !== AppConfig.PostsStatus.postTimeout
        ) {
          const date1 = Moment()
          const date2 = Moment(item.sys_update_date)
          const diffHours = date1.diff(date2, "hours")

          if (item.status === AppConfig.PostsStatus.customerNewPostDone) {
            if (diffHours <= 24) {
              if (item.partnerType === partnerType) {
                return item
              }
            } else {
              // update timeout
              updatePosts(item.id, {
                status: AppConfig.PostsStatus.postTimeout,
                statusText: "ข้อมูลการโพสท์ใหม่หมดอายุ",
                sys_update_date: new Date().toUTCString()
              })
            }
          } else if (
            item.status === AppConfig.PostsStatus.adminConfirmNewPost
          ) {
            if (diffHours <= 2) {
              if (item.partnerType === partnerType) {
                return item
              }
            } else {
              // update timeout
              updatePosts(item.id, {
                status: AppConfig.PostsStatus.postTimeout,
                statusText:
                  "ข้อมูลการโพสท์หมดอายุ หลังจากอนุมัติเกิน 2 ชั่วโมง",
                sys_update_date: new Date().toUTCString()
              })
            }
          } else {
            if (item.partnerType === partnerType) {
              return item
            }
          }
        }
      })
      setFilterList(listData)
    })
    return () => ref.off("value", listener)
  }, [partnerType])

  return (
    <ImageBackground>
      <Header profile={member} />
      <div
        align="center"
        style={{
          backgroundColor: "#ff2fe6",
          padding: 10,
          fontSize: 22,
          fontWeight: "bold",
          color: "white",
          marginTop: 55
        }}
      >
        รายการโพสท์หางาน
      </div>
      {filterList.length === 0 && (
        <div
          align="center"
          style={{ marginTop: 35, fontSize: 28, color: "gray" }}
        >
          ไม่พบข้อมูลโพสท์ในระบบ
        </div>
      )}
      {filterList &&
        filterList.map((item, index) => (
          <ListItem key={item.id} onClick={() => onPressOptions(item)}>
            <ListItemAvatar>
              <Avatar
                src={item.partnerImage}
                alt=""
                variant="circular"
                style={{ width: 64, height: 64 }}
              />
            </ListItemAvatar>
            <div
              style={{
                border: "2px solid #eee",
                padding: 10,
                width: "100%",
                borderRadius: 10,
                marginLeft: 5
              }}
            >
              <div style={{ color: "blue" }}>
                ชื่อลูกค้า: {item.customerName}
              </div>
              <div style={{ fontWeight: "bold" }}>
                Level: {item.customerLevel}
              </div>
              <div>ประเภทงาน: {item.partnerRequest}</div>
              <div style={{ fontWeight: "bold" }}>
                Status: {item.statusText}
              </div>
              <div>
                วันที่:{" "}
                {Moment(item.sys_create_date).format("DD/MM/YYYY HH:mm:ss")}
              </div>
            </div>
          </ListItem>
        ))}
      <Footer profile={member} />
    </ImageBackground>
  )
}
