import React from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import ImageList from "@material-ui/core/ImageList"
import ImageListItem from "@material-ui/core/ImageListItem"
import Moment from "moment"
import { Button } from "@material-ui/core"
import ReactPlayer from "react-player"

import { getProvinceName, getBankName } from "../../../../data/apis"
import firebase from "../../../../util/firebase"
import { AppConfig } from "../../../../Constants"

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
  const { profile, mode } = history.location.state

  const approveMember = () => {
    if (window.confirm("ยืนยันการอนุมัติข้อมูล")) {
      firebase.database().ref(`${AppConfig.env}/members/${profile.id}`).update({
        status: AppConfig.MemberStatus.active,
        statusText: AppConfig.MemberStatus.activeMessage,
        status_priority: AppConfig.MemberStatus.activePriority,
        member_register_date: new Date().toUTCString(),
        member_update_date: new Date().toUTCString(),
        sys_update_date: new Date().toUTCString()
      })
      alert("อัพเดตข้อมูลเรียบร้อยแล้ว")
      history.push("/admin")
    }
  }

  const suspendMember = () => {
    if (window.confirm("คุณต้องการลบข้อมูลผู้ใช้งานนี้ใช่หรือไม่ ?")) {
      firebase.database().ref(`${AppConfig.env}/members/${profile.id}`).remove()
      history.push("/admin")
    }
  }

  const getProfileNameShow = (p) => {
    if (p.province) {
      return getProvinceName(p.province)[0]
    }
    return ""
  }
  const getBankNameShow = (p) => {
    if (p.bank) {
      return getBankName(p.bank)[0].label
    }
    return ""
  }

  return (
    <Container>
      <div style={{ margin: 10 }}>
        <h3 style={{ textAlign: "center" }}>แสดงรายละเอียดสมาชิก</h3>
        <div style={{ borderRadius: 20, border: "1px solid", padding: 20 }}>
          <div>ชื่อ: {profile.name || profile.username}</div>
          <div>
            เพศ:{" "}
            {profile.gender === "female"
              ? "หญิง"
              : profile.gender === "male"
              ? "ชาย"
              : "อื่น ๆ"}
          </div>
          <div>โหมดงาน: {mode}</div>
          <div>
            วันที่เป็นสมาชิก:{" "}
            {Moment(profile.sys_update_date).format("DD/MM/YYYY HH:mm:ss")}
          </div>
          <div>คะแนน: {profile.point || 0}</div>
          <div>เบอร์ติดต่อ: {profile.mobile}</div>
          <div>สถานะ: {profile.statusText}</div>
          <hr />
          <div>จังหวัด: {getProfileNameShow(profile)}</div>
          <hr />
          <div>ธนาคาร: {getBankNameShow(profile)}</div>
          <div>เลขที่บัญชี: {profile.bankNo}</div>
          <hr />
          <div>Line: {profile.lineId}</div>
          {profile.type4 && <div>ที่อยู่: {profile.address}</div>}
          {profile.type4 && <div>ราคา: {profile.price4}</div>}
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
        {profile.imageUrl6 && (
          <div align="center" style={{ margin: 10 }}>
            <ReactPlayer url={profile.imageUrl6} width={300} controls />
          </div>
        )}
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
