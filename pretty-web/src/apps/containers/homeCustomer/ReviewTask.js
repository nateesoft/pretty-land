import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Button, Grid } from "@material-ui/core"
import Rating from "@material-ui/lab/Rating"
import Typography from "@material-ui/core/Typography"

import { AppConfig } from "../../../Constants"
import firebase from "../../../util/firebase"

import Header from "../../components/header"
import Footer from "../../components/footer/Customer"
import ImageBackground from "../../components/background"

export default function ReviewTask() {
  const [items, setItem] = useState([])
  const [rate, setRate] = useState(1)
  const history = useHistory()
  const { postDetail, customerProfile } = history.location.state

  const saveStartWork = () => {
    firebase.database().ref(`${AppConfig.env}/posts/${postDetail.id}`).update({
      status: AppConfig.PostsStatus.startWork,
      statusText: "เริ่มปฏิบัติงาน",
      sys_update_date: new Date().toUTCString(),
      start_work_date: new Date().toUTCString()
    })
    history.push("/customer-posts", { member: customerProfile })
  }

  const saveHistoryStar = (partnerId) => {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`${AppConfig.env}/partner_star/${partnerId}/${postDetail.id}`)
        .update({
          star: rate,
          sys_date: new Date().toUTCString()
        })
        .then((result) => {
          resolve(true)
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
          resolve(true)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  const saveToCloseJob = async () => {
    if (
      window.confirm(`ยืนยันการปิดงานเรียบร้อย โดยให้คะแนนน้องๆ ${rate} ดาว`)
    ) {
      items.map(async (item, index) => {
        await updateMember(item.workIn, item.workPoint, item.partnerId)
        await saveHistoryStar(item.partnerId)
      })

      firebase
        .database()
        .ref(`${AppConfig.env}/posts/${postDetail.id}`)
        .update({
          rate,
          status: AppConfig.PostsStatus.closeJob,
          statusText: "ปิดงานเรียบร้อย",
          sys_update_date: new Date().toUTCString()
        })

      alert("บันทึกให้คะแนนข้อมูลเรียบร้อยแล้ว")
      history.goBack()
    }
  }

  const getListPartner = () => {
    return new Promise((resolve, reject) => {
      const list = postDetail.partnerSelect
      const listPartner = []
      for (let key in list) {
        const obj = list[key]
        if (
          obj.selectStatus === AppConfig.PostsStatus.customerConfirm ||
          obj.selectStatus === AppConfig.PostsStatus.customerPayment
        ) {
          listPartner.push(obj)
        }
      }
      resolve(listPartner)
    })
  }

  useEffect(() => {
    getListPartner()
      .then((res) => setItem(res))
      .catch((err) => alert(err))
  }, [])

  return (
    <ImageBackground>
      <Header profile={customerProfile} />
      <div style={{ marginBottom: 50, overflow: "auto", height: 600 }}>
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
          รายละเอียดโพสท์
        </div>
        <div
          style={{
            border: "1px solid",
            margin: 10,
            padding: 10,
            borderRadius: 5,
            borderColor: "gray"
          }}
        >
          <div style={{ color: "blue" }}>
            ชื่อผู้โพสท์: {postDetail.customerName}
          </div>
          <div>Level: {postDetail.customerLevel}</div>
          <div>เบอร์โทรศัพท์: {postDetail.customerPhone}</div>
          <div style={{ color: "green" }}>
            สถานที่: {postDetail.placeMeeting}
          </div>
          <div>จังหวัด: {postDetail.provinceName}</div>
          <div align="center" style={{ marginTop: 20 }}>
            {postDetail.status ===
              AppConfig.PostsStatus.customerNewPostDone && (
              <div
                style={{
                  fontSize: 18,
                  color: "blue",
                  alignSelf: "center",
                  padding: 20
                }}
              >
                โพสท์ใหม่ รอตรวจสอบจาก admin...
              </div>
            )}
            {postDetail.status ===
              AppConfig.PostsStatus.adminConfirmNewPost && (
              <div>
                <div
                  style={{
                    fontSize: 18,
                    color: "blue",
                    alignSelf: "center",
                    marginTop: 10
                  }}
                >
                  ได้รับการอนุมัติจาก admin แล้ว
                </div>
                <div
                  style={{
                    fontSize: 18,
                    color: "red",
                    alignSelf: "center"
                  }}
                >
                  (รอรับงาน)
                </div>
              </div>
            )}
            {postDetail.status ===
              AppConfig.PostsStatus.waitAdminConfirmPayment && (
              <div
                style={{
                  fontSize: 18,
                  color: "blue",
                  alignSelf: "center",
                  padding: 20
                }}
              >
                รอตรวจสอบ หลักฐานการโอนเงิน...
              </div>
            )}
            {postDetail.status === AppConfig.PostsStatus.closeJob && (
              <div>
                <div
                  style={{
                    fontSize: 18,
                    color: "red",
                    alignSelf: "center",
                    padding: 20
                  }}
                >
                  ปิดงานเรียบร้อยแล้ว
                </div>
                <div style={{ alignSelf: "center" }}>
                  คะแนนที่ได้รับ {postDetail.rate || 0} คะแนน
                </div>
              </div>
            )}
          </div>
        </div>
        {postDetail.status === AppConfig.PostsStatus.adminConfirmPayment && (
          <div align="center">
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={saveStartWork}
              >
                กดเริ่มงาน
              </Button>
            </div>
          </div>
        )}
        {postDetail.status === AppConfig.PostsStatus.startWork && (
          <div align="center">
            <div
              style={{ backgroundColor: "yellow", fontSize: 22, margin: 10 }}
            >
              *** ให้คะแนนน้องๆ เมื่อทำงานเสร็จเรียบร้อยแล้วเท่านั้น
            </div>
            <div>
              <Typography component="legend">ให้คะแนน</Typography>
              <Rating
                name="simple-controlled"
                value={rate}
                onChange={(event, newValue) => {
                  setRate(newValue)
                }}
              />
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={saveToCloseJob}
              >
                ให้คะแนนน้อง ๆ
              </Button>
            </div>
          </div>
        )}
        <div align="center" style={{ marginTop: 20 }}>
          {items &&
            items.map((obj, index) => (
              <Grid container justifyContent="center">
                <Grid item xs={6}>
                  <div align="left">
                    <div>ชื่อน้อง: {obj.partnerName}</div>
                    <div>ราคา: {obj.amount}</div>
                    <div>เบอร์โทร: {obj.telephone}</div>
                    <div>
                      เพศ:{" "}
                      {obj.sex === "female"
                        ? "หญิง"
                        : obj.sex === "male"
                        ? "ชาย"
                        : "อื่น ๆ"}
                    </div>
                  </div>
                  <img
                    src={obj.image}
                    alt=""
                    style={{ width: 150, height: "auto" }}
                  />
                </Grid>
              </Grid>
            ))}
        </div>
        {postDetail.status === AppConfig.PostsStatus.customerCloseJob && (
          <div align="center">
            <div>
              <div>สถานะ: </div>
              <div>คะแนนที่ได้รับ: </div>
            </div>
          </div>
        )}
      </div>
      <Footer profile={customerProfile} />
    </ImageBackground>
  )
}
