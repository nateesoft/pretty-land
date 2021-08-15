import React from "react"
import { useHistory } from "react-router"
import Moment from "moment"
import { Button } from "@material-ui/core"
import { SkipNext } from "@material-ui/icons"

export default function PostDetail() {
  const history = useHistory()
  const { item, profile } = history.location.state

  const handleNext = () => {
    history.push("/partner-confirm-price-form", { item, profile })
  }

  return (
    <div style={{ margin: 20 }}>
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
      </div>
      <hr />
      <div style={{ margin: 5, padding: 5 }}>
        <div>จำนวนน้องๆ ที่ต้องการ: {item.partnerWantQty} คน</div>
        <div style={{ color: "blue" }}>ลูกค้า: {item.customerName}</div>
        <div>Level: {item.customerLevel}</div>
        <div style={{ color: "green" }}>สถานที่: {item.placeMeeting}</div>
        <div style={{ color: "red", border: "1px solid", padding: 10 }}>
          เวลาเริ่ม: {item.startTime}, เวลาเลิก: {item.stopTiem}
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
  )
}
