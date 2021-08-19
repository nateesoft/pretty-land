import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import InputAdornment from "@material-ui/core/InputAdornment"
import FormControl from "@material-ui/core/FormControl"
import SaveIcon from "@material-ui/icons/Save"
import { Person, LockOpen } from "@material-ui/icons"
import { Button } from "@material-ui/core"
import base64 from "base-64"
import { useHistory } from "react-router-dom"

import ImageBackground from "../../components/background"
import Header from "../../components/header"
import Footer from "../../components/footer/Admin"

import firebase from "../../../util/firebase"
import { AppConfig } from "../../../Constants"

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    width: "80%"
  }
}))

export default function ProfileSetting() {
  const classes = useStyles()
  const history = useHistory()
  const { member: profile } = history.location.state

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [reNewPassword, setReNewPassword] = useState("")

  const updatePassword = () => {
    if (!newPassword) {
      alert("กรุณาระบุข้อมูลรหัสใหม่")
      return
    }
    if (!reNewPassword) {
      alert("กรุณาระบุข้อมูยืนยันรหัสใหม่")
      return
    }
    if (newPassword !== reNewPassword) {
      alert("รหัสผ่านใหม่ และรหัสผ่านใหม่่ไม่ตรงกัน")
      return
    }
    if (oldPassword !== base64.decode(profile.password)) {
      alert("รหัสผ่านเดิมของท่านไม่ถูกต้อง")
      return
    }

    firebase
      .database()
      .ref(`${AppConfig.env}members/${profile.id}`)
      .update({
        password: base64.encode(newPassword)
      })
    alert("บันทึกข้อมูลเรียบร้อยแล้ว")
    setNewPassword("")
    setReNewPassword("")
  }

  return (
    <ImageBackground>
      <Header profile={profile} hideBack />
      <div align="center" style={{ marginTop: 55, border: "3px solid #eee" }}>
        <div
          style={{
            padding: 10,
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            textDecoration: "underline"
          }}
        >
          เปลี่ยนรหัสผ่าน
        </div>
        <FormControl style={{ margin: 10, alignContent: "center", width: 250 }}>
          <InputLabel htmlFor="input-with-icon-adornment">
            ชื่อผู้ใช้งาน
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            }
            value={profile.username}
            autoComplete="off"
          />
        </FormControl>
        <FormControl style={{ margin: 10, width: 250 }}>
          <InputLabel htmlFor="input-with-icon-adornment">
            ข้อมูลรหัสผ่านเดิมที่ใช้งาน
          </InputLabel>
          <Input
            type="password"
            startAdornment={
              <InputAdornment position="start">
                <LockOpen />
              </InputAdornment>
            }
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            autoComplete="off"
          />
        </FormControl>
        <FormControl style={{ margin: 10, width: 250 }}>
          <InputLabel htmlFor="input-with-icon-adornment">
            ข้อมูลรหัสผ่านใหม่
          </InputLabel>
          <Input
            type="password"
            startAdornment={
              <InputAdornment position="start">
                <LockOpen />
              </InputAdornment>
            }
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="off"
          />
        </FormControl>
        <FormControl style={{ margin: 10, width: 250 }}>
          <InputLabel htmlFor="input-with-icon-adornment">
            ข้อมูลยืนยันรหัสผ่านใหม่
          </InputLabel>
          <Input
            type="password"
            startAdornment={
              <InputAdornment position="start">
                <LockOpen />
              </InputAdornment>
            }
            value={reNewPassword}
            onChange={(e) => setReNewPassword(e.target.value)}
            autoComplete="off"
          />
        </FormControl>
        <div style={{ margin: 10 }}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={updatePassword}
          >
            บันทึกข้อมูล
          </Button>
        </div>
      </div>
      <Footer profile={profile} />
    </ImageBackground>
  )
}
