import React, { useState } from "react"
import styled from "styled-components"
import { Button, Grid } from "@material-ui/core"
import ExitToApp from "@material-ui/icons/ExitToApp"
import Icon from "@material-ui/core/Icon"
import { Phone } from "@material-ui/icons"
import { Link, useHistory } from "react-router-dom"
import base64 from "base-64"
import uuid from "react-uuid"
import TextField from "@material-ui/core/TextField"
import Cookies from "js-cookie"

import { lineConfig } from "../../../util/appConfig"
import firebase from "../../../util/firebase"
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
  const history = useHistory()
  const [showFacebookLine] = useState(true)
  const [phone, setPhone] = useState(Cookies.get("user_phone") || "")

  const loginPassFacebook = () => {
    console.log("loginPassFacebook")
    const provider = new firebase.auth.FacebookAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const credential = result.credential
        const user = result.user
        const accessToken = credential.accessToken
        console.log("facebook_login_success:", user, accessToken)
        const memberData = {
          id: user.uid,
          profile: user.displayName || "",
          name: user.displayName || "",
          customerType: "facebook",
          memberType: "customer",
          status: "active",
          email: user.email || "",
          username: user.email || user.uid,
          password: base64.encode("00000000"),
          loginDate: new Date().toUTCString(),
          photoURL: user.photoURL || "",
          phoneNumber: user.phoneNumber || "",
          mobile: user.phoneNumber || "",
          customerLevel: 0,
          sys_create_date: new Date().toUTCString(),
          sys_update_date: new Date().toUTCString()
        }
        firebase
          .database()
          .ref(`${AppConfig.env}/members/${user.uid}`)
          .update(memberData)
        // login by facebook'
        history.push("/customer", { member: memberData })
      })
      .catch((err) => {
        console.log("facebook_error:", err)
        alert("Connecting facebook error !!!" + err.message)
      })
  }

  const loginPassLineChannel = () => {
    const state = uuid()
    const redirect_uri = "https://pretty-land.web.app/line-login"
    const query = `response_type=code&client_id=${lineConfig.client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=${lineConfig.scope}`
    const linkUri = `https://access.line.me/oauth2/v2.1/authorize?${query}`
    window.location.href = linkUri
  }

  const loginByPhone = () => {
    if (!phone && !Cookies.get("user_phone")) {
      alert("กรุณาระบุเบอร์โทรศัพท์ !")
      return
    }
    const memberData = {
      id: phone,
      profile: phone,
      name: phone,
      customerType: "phone",
      memberType: "customer",
      status: "active",
      email: "",
      username: phone,
      password: base64.encode(phone),
      mobile: phone,
      customerLevel: 0,
      sys_create_date: new Date().toUTCString(),
      sys_update_date: new Date().toUTCString()
    }
    firebase
      .database()
      .ref(`${AppConfig.env}/members/${phone}`)
      .update(memberData)
    history.push("/customer", { member: memberData })
  }

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
          {showFacebookLine && (
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
                onClick={loginPassLineChannel}
              >
                เข้าสู่ระบบด้วย LINE
              </ButtonAction>
            </div>
          )}
          {showFacebookLine && (
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
                onClick={loginPassFacebook}
              >
                เข้าสู่ระบบด้วย facebook
              </ButtonAction>
            </div>
          )}
          {!showFacebookLine && (
            <div>
              <div>
                <TextField
                  id="outlined-basic"
                  label="เบอร์โทรศัพท์"
                  variant="outlined"
                  value={phone}
                  style={{ width: 230 }}
                  onChange={(e) => setPhone(phone)}
                />
              </div>
              <div>
                <ButtonAction
                  variant="contained"
                  size="medium"
                  startIcon={<Phone />}
                  style={{
                    color: "white",
                    backgroundColor: "darkblue",
                    marginTop: 5,
                    justifyContent: "unset",
                    textTransform: "none",
                    fontWeight: "bold",
                    border: "1px solid orange"
                  }}
                  onClick={loginByPhone}
                >
                  เข้าสู่ระบบด้วยเบอร์มือถือ
                </ButtonAction>
              </div>
            </div>
          )}
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
