import React from "react"
import { useHistory } from "react-router-dom"
import { AppConfig } from "../../../Constants"

import Header from "../../components/header"
import Footer from "../../components/footer/Customer"
import ImageBackground from "../../components/background"

export default function ReviewTask() {
  const history = useHistory()
  const { postDetail, customerProfile } = history.location.state
  return (
    <ImageBackground>
      <Header profile={customerProfile} />
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
        <div style={{ color: "green" }}>สถานที่: {postDetail.placeMeeting}</div>
        <div>จังหวัด: {postDetail.provinceName}</div>
        <div align="center" style={{ marginTop: 20 }}>
          {postDetail.status === AppConfig.PostsStatus.customerNewPostDone && (
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
          {postDetail.status === AppConfig.PostsStatus.adminConfirmNewPost && (
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
      <Footer profile={customerProfile} />
    </ImageBackground>
  )
}
