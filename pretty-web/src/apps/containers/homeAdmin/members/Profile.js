import React from "react"
import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import styled from "styled-components"
import ImageList from "@material-ui/core/ImageList"
import ImageListItem from "@material-ui/core/ImageListItem"

import Moment from "moment"
import { Button } from "@material-ui/core"

import firebase from "../../../../util/firebase"
import { AppConfig } from "../../../../Constants"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: theme.palette.background.paper
  },
  imageList: {
    width: 500,
    height: 450
  }
}))

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url("assets/bg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`

export default function BasicImageList(props) {
  const history = useHistory()
  const { profile } = history.location.state
  const classes = useStyles()

  const approveMember = () => {
    firebase.database().ref(`${AppConfig.env}members/${profile.id}`).update({
      status: AppConfig.MemberStatus.active,
      statusText: AppConfig.MemberStatus.activeMessage,
      status_priority: AppConfig.MemberStatus.activePriority,
      member_register_date: new Date().toUTCString(),
      member_update_date: new Date().toUTCString(),
      sys_update_date: new Date().toUTCString()
    })

    history.push("/admin")
  }

  const suspendMember = () => {
    firebase.database().ref(`${AppConfig.env}members/${profile.id}`).update({
      status: AppConfig.MemberStatus.suspend,
      statusText: AppConfig.MemberStatus.suspendMessage,
      status_priority: AppConfig.MemberStatus.suspendPriority,
      member_update_date: new Date().toUTCString(),
      sys_update_date: new Date().toUTCString()
    })
  }

  return (
    <Container>
      <div style={{ margin: 10 }}>
        <h1>แสดงรายละเอียดสมาชิก</h1>
        <div style={{ borderRadius: 20, border: "1px solid", padding: 20 }}>
          <div>ชื่อ: {profile.name || profile.username}</div>
          <div>โหมดงาน: {profile.name}</div>
          <div>
            วันที่เป็นสมาชิก:{" "}
            {Moment(profile.sys_update_date).format("DD/MM/YYYY HH:mm:ss")}
          </div>
          <div>คะแนน: {profile.point || 0}</div>
          <div>เบอร์ติดต่อ: {profile.mobile}</div>
          <div>สถานะ: {profile.status}</div>
        </div>
      </div>
      <div style={{ margin: 10 }}>
        <ImageList rowHeight={450} cols={2}>
          {profile.imageUrl1 && (
            <ImageListItem cols={2}>
              <img
                src={profile.imageUrl1}
                style={{ height: "100%", width: "auto" }}
                alt={""}
              />
            </ImageListItem>
          )}
          {profile.imageUrl2 && (
            <ImageListItem cols={2}>
              <img
                src={profile.imageUrl2}
                style={{ height: "100%", width: "auto" }}
                alt={""}
              />
            </ImageListItem>
          )}
          {profile.imageUrl3 && (
            <ImageListItem cols={2}>
              <img
                src={profile.imageUrl3}
                style={{ height: "100%", width: "auto" }}
                alt={""}
              />
            </ImageListItem>
          )}
          {profile.imageUrl4 && (
            <ImageListItem cols={2}>
              <img
                src={profile.imageUrl4}
                style={{ height: "100%", width: "auto" }}
                alt={""}
              />
            </ImageListItem>
          )}
          {profile.imageUrl5 && (
            <ImageListItem cols={2}>
              <img
                src={profile.imageUrl5}
                style={{ height: "100%", width: "auto" }}
                alt={""}
              />
            </ImageListItem>
          )}
        </ImageList>
      </div>
      <div style={{ margin: 10 }}>
        {profile.status === AppConfig.MemberStatus.newRegister && (
          <Button
            variant="contained"
            color="primary"
            style={{ margin: 5, backgroundColor: "green", color: "white" }}
            onClick={approveMember}
          >
            อนุมัติข้อมูล
          </Button>
        )}
        <Button variant="contained" color="secondary" onClick={suspendMember}>
          ลบข้อมูลออกจากระบบ
        </Button>
      </div>
    </Container>
  )
}
