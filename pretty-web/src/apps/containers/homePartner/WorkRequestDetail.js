import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import { HighlightOff, CheckCircle } from "@material-ui/icons"
import Moment from "moment"
import { useHistory } from "react-router-dom"
import { Button } from "@material-ui/core"
import Cookies from "js-cookie"
import { NotificationManager } from "react-notifications"
import Swal from "sweetalert2"

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

export default function WorkRequestDetail(props) {
  const history = useHistory()
  if (!Cookies.get("logged_in")) {
    window.location.href = ""
  }
  const classes = useStyles()
  const { item, profile } = history.location.state
  const [partner, setPartner] = useState({})
  const [filterList, setFilterList] = useState([])

  const partnerReject = (partnerId) => {
    Swal.fire({
      title: "กรุณายืนยันข้อมูล",
      text: "แจ้งไม่รับงานใช่หรือไม่ ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ปฏิเสธรับงานนี้"
    }).then((result) => {
      if (result.isConfirmed) {
        firebase
          .database()
          .ref(`${AppConfig.env}/posts/${item.id}/partnerSelect/${partnerId}`)
          .update({
            selectStatus: AppConfig.PostsStatus.partnerCancelWork,
            selectStatusText: "น้องๆ ปฏิเสธงาน",
            sys_update_date: new Date().toUTCString()
          })

        firebase.database().ref(`${AppConfig.env}/posts/${item.id}`).update({
          status: AppConfig.PostsStatus.closeJob,
          statusText: "น้องๆ แจ้งไม่รับงาน",
          sys_update_date: new Date().toUTCString()
        })
        Swal.fire(
          "ข้อมูลอัพเดตแล้ว",
          "ระบบบันทึกข้อมูลไปยังระบบแล้ว",
          "success"
        )
        history.goBack()
      }
    })
  }

  const partnerConfrim = (partnerId) => {
    Swal.fire({
      title: "กรุณายืนยันข้อมูล",
      text: "ต้องการรับงานนี้ใช่หรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "รับงานนี้"
    }).then((result) => {
      if (result.isConfirmed) {
        firebase
          .database()
          .ref(`${AppConfig.env}/posts/${item.id}/partnerSelect/${partnerId}`)
          .update({
            selectStatus: AppConfig.PostsStatus.customerConfirm,
            selectStatusText: "น้องๆแจ้งรับงาน รอลูกค้าขำระเงิน",
            place: profile.address,
            charactor: profile.charactor,
            start_work_date: new Date().toUTCString(),
            sys_update_date: new Date().toUTCString()
          })

        firebase.database().ref(`${AppConfig.env}/posts/${item.id}`).update({
          status: AppConfig.PostsStatus.waitCustomerPayment,
          statusText: "รอลูกค้าชำระค่าดำเนินการ",
          sys_update_date: new Date().toUTCString()
        })

        Swal.fire(
          "ข้อมูลอัพเดตแล้ว",
          "ระบบบันทึกข้อมูลไปยังระบบแล้ว",
          "success"
        )
        history.goBack()
      }
    })
  }

  useEffect(() => {
    const ref = firebase
      .database()
      .ref(`${AppConfig.env}/posts/${item.id}/partnerSelect/${profile.id}`)
    ref.once("value", (snapshot) => {
      const data = { ...snapshot.val() }
      setPartner(data)
    })
  }, [])

  const getListMyWork = (snapshot) => {
    return new Promise((resolve, reject) => {
      const posts = snapshotToArray(snapshot)
      let myWorkList = []
      posts.forEach((item) => {
        const data = item.partnerSelect
        for (let key in data) {
          const obj = data[key]
          const statusMatch =
            item.status === AppConfig.PostsStatus.waitPartnerConfrimWork ||
            item.status === AppConfig.PostsStatus.waitCustomerSelectPartner
          if (obj.partnerId === profile.id && statusMatch) {
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
      getListMyWork(snapshot).catch((err) => NotificationManager.error(err))
    })
    return () => ref.off("value", listener)
  }, [])

  return (
    <ImageBackground>
      <Header profile={profile} />
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
          รายละเอียดงานที่แจ้งลูกค้า
        </div>
        <List className={classes.root}>
          <ListItem key={item.id}>
            <ListItemAvatar>
              <Avatar
                src={item.partnerImage}
                alt=""
                variant="circular"
                style={{ width: 64, height: 64 }}
              />
            </ListItemAvatar>
            <div style={{ margin: 10, width: "100%" }}>
              <div
                style={{
                  backgroundColor: "#123456",
                  color: "white",
                  padding: 5
                }}
              >
                ลูกค้า: {item.customerName}
              </div>
              <div>จังหวัด: {item.provinceName}</div>
              <div>
                วันที่แจ้ง: {Moment(item.sys_create_date).format("D MMM YYYY")}
              </div>
              <div>
                เพศลูกค้า:{" "}
                {item.customerGender === "male"
                  ? "ชาย"
                  : item.customerGender === "female"
                  ? "หญิง"
                  : "อื่น ๆ"}
              </div>
              <div>Lv.ลูกค้า: {item.customerLevel}</div>
              <div style={{ backgroundColor: "chocolate", color: "white" }}>
                โหมดงาน: {item.partnerRequest}
              </div>
              <hr />
              <div>
                สถานที่เรียก: {item.placeMeeting}
              </div>
              <div style={{ color: "brown" }}>
                รายละเอียดเพิ่มเติม: {item.customerRemark}
              </div>
              <div>
                วันที่โพสท์:{" "}
                {Moment(item.sys_create_date).format("DD/MM/YYYY HH:mm:ss")}
              </div>
              <div
                style={{
                  padding: 20,
                  border: "1px solid",
                  borderRadius: 10,
                  marginTop: 10
                }}
              >
                <div>ราคาที่เสนอ {partner.amount}</div>
                <hr />
              </div>
              {item.status === AppConfig.PostsStatus.waitPartnerConfrimWork && (
                <div style={{ width: "100%" }}>
                  <Button
                    startIcon={<HighlightOff />}
                    variant="contained"
                    onClick={() => partnerReject(profile.id)}
                    style={{
                      margin: 5,
                      color: "white",
                      backgroundColor: "red",
                      borderRadius: 5,
                      width: 200
                    }}
                  >
                    ปฏิเสธงาน
                  </Button>
                  <Button
                    startIcon={<CheckCircle />}
                    variant="contained"
                    onClick={() => partnerConfrim(profile.id)}
                    style={{
                      margin: 5,
                      color: "white",
                      backgroundColor: "#ff2fe6",
                      borderRadius: 5,
                      fontSize: 18,
                      width: 200
                    }}
                  >
                    แจ้งรับงาน
                  </Button>
                </div>
              )}
            </div>
          </ListItem>
        </List>
      </div>
      <Footer profile={profile} />
    </ImageBackground>
  )
}
