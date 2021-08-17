import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import Moment from "moment"
import { Button } from "@material-ui/core"
import { SkipNext } from "@material-ui/icons"

import ImageBackground from "../../../components/background"
import Header from "../../../components/header"
import Footer from "../../../components/footer/Partner"

import { getMemberProfile } from "../../../../apis"
import firebase from "../../../../util/firebase"
import { AppConfig } from "../../../../Constants"

export default function PartnerSendCustomer() {
  const history = useHistory()
  const { item, profile } = history.location.state
  const [partner, setPartner] = useState({})
  const rate = 5 // default rate

  const saveHistoryStar = (partnerId) => {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`${AppConfig.env}/partner_star/${partnerId}/${item.id}`)
        .update({
          star: rate,
          sys_date: new Date().toUTCString()
        })
        .then((result) => {
          resolve("success")
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  const updateMember = (workIn = 0, workPoint = 0, partnerId) => {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`${AppConfig.env}/members/${partnerId}`)
        .update({
          workIn: parseInt(workIn) + 1,
          workPoint: parseInt(workPoint) + 10
        })
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  const partnerCloseJob = (partnerId) => {
    // update status post (for partner)
    firebase
      .database()
      .ref(`${AppConfig.env}/posts/${item.id}/partnerSelect/${partnerId}`)
      .update({
        selectStatus: AppConfig.PostsStatus.closeJob,
        selectStatusText: "ปิดงานเรียบร้อย",
        partnerStatus: AppConfig.PostsStatus.partnerCloseJob,
        partnerStatusText: "น้องๆ แจ้งปิดงาน",
        partner_close_date: new Date().toUTCString(),
        sys_update_date: new Date().toUTCString()
      })

    if (item.partnerRequest === AppConfig.PartnerType.type4) {
      // update partner close job
      firebase.database().ref(`${AppConfig.env}/posts/${item.id}`).update({
        selectStatus: AppConfig.PostsStatus.closeJob,
        selectStatusText: "ปิดงานเรียบร้อย",
        sys_update_date: new Date().toUTCString()
      })
    }

    getMemberProfile(partnerId).then((pData) => {
      updateMember(pData.workIn, pData.workPoint, partnerId).then((result) => {
        saveHistoryStar(partnerId).then((result) => {
          history.push("/partner", { member: profile })
        })
      })
    })
  }

  const startWorking = () => {
    firebase.database().ref(`${AppConfig.env}/posts/${item.id}`).update({
      status: AppConfig.PostsStatus.startWork,
      statusText: "เริ่มปฏิบัติงาน",
      sys_update_date: new Date().toUTCString(),
      start_work_date: new Date().toUTCString()
    })
    history.push("/partner", { member: profile })
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
        {partner.partnerStatus !== AppConfig.PostsStatus.partnerStartWork &&
          partner.partnerStatus !== AppConfig.PostsStatus.partnerCloseJob &&
          item.status === AppConfig.PostsStatus.adminConfirmPayment && (
            <div align="center">
              <Button
                variant="contained"
                style={{
                  margin: 5,
                  backgroundColor: "green",
                  paddingHorizontal: 20,
                  borderRadius: 5,
                  color: "white"
                }}
                onClick={() => startWorking()}
              >
                กดเริ่มงาน
              </Button>
            </div>
          )}
        {partner.partnerStatus === AppConfig.PostsStatus.partnerStartWork && (
          <div align="center">
            <Button
              variant="contained"
              style={{
                margin: 5,
                backgroundColor: "#ff2fe6",
                paddingHorizontal: 20,
                borderRadius: 25
              }}
              title="บันทึกปิดงาน"
              onClick={() => partnerCloseJob(profile.id)}
            >
              บันทึกปิดงาน
            </Button>
          </div>
        )}
        {(partner.partnerStatus === AppConfig.PostsStatus.partnerCloseJob ||
          item.status === AppConfig.PostsStatus.closeJob) && (
          <div style={{ fontSize: 20, color: "blue" }}>ปิดงานเรียบร้อยแล้ว</div>
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
              onPress={() => partnerMassageCancel(profile.id)}
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
