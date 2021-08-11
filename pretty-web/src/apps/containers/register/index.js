import React from "react"
import styled from "styled-components"
import { Button, Grid, TextField } from "@material-ui/core"
import { Link } from "react-router-dom"
import { Save } from "@material-ui/icons"

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url("assets/bg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-attachment: fixed;
  padding: 20px;
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

export default function Home() {
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
            />
          </div>
          <div style={{ textAlign: "left", marginTop: 10 }}>
            <TextField
              required
              type="password"
              label="ยืนยันข้อมูลรหัสผ่าน (Re-Password)"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginTop: 10 }}>
            <Link to="/registerDetail1">
              <Button
                variant="contained"
                startIcon={<Save />}
                style={{ backgroundColor: "#ff32ee", color: "white" }}
              >
                ลงทะเบียน
              </Button>
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
