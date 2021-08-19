import React, { useEffect, useState } from "react"
import Moment from "moment"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import { useHistory } from "react-router-dom"
import Cookies from "js-cookie"

import Header from "../../../components/header"
import ImageBackground from "../../../components/background"

import { AppConfig } from "../../../../Constants"
import firebase from "../../../../util/firebase"
import { snapshotToArray } from "../../../../util"
import { filterPostsToUpdate } from "../../../../apis"

export default function CustomerPosts(props) {
  const [filterList, setFilterList] = useState([])
  const history = useHistory()
  if (!Cookies.get("logged_in")) {
    window.location.href = ""
  }
  const { partnerType, member } = history.location.state

  const onPressOptions = (item) => {
    if (item.status === AppConfig.PostsStatus.waitAdminConfirmPayment) {
      history.push("/admin-check-slip", { item, member, partnerType })
    } else {
      history.push("/admin-customer-post-detail", { item, member, partnerType })
    }
  }

  useEffect(() => {
    ;(async () => {
      await filterPostsToUpdate()
    })()
  }, [])

  useEffect(() => {
    const ref = firebase.database().ref(`${AppConfig.env}/posts`)
    const listener = ref.on("value", (snapshot) => {
      const postsList = snapshotToArray(snapshot)
      let allPost = postsList.filter(
        (item, index) =>
          item.status !== AppConfig.PostsStatus.customerNewPostDone &&
          item.status !== AppConfig.PostsStatus.customerPayment
      )
      allPost = allPost.sort((a, b) => {
        return Moment(b.sys_update_date) - Moment(a.sys_update_date)
      })
      let waitApprove = postsList.filter(
        (item, index) =>
          item.status === AppConfig.PostsStatus.customerNewPostDone
      )
      waitApprove = waitApprove.sort((a, b) => {
        return Moment(b.sys_update_date) - Moment(a.sys_update_date)
      })
      let waitCheckSlip = postsList.filter(
        (item, index) => item.status === AppConfig.PostsStatus.customerPayment
      )
      waitCheckSlip = waitCheckSlip.sort((a, b) => {
        return Moment(b.sys_update_date) - Moment(a.sys_update_date)
      })
      let newFilterList = waitApprove.concat(waitCheckSlip).concat(allPost)
      setFilterList(
        newFilterList.filter((item) => item.partnerType === partnerType)
      )
    })
    return () => ref.off("value", listener)
  }, [partnerType])

  const GetStatusColor = ({ item }) => {
    let bgColor = ""
    let fontColor = ""
    if (item.status === AppConfig.PostsStatus.customerNewPostDone) {
      bgColor = "red"
      fontColor = "white"
    } else if (item.status === AppConfig.PostsStatus.adminConfirmNewPost) {
      bgColor = "green"
      fontColor = "white"
    } else if (item.status === AppConfig.PostsStatus.waitAdminConfirmPayment) {
      bgColor = "yellow"
      fontColor = "black"
    }
    return (
      <div
        style={{
          fontWeight: "bold",
          backgroundColor: bgColor,
          color: fontColor
        }}
      >
        Status: {item.statusText}
      </div>
    )
  }

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
              <div>
                เพศลูกค้า:{" "}
                {item.customerGender === "male"
                  ? "ชาย"
                  : item.customerGender === "female"
                  ? "หญิง"
                  : "อื่น ๆ"}
              </div>
              <div style={{ fontWeight: "bold" }}>
                Level: {item.customerLevel}
              </div>
              <div>ประเภทงาน: {item.partnerRequest}</div>
              <div>
                เพศที่เรียก:{" "}
                {item.sexTarget === "male"
                  ? "ชาย"
                  : item.sexTarget === "female"
                  ? "หญิง"
                  : "อื่น ๆ"}
              </div>
              <GetStatusColor item={item} />
              <div>
                วันที่ล่าสุด:{" "}
                {Moment(item.sys_update_date).format("DD/MM/YYYY HH:mm:ss")}
              </div>
            </div>
          </ListItem>
        ))}
      {/* <Footer profile={member} /> */}
    </ImageBackground>
  )
}
