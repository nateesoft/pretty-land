import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import Moment from "moment"
import { Button } from "@material-ui/core"
import Rating from "@material-ui/lab/Rating"

import ImageBackground from "../../../components/background"
import Header from "../../../components/header"
import Footer from "../../../components/footer/Partner"

import firebase from "../../../../util/firebase"
import { AppConfig } from "../../../../Constants"

export default function PartnerSendCustomer() {
  const history = useHistory()
  const { item, profile } = history.location.state
  const [partner, setPartner] = useState({})

  const partnerClosePosts = (posts, postsPartner) => {
    firebase
      .database()
      .ref(`${AppConfig.env}/posts/${posts.id}/partnerSelect/${postsPartner.partnerId}`)
      .update({
        selectStatus: AppConfig.PostsStatus.partnerCloseJob,
        selectStatusText: "รับทราบและปิดโพสท์",
        partner_close_date: new Date().toUTCString(),
        sys_update_date: new Date().toUTCString()
      })
    history.push("/partner-my-work", { profile })
  }

  const partnerMassageCancel = (partnerId) => {
    firebase
      .database()
      .ref(`${AppConfig.env}/posts/${item.id}/partnerSelect/${partnerId}`)
      .update({
        partnerStatus: AppConfig.PostsStatus.partnerCancelWork,
        partnerStatusText: "น้องๆแจ้งไม่รับงาน",
        partnerStart: new Date().toUTCString(),
        sys_update_date: new Date().toUTCString(),
        start_work_date: new Date().toUTCString()
      })

    firebase.database().ref(`${AppConfig.env}/posts/${item.id}`).update({
      status: AppConfig.PostsStatus.postCancel,
      statusText: "น้องๆแจ้งไม่รับงาน",
      sys_update_date: new Date().toUTCString()
    })
    history.push("/partner", { member: profile })
  }

  const partnerMassageAccept = (partnerId) => {
    firebase
      .database()
      .ref(`${AppConfig.env}/posts/${item.id}/partnerSelect/${partnerId}`)
      .update({
        partnerStatus: AppConfig.PostsStatus.partnerAcceptWork,
        partnerStatusText: "น้องๆแจ้งรับงาน",
        partnerStart: new Date().toUTCString(),
        sys_update_date: new Date().toUTCString(),
        start_work_date: new Date().toUTCString()
      })

    firebase.database().ref(`${AppConfig.env}/posts/${item.id}`).update({
      status: AppConfig.PostsStatus.waitAdminApprovePost,
      statusText: "รอ Admin อนุมัติโพสท์",
      sys_update_date: new Date().toUTCString()
    })
    history.push("/partner", { member: profile })
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

  return (
    <ImageBackground>
      <Header profile={profile} />
      <div style={{ marginTop: 55 }}>
        <div
          style={{
            backgroundColor: "#ff2fe6",
            color: "white",
            padding: 10,
            fontSize: 22,
            fontWeight: "bold"
          }}
        >
          <div align="center">รายละเอียดงานที่แจ้งลูกค้า</div>
        </div>
        <hr />
        <div style={{ margin: 5, padding: 5 }}>
          <div style={{ color: "blue" }}>ลูกค้า: {item.customerName}</div>
          <div>โหมดงาน: {item.partnerRequest}</div>
          <div>จังหวัด: {item.provinceName}</div>
          <div>
            วันที่แจ้ง:{" "}
            {Moment(item.sys_create_date).format("DD/MM/YYYY HH:mm:ss")}
          </div>
          <div>Lv.ลูกค้า: {item.customerLevel}</div>
          <div>เบอร์ติดต่อ: {item.customerPhone}</div>
          <div
            align="center"
            style={{
              padding: 10,
              borderRadius: 10,
              border: "1px solid gray",
              marginTop: 10
            }}
          >
            <div>ราคาที่เสนอ {partner.amount} บาท</div>
            <hr />
          </div>
        </div>
        {(partner.partnerStatus === AppConfig.PostsStatus.partnerCloseJob ||
          item.status === AppConfig.PostsStatus.closeJob) && (
          <div align="center">
            <div style={{ fontSize: 20, color: "blue" }}>
              ปิดงานเรียบร้อยแล้ว
            </div>
            <Rating value={item.rate} />
            <div style={{ fontSize: 20 }}>คะแนนที่ได้รับ {item.rate} ดาว</div>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => partnerClosePosts(item, partner)}
            >
              รับทราบ Clear รายการ
            </Button>
          </div>
        )}
        {item.status === AppConfig.PostsStatus.waitPartnerConfrimWork && (
          <div align="center">
            <Button
              variant="contained"
              style={{
                margin: 5,
                backgroundColor: "red",
                borderRadius: 5,
                width: 200
              }}
              title="ปฏิเสธงาน"
              onClick={() => partnerMassageCancel(profile.id)}
            >
              ปฏิเสธงาน
            </Button>
            <Button
              variant="contained"
              style={{
                margin: 5,
                backgroundColor: "#ff2fe6",
                borderRadius: 5,
                width: 200
              }}
              title="แจ้งรับงาน"
              onClick={() => partnerMassageAccept(profile.id)}
            >
              แจ้งรับงาน
            </Button>
          </div>
        )}
      </div>
      <Footer profile={profile} />
    </ImageBackground>
  )
}
