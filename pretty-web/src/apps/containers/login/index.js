import React, { useState } from "react"
import styled from "styled-components"
import { Button, Grid, TextField } from "@material-ui/core"
import { Lock } from "@material-ui/icons"
import { Link, useHistory } from "react-router-dom"
import * as ApiControl from "../../../apis"
import { AppConfig } from "../../../Constants"

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url("assets/bg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
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

export default function LoginForm(props) {
  const history = useHistory()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const onLogin = async () => {
    const { valid, member } = await ApiControl.loginApp(username, password)
    if (valid) {
      if (member.memberType === "admin" || member.memberType === "superadmin") {
        history.push("/admin", { member })
      } else if (member.memberType === "partner") {
        if (member.status === AppConfig.MemberStatus.active) {
          history.push("/partner", { member })
        } else {
          alert("รอการอนุมัติข้อมูลจาก admin")
        }
      } else if (member.memberType === "customer") {
        history.push("/customer", { member })
      }
    } else {
      alert("กรุณาระบุข้อมูลผู้ใช้งาน และรหัสผ่านให้ครบถ้วน !!!")
    }
  }
  return (
    <Container>
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
              value={username}
              onChange={(evt) => setUsername(evt.target.value)}
              style={{ width: "100%" }}
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
    </Container>
  )
}
