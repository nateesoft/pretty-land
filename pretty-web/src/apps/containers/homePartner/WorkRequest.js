import React from "react"

export default function WorkRequest(props) {
  return (
    <div align="center">
      <h3>งานที่เสนอทั้งหมด</h3>
      <div
        style={{
          border: "1px solid #bbb",
          padding: 10,
          margin: 10,
          backgroundColor: "#eee"
        }}
      >
        ไม่พบข้อมูลงานที่เสนอในระบบ
      </div>
    </div>
  )
}
