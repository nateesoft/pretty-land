import React from "react"
import { useHistory } from "react-router-dom"
import Moment from "moment"
import { Button } from "@material-ui/core"
import { CheckBox, Delete } from "@material-ui/icons"
import Cookies from "js-cookie"
import { NotificationManager } from "react-notifications"
import Swal from "sweetalert2"

import Header from "../../../components/header"
import ImageBackground from "../../../components/background"

import { updatePosts, adminConfirmNewPost } from "../../../../apis"
import { AppConfig } from "../../../../Constants"

export default function PostDetail() {
  const history = useHistory()
  if (!Cookies.get("logged_in")) {
    window.location.href = ""
  }
  const { item, member } = history.location.state

  const updateToApprove = () => {
    Swal.fire({
      title: "พิจารณาตรวจสอบ",
      text: "ยืนยันข้อมูลถูกต้อง กดอนุมัติข้อมูล",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "อนุมัติ"
    }).then((result) => {
      if (result.isConfirmed) {
        if (item.status === AppConfig.PostsStatus.waitAdminApprovePost) {
          updatePosts(item.id, {
            status: AppConfig.PostsStatus.waitCustomerPayment,
            statusText: "รอลูกค้าชำระเงิน",
            sys_update_date: new Date().toUTCString(),
            admin_action: member.username || member.id,
            action_date: new Date().toUTCString()
          })
          Swal.fire("ข้อมูลอัพเดตแล้ว", "ระบบบันทึกข้อมูลไปยังระบบแล้ว", "success")
          history.push("/admin", { member })
        } else {
          adminConfirmNewPost(item)
            .then((res) => {
              if (res) {
                Swal.fire("ข้อมูลอัพเดตแล้ว", "ระบบบันทึกข้อมูลไปยังระบบแล้ว", "success")
                history.push("/admin", { member })
              }
            })
            .catch((err) => NotificationManager.error(err))
        }
      }
    })
  }

  const updateNotApprove = () => {
    Swal.fire({
      title: "พิจารณาตรวจสอบ",
      text: "ยืนยันไม่อนุมัติข้อมูล ใช่หรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่, ไม่อนุมัตืข้อมูล"
    }).then((result) => {
      if (result.isConfirmed) {
        updatePosts(item.id, {
          status: AppConfig.PostsStatus.notApprove,
          statusText: "ไม่อนุมัติโพสท์",
          sys_update_date: new Date().toUTCString(),
          admin_action: member.username || member.id,
          action_date: new Date().toUTCString()
        })
        Swal.fire("ข้อมูลอัพเดตแล้ว", "ระบบบันทึกข้อมูลไปยังระบบแล้ว", "success")
        history.push("/admin", { member })
      }
    })
  }

  return (
    <ImageBackground>
      <Header profile={member} />
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
          <div align="center">รายละเอียดโพสท์</div>
          <div align="center" style={{ fontSize: 14 }}>
            ( สถานะ {item.statusText} )
          </div>
        </div>
        <hr />
        <div style={{ margin: 5, padding: 5 }}>
          <div>โหมดงาน: {item.partnerRequest}</div>
          <div>
            เพศที่เรียก:{" "}
            {item.sexTarget === "female"
              ? "หญิง"
              : item.sexTarget === "male"
              ? "ชาย"
              : "อื่น ๆ"}
          </div>
          <div>จำนวนน้องๆ ที่ต้องการ: {item.partnerWantQty} คน</div>
          <hr />
          <div style={{ color: "blue" }}>ชื่อลูกค้า: {item.customerName}</div>
          <div>
            เพศลูกค้า:{" "}
            {item.customerGender === "female"
              ? "หญิง"
              : item.customerGender === "male"
              ? "ชาย"
              : "อื่น ๆ"}
          </div>
          <div>Level: {item.customerLevel}</div>
          <div>จังหวัด: {item.provinceName}</div>
          <div style={{ color: "red" }}>
            เวลาเริ่ม: {item.startTime}, เวลาเลิก: {item.stopTime}
          </div>
          <hr />
          <div style={{ color: "green" }}>สถานที่: {item.placeMeeting}</div>
          <div>เบอร์โทร: {item.customerPhone}</div>
          <div style={{ color: "brown" }}>
            รายละเอียดเพิ่มเติม: {item.customerRemark}
          </div>
          <hr />
          <div>
            วันที่สร้างข้อมูล{" "}
            {Moment(item.sys_create_date).format("DD/MM/YYYY HH:mm:ss")}
          </div>
          <div>
            วันที่อัพเดตข้อมูล{" "}
            {Moment(item.sys_update_date).format("DD/MM/YYYY HH:mm:ss")}
          </div>
        </div>
        <hr />
        {(item.status === AppConfig.PostsStatus.customerNewPostDone ||
          item.status === AppConfig.PostsStatus.waitAdminApprovePost) && (
          <div>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: 5 }}
              startIcon={<CheckBox />}
              onClick={updateToApprove}
            >
              อนุมัติโพสท์
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ margin: 5 }}
              startIcon={<Delete />}
              onClick={updateNotApprove}
            >
              ไม่อนุมัติโพสท์
            </Button>
          </div>
        )}
      </div>
    </ImageBackground>
  )
}
