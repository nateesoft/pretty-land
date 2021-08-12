import React, { useState } from "react"
import styled from "styled-components"
import { Button, Grid, TextField } from "@material-ui/core"
import { Save } from "@material-ui/icons"
import { useHistory } from "react-router-dom"
import * as ApiControl from "../../../apis"

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url("assets/bg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-attachment: fixed;
`
const Paper = styled.div`
  margin: 0;
  position: absolute;
  top: 35vh;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
`
const Image = styled.img`
  width: 100px;
  height: 100px;
`
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
    <Container>
      <div style={{ margin: 10 }}>
        <Paper>
          <Image src="/assets/login.png" alt="" />
          <h4 style={{ fontStyle: "italic" }}>PRETTY LAND</h4>
          <h5 style={{ marginTop: -15 }}>Thailand</h5>
          <p style={{ marginTop: -15, color: "gray", fontSize: "12px" }}>
            ( Version 1.0 )
          </p>
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
        </Paper>
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
    </Container>
  )
}
