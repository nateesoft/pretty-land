import React from "react"
import { useHistory } from "react-router-dom"
import Moment from "moment"
import { Button } from "@material-ui/core"
import { SkipNext } from "@material-ui/icons"

import ImageBackground from "../../../components/background"
import Header from "../../../components/header"
import Footer from "../../../components/footer/Customer"

export default function PartnerSendCustomer() {
  const history = useHistory()
  const { item, profile } = history.location.state

  const handleNext = () => {
    history.push("/partner-confirm-price-form", { item, profile })
  }

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
          <div>จำนวนน้องๆ ที่ต้องการ: {item.partnerWantQty} คน</div>
          <div style={{ color: "blue" }}>ลูกค้า: {item.customerName}</div>
          <div>Level: {item.customerLevel}</div>
          <div style={{ color: "green" }}>สถานที่: {item.placeMeeting}</div>
          <div style={{ color: "red", border: "1px solid", padding: 10 }}>
            เวลาเริ่ม: {item.startTime}, เวลาเลิก: {item.stopTime}
          </div>
          <hr />
          <div style={{ color: "brown" }}>
            รายละเอียดเพิ่มเติม: {item.customerRemark}
          </div>
          <hr />
          <div>
            วันที่สร้างข้อมูล{" "}
            {Moment(item.sys_create_date).format("DD/MM/YYYY HH:mm:ss")}
          </div>
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: 5 }}
          startIcon={<SkipNext />}
          onClick={handleNext}
        >
          ถัดไป
        </Button>
      </div>
      <Footer profile={profile} />
    </ImageBackground>
  )
}
