import React from "react"
import { useHistory } from "react-router-dom"
import { Button } from "@material-ui/core"
import Cookies from "js-cookie"

import ImageBackground from "../../components/background"
import Header from "../../components/header"
import Footer from "../../components/footer/Customer"

export default function ContactAdmin() {
  const history = useHistory()
  if (!Cookies.get("logged_in")) {
    window.location.href = ""
  }
  const { member } = history.location.state

  const LinkToLineContact = () => {
    window.location.href = "https://lin.ee/DgRh5Mw"
  }
  return (
    <ImageBackground>
      <Header profile={member} hideBack />
      <div
        align="center"
        style={{
          marginTop: 20,
          fontWeight: "bold",
          fontSize: 20
        }}
      >
        ข้อมูลสมาชิก
      </div>
      <div
        style={{
          margin: 10,
          border: "2px solid #eee",
          padding: 5,
          borderRadius: 15
        }}
      >
        <div>Id: {member.id}</div>
        <div style={{ color: "blue" }}>
          ชื่อ: {member.profile || member.username}
        </div>
        <div>Level: {member.customerLevel}</div>
        <div style={{ margin: 10 }}>
          <Button variant="contained" color="primary">
            ลงทะเบียนรับข้อมูล
          </Button>
        </div>
      </div>
      <div align="center" style={{ margin: 10, padding: 10 }}>
        <h3 style={{ color: "blue" }}>Line ติดต่อผู้ดูแลระบบ</h3>
        <div style={{ margin: 10 }}>
          <Button
            variant="contained"
            startIcon={
              <img alt="" src="/assets/icons/LINE_APP.png" width={24} />
            }
            style={{
              backgroundColor: "#35d00d",
              fontWeight: "bold",
              color: "white"
            }}
            onClick={LinkToLineContact}
          >
            LINE CONNECT
          </Button>
        </div>
      </div>
      <Footer profile={member} />
    </ImageBackground>
  )
}
