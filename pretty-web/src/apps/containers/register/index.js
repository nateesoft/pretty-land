import React, { useState } from "react"
import styled from "styled-components"
import { Button, Grid, TextField } from "@material-ui/core"
import { Save } from "@material-ui/icons"
import { useHistory } from "react-router-dom"

import Header from "../../components/header"
import ImageBackground from "../../components/background"

import * as ApiControl from "../../../apis"

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
`

export default function RegisterHome() {
  const history = useHistory()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")

  const handleNext = async () => {
    const existsUser = await ApiControl.validUserExist(username)
    if (!existsUser) {
      if (!username) {
        alert("กรุณาระบุชื่อเข้าใช้งาน")
        return
      }
      if (password.length <= 0) {
        alert("กรุณาระบุรหัสผ่าน เพื่อเข้าใช้งาน")
        return
      }
      if (password.length < 8) {
        alert("จำนวนรหัสผ่านต้องไม่น้อยกว่า 8 หลัก")
        return
      }
      if (!rePassword) {
        alert("กรุณายืนยันรหัสผ่าน")
        return
      }
      if (password !== rePassword) {
        alert("รหัสผ่าน และรหัสยืนยันจะต้องตรงกัน !!!")
        return
      }
      history.push("/registerDetail1", {
        username,
        password
      })
    } else {
      alert(`ข้อมูลผู้ใช้งาน: ${username} มีอยู่แล้ว`)
    }
  }

  return (
    <ImageBackground>
      <Header />
      <div style={{ marginTop: 55 }}>
        <div align="center">
          <img
            src="/assets/login.png"
            alt=""
            style={{ width: 100, height: 100, marginTop: 15 }}
          />
          <div style={{ margin: 5 }}>
            <div
              style={{
                fontStyle: "italic",
                fontWeight: "bold",
                color: "purple"
              }}
            >
              ลงทะเบียนเข้าใช้งานระบบ
            </div>
          </div>
          <Grid item style={{ padding: 20 }}>
            <div style={{ textAlign: "left" }}>
              <TextField
                required
                label="ข้อมูลผู้ใช้งาน (Username)"
                variant="outlined"
                style={{ width: "100%" }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div style={{ textAlign: "left", marginTop: 10 }}>
              <TextField
                required
                type="password"
                label="ยืนยันข้อมูลรหัสผ่าน (Re-Password)"
                variant="outlined"
                style={{ width: "100%" }}
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
              />
            </div>
            <div style={{ marginTop: 10 }}>
              <Button
                variant="contained"
                startIcon={<Save />}
                style={{ backgroundColor: "#ff32ee", color: "white" }}
                onClick={handleNext}
              >
                ลงทะเบียน
              </Button>
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
      </div>
    </ImageBackground>
  )
}
