import React, { useState } from "react"
import styled from "styled-components"
import { Button, Grid, TextField } from "@material-ui/core"
import { Lock } from "@material-ui/icons"
import { Link, useHistory } from "react-router-dom"
import Cookies from "js-cookie"

import Header from "../../components/header"
import ImageBackground from "../../components/background"

import * as ApiControl from "../../../apis"
import { AppConfig } from "../../../Constants"

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
`

export default function LoginForm(props) {
  const history = useHistory()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const onLogin = async () => {
    const { valid, member } = await ApiControl.loginApp(username, password)
    if (valid) {
      if (member.memberType === "admin" || member.memberType === "superadmin") {
        Cookies.set("logged_in", "admin")
        history.replace("/admin", { member })
      } else if (member.memberType === "partner") {
        if (member.status === AppConfig.MemberStatus.active) {
          Cookies.set("logged_in", "partner")
          history.replace("/partner", { member })
        } else {
          alert("รอการอนุมัติข้อมูลจาก admin")
        }
      } else if (member.memberType === "customer") {
        Cookies.set("logged_in", "customer")
        history.replace("/customer", { member })
      } else {
        alert('ไม่พบสิทธ์เข้าใช้งานระบบ')
      }
    } else {
      alert("กรุณาระบุข้อมูลผู้ใช้งาน และรหัสผ่านให้ครบถ้วน !!!")
    }
  }

  return (
    <ImageBackground>
      <Header />
      <div align="center" style={{ marginTop: 55 }}>
        <img
          src="/assets/login.png"
          alt=""
          style={{ width: 100, height: 100, marginTop: 35 }}
        />
        <div style={{ margin: 5 }}>
          <div
            style={{ fontStyle: "italic", fontWeight: "bold", color: "purple" }}
          >
            PRETTY LAND
          </div>
          <div style={{ fontSize: 16, fontWeight: "bold" }}>Thailand</div>
          <div style={{ color: "gray", fontSize: "12px" }}>( Version 1.0 )</div>
        </div>
        <Grid item style={{ padding: 20 }}>
          <div style={{ textAlign: "left" }}>
            <TextField
              required
              label="ข้อมูลผู้ใช้งาน (Username)"
              variant="outlined"
              value={username}
              onChange={(evt) => setUsername(evt.target.value)}
              style={{ width: "100%" }}
              autoComplete="off"
            />
          </div>
          <div style={{ textAlign: "left", marginTop: 10 }}>
            <TextField
              required
              type="password"
              label="ข้อมูลรหัสผ่าน (Password)"
              variant="outlined"
              style={{ width: "100%" }}
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
              autoComplete="off"
            />
          </div>
          <div style={{ marginTop: 10 }}>
            <Button
              variant="contained"
              startIcon={<Lock />}
              style={{ backgroundColor: "#ff32ee", color: "white" }}
              onClick={onLogin}
            >
              LOGIN
            </Button>
          </div>
          <div style={{ marginTop: 10 }}>
            <Link
              to="/register"
              style={{
                fontSize: 12,
                textDecoration: "underline",
                marginTop: 10
              }}
            >
              ลงทะเบียน (Register)
            </Link>
          </div>
        </Grid>
      </div>
      <Footer>
        <div style={{ fontSize: "11px", color: "red" }}>Contact US</div>
        <div style={{ fontSize: "11px", marginTop: 10, padding: 10 }}>
          Tel : 09-7874-7874 (24Hr) / Line : @Prettylandthailand / Fb:
          PrettyLand - Thailand / Email : Prettylandthailand@gmail.com
        </div>
        <div style={{ fontSize: "11px", color: "green", marginBottom: 20 }}>
          คุณเห็นด้วยกับเงื่อนไขการให้บริการ และ นโยบายความเป็นส่วนตัว
        </div>
      </Footer>
    </ImageBackground>
  )
}
