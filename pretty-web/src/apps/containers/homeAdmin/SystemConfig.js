import React from "react"
import Button from "@material-ui/core/Button"
import { Receipt, Send } from "@material-ui/icons"

export default function SystemConfig() {
  return (
    <div align="center" style={{ margin: 10, border: "3px solid #eee" }}>
      <div
        style={{
          padding: 10,
          fontSize: 16,
          fontWeight: "bold",
          textAlign: "center",
          textDecoration: "underline"
        }}
      >
        ตั้งค่าระบบ / รายงาน
      </div>
      <div style={{ margin: 10 }}>
        <div style={{ margin: 5 }}>
          <Button variant="contained" color="primary" startIcon={<Receipt />}>
            รายงานการสมัครสมาชิก
          </Button>
        </div>
        <div style={{ margin: 5 }}>
          <Button variant="contained" color="primary" startIcon={<Receipt />}>
            รายงานการสมัครหางาน
          </Button>
        </div>
        <div style={{ margin: 5 }}>
          <Button variant="contained" color="primary" startIcon={<Send />}>
            ส่งข้อมูล Broadcast
          </Button>
        </div>
      </div>
    </div>
  )
}
