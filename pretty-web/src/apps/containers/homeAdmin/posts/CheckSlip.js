import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import Moment from "moment"
import { Button } from "@material-ui/core"
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline"
import Cookies from "js-cookie"
import { NotificationManager } from "react-notifications"
import Swal from 'sweetalert2'

import Header from "../../../components/header"
import ImageBackground from "../../../components/background"

import { adminSaveConfirmPayment } from "../../../../apis"
import { AppConfig } from "../../../../Constants"

export default function CheckSlip() {
  const history = useHistory()
  if (!Cookies.get("logged_in")) {
    window.location.href = ""
  }
  const { item, member } = history.location.state
  const [listPartner, setListPartner] = useState([])

  const getPartnerList = (item) => {
    return new Promise((resolve, reject) => {
      let list = []
      for (let key in item) {
        const data = item[key]
        if (
          data.selectStatus === AppConfig.PostsStatus.customerConfirm ||
          data.partnerStatus === AppConfig.PostsStatus.partnerAcceptWork
        ) {
          list.push(data)
        }
      }
      setListPartner(list)
      resolve(true)
    })
  }

  const saveConfirmPayment = () => {
    adminSaveConfirmPayment(item, listPartner)
      .then((res) => {
        if (res) {
          Swal.fire(
            "ข้อมูลอัพเดตแล้ว",
            "บันทึกตรวจสอบสลิปการโอนเงิน เรียบร้อยแล้ว",
            "success"
          )
          history.goBack();
        }
      })
      .catch((err) => NotificationManager.error(err))
  }

  useEffect(() => {
    getPartnerList(item.partnerSelect).catch((err) => NotificationManager.error(err))
  }, [])

  return (
    <ImageBackground>
      <Header profile={member} />
      <div style={{ marginTop: 55, overflow: "auto", height: 500 }}>
        <div
          style={{
            backgroundColor: "#ff2fe6",
            color: "white",
            padding: 10,
            fontSize: 22,
            fontWeight: "bold"
          }}
        >
          <div align="center">ตรวจสอบสลิปการโอนเงิน</div>
          <div align="center" style={{ fontSize: 14 }}>
            ( สถานะ {item.statusText} )
          </div>
        </div>
        <div align="center">
          <img
            src={item.slip_image}
            alt=""
            style={{ width: 350, height: "auto" }}
          />
        </div>
        <hr />
        <div style={{ margin: 5, padding: 5 }}>
          <div style={{ color: "blue" }}>ชื่อลูกค้า: {item.customerName}</div>
          <div>Level: {item.customerLevel}</div>
          <div style={{ color: "green" }}>สถานที่: {item.placeMeeting}</div>
          <div style={{ color: "red" }}>
            เวลาเริ่ม: {item.startTime}, เวลาเลิก: {item.stopTime}
          </div>
          <hr />
          <div>เบอร์ติดต่อ: {item.customerPhone}</div>
          <div style={{ color: "brown" }}>
            รายละเอียดเพิ่มเติม: {item.customerRemark}
          </div>
          <div>ยอดเงินโอน: {parseFloat(item.transferAmount).toFixed(2)}</div>
          <div>เวลาที่โอนเงิน: {item.transferTime}</div>
          <hr />
          <div>ธนาคารที่โอนเงิน: {item.bankName}</div>
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
        {item.partnerRequest === AppConfig.PartnerType.type4 && (
          <div
            style={{
              padding: 10,
              alignSelf: "center",
              borderWidth: 1.5,
              margin: 10,
              borderColor: "pink",
              width: "85%"
            }}
          >
            <div style={{ color: "blue" }}>ชื่อลูกค้า: {item.customerName}</div>
            <div>Level: {item.customerLevel}</div>
            <div>เบอร์ติดต่อลูกค้า: {item.customerPhone}</div>
            <div>ธนาคารที่โอนเงิน: {item.bankName}</div>
            <div>ยอดเงินโอน: {parseFloat(item.transferAmount).toFixed(2)}</div>
            <div>เวลาที่โอนเงิน: {item.transferTime}</div>
          </div>
        )}
        <div align="center">
          <div style={{ marginBottom: 5, fontSize: 16 }}>
            ยอดรับชำระสำหรับ {listPartner.length} คน
          </div>
          <div>
            {listPartner.map((obj, index) => (
              <div
                key={obj.partnerId}
                style={{ alignItems: "center", margin: 10 }}
              >
                <img
                  src={obj.image}
                  alt=""
                  style={{ width: 100, height: 100 }}
                />
                <div style={{ marginTop: 5, color: "blue" }}>
                  ชื่อ: {obj.partnerName || obj.name}
                </div>
                <div>ธนาคาร: {obj.bankName}</div>
                <div>เลขที่บัญชี: {obj.bankNo}</div>
                <div>เบอร์โทร: {obj.telephone}</div>
                <div>Lien: {obj.lineId}</div>
                {item.partnerRequest === AppConfig.PartnerType.type4 && (
                  <div
                    style={{
                      backgroundColor: "pink",
                      padding: 5,
                      marginTop: 5
                    }}
                  >
                    {obj.place && (
                      <div style={{ marginTop: 5 }}>สถานที่: {obj.place}</div>
                    )}
                    <div style={{ marginTop: 5 }}>
                      เวลาที่จะไป: {item.timeMeeting}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div align="center">
        <Button
          style={{ backgroundColor: "green", color: "white" }}
          variant="contained"
          startIcon={<CheckCircleOutlineIcon />}
          onClick={() => saveConfirmPayment()}
        >
          ยืนยันข้อมูลการโอนเงิน
        </Button>
      </div>
      {/* <Footer profile={member} /> */}
    </ImageBackground>
  )
}
