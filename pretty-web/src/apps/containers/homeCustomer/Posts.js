import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import Moment from "moment"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import Cookies from "js-cookie"

import ImageBackground from "../../components/background"
import Header from "../../components/header"
import Footer from "../../components/footer/Customer"

import { AppConfig } from "../../../Constants"
import firebase from "../../../util/firebase"
import { snapshotToArray } from "../../../util"
import { updatePosts } from "../../../apis"

export default function Posts(props) {
  const history = useHistory()
  if (!Cookies.get("logged_in")) {
    window.location.href = ""
  }
  const { member } = history.location.state
  const [filterList, setFilterList] = useState([])

  const onPressOptions = (item) => {
    if (item.status === AppConfig.PostsStatus.waitCustomerSelectPartner) {
      history.push("/customer-select-partner", {
        postItem: item,
        customerProfile: member
      })
    } else {
      history.push("/customer-review-task", {
        postDetail: item,
        customerProfile: member
      })
    }
  }

  useEffect(() => {
    const ref = firebase
      .database()
      .ref(`${AppConfig.env}/posts`)
      .orderByChild("customerId")
      .equalTo(member.id)
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
              return item
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
              return item
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
            return item
          }
        }
      })

      listData = listData.sort((a, b) => {
        return Moment(b.sys_update_date) - Moment(a.sys_update_date)
      })
      setFilterList(listData)
    })
    return () => ref.off("value", listener)
  }, [])

  return (
    <ImageBackground>
      <Header profile={member} hideBack />
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
        แสดงรายการที่โพสท์
      </div>
      {filterList.length === 0 && (
        <div
          align="center"
          style={{
            verticalAlign: "center",
            marginTop: 30,
            fontSize: 22,
            color: "gray"
          }}
        >
          ไม่พบรายการที่โพสท์
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
              <div style={{ color: "blue" }}>ชื่อ: {item.customerName}</div>
              <div>จังหวัด: {item.customerName}</div>
              <div>
                วันที่สร้าง:{" "}
                {Moment(item.sys_create_date).format("DD/MM/YYYY HH:mm:ss")}
              </div>
              <div>Status: {item.statusText}</div>
            </div>
          </ListItem>
        ))}
      <Footer profile={member} />
    </ImageBackground>
  )
}
