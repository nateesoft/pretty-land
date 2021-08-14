import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import ImageList from "@material-ui/core/ImageList"
import ImageListItem from "@material-ui/core/ImageListItem"
import ImageListItemBar from "@material-ui/core/ImageListItemBar"
import IconButton from "@material-ui/core/IconButton"
import InfoIcon from "@material-ui/icons/PhotoSizeSelectActual"
import ArrowBack from "@material-ui/icons/ArrowBack"
import Moment from "moment"
import { Button } from "@material-ui/core"
import ReactPlayer from "react-player"
import { Link } from "react-router-dom"

import { getProvinceName, getBankName } from "../../../../data/apis"
import firebase from "../../../../util/firebase"
import { AppConfig } from "../../../../Constants"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  imageList: {
    width: 500,
    height: 450
  },
  icon: {
    color: "pink"
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
  const classes = useStyles()
  const history = useHistory()
  const { profile, mode } = history.location.state
  const [images, setImages] = useState([])

  useEffect(() => {
    const list = []
    list.push({
      id: 1,
      url: profile.imageUrl1,
      title: "รูปที่ 1"
    })
    list.push({
      id: 2,
      url: profile.imageUrl2,
      title: "รูปที่ 2"
    })
    list.push({
      id: 3,
      url: profile.imageUrl3,
      title: "รูปที่ 3"
    })
    list.push({
      id: 4,
      url: profile.imageUrl4,
      title: "รูปที่ 4"
    })
    list.push({
      id: 5,
      url: profile.imageUrl5,
      title: "รูปที่ 5"
    })
    setImages(list)
  }, [profile])

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

  const getProvinceNameShow = (p) => {
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
      <div
        style={{
          padding: 10,
          backgroundColor: "#ff32ee",
          fontWeight: "bold",
          verticalAlign: "center"
        }}
      >
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <Button variant="contained" startIcon={<ArrowBack />}>
            ย้อนกลับ
          </Button>
        </Link>
      </div>
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
          <div>จังหวัด: {getProvinceNameShow(profile)}</div>
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
          {images &&
            images.map((item, index) => (
              <ImageListItem cols={2} key={item.id}>
                <img
                  src={item.url}
                  style={{ height: "100%", width: "auto" }}
                  alt={""}
                />
                <ImageListItemBar
                  title={item.title}
                  subtitle={
                    <span>
                      น้อง: {profile.name} | {profile.charactor} |{" "}
                      {getProvinceNameShow(profile)}
                    </span>
                  }
                  actionIcon={
                    <IconButton
                      aria-label={`info about ${item.title}`}
                      className={classes.icon}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
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
