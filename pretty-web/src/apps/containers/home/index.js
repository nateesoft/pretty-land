import React from "react"
import styled from "styled-components"
import { Button, Grid } from "@material-ui/core"
import ExitToApp from "@material-ui/icons/ExitToApp"
import Icon from "@material-ui/core/Icon"
import { Link } from "react-router-dom"

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
const ButtonAction = styled(Button)`
  border: 1px solid;
  margin: 2px;
  width: 230px;
  border-radius: 5px;
  height: 40px;
  font-weight: bold;
  font-size: 14px;
`

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
`

export default function Home() {
  const lineIcon = (
    <Icon>
      <img
        alt="line"
        src="/assets/icons/LINE_APP.png"
        style={{ width: 20, height: 20, marginTop: -18 }}
      />
    </Icon>
  )
  const facebookIcon = (
    <Icon>
      <img
        alt="line"
        src="/assets/icons/f_logo_RGB-Blue_58.png"
        style={{ width: 20, height: 20, marginTop: -22 }}
      />
    </Icon>
  )

  return (
    <Container>
      <Paper>
        <Image src="/assets/login.png" alt="" />
        <h4 style={{ fontStyle: "italic" }}>PRETTY LAND</h4>
        <h5 style={{ marginTop: -15 }}>Thailand</h5>
        <p style={{ marginTop: -15, color: "gray", fontSize: "12px" }}>
          ( Version 1.0 )
        </p>
        <Grid item>
          <div>
            <ButtonAction
              variant="contained"
              startIcon={lineIcon}
              style={{
                color: "white",
                backgroundColor: "#35d00d",
                justifyContent: "unset",
                fontWeight: "bold"
              }}
            >
              เข้าสู่ระบบด้วย LINE
            </ButtonAction>
          </div>
          <div>
            <ButtonAction
              variant="contained"
              size="medium"
              startIcon={facebookIcon}
              style={{
                color: "white",
                backgroundColor: "#0a69d6",
                marginTop: 5,
                justifyContent: "unset",
                textTransform: "none",
                fontWeight: "bold"
              }}
            >
              เข้าสู่ระบบด้วย facebook
            </ButtonAction>
          </div>
          <div
            style={{
              color: "gray",
              fontSize: "12px",
              marginTop: 10,
              marginBottom: 10
            }}
          >
            ------ OR ------
          </div>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <ButtonAction
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ExitToApp />}
              style={{
                backgroundColor: "#ff2fe6",
                color: "white",
                fontWeight: "bold"
              }}
            >
              LOGIN
            </ButtonAction>
          </Link>
          <div style={{ marginTop: 5 }}>
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
