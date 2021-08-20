import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { useHistory } from "react-router-dom"
import ImageList from "@material-ui/core/ImageList"
import ImageListItem from "@material-ui/core/ImageListItem"
import ImageListItemBar from "@material-ui/core/ImageListItemBar"
import IconButton from "@material-ui/core/IconButton"
import InfoIcon from "@material-ui/icons/PhotoSizeSelectActual"
import Moment from "moment"
import { Button } from "@material-ui/core"
import ReactPlayer from "react-player"
import Cookies from "js-cookie"
import Swal from 'sweetalert2'

import ImageBackground from "../../../components/background"
import Header from "../../../components/header"
import Footer from "../../../components/footer/Admin"

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

export default function BasicImageList(props) {
  const classes = useStyles()
  const history = useHistory()
  if (!Cookies.get("logged_in")) {
    window.location.href = ""
  }
  const { adminProfile, memberProfile, mode } = history.location.state
  const [images, setImages] = useState([])

  useEffect(() => {
    const list = []
    list.push({
      id: 1,
      url: memberProfile.imageUrl1,
      title: "รูปที่ 1"
    })
    list.push({
      id: 2,
      url: memberProfile.imageUrl2,
      title: "รูปที่ 2"
    })
    list.push({
      id: 3,
      url: memberProfile.imageUrl3,
      title: "รูปที่ 3"
    })
    list.push({
      id: 4,
      url: memberProfile.imageUrl4,
      title: "รูปที่ 4"
    })
    list.push({
      id: 5,
      url: memberProfile.imageUrl5,
      title: "รูปที่ 5"
    })
    setImages(list)
  }, [memberProfile])

  const approveMember = () => {
    if (window.confirm("ยืนยันการอนุมัติข้อมูล")) {
      firebase
        .database()
        .ref(`${AppConfig.env}/members/${memberProfile.id}`)
        .update({
          status: AppConfig.MemberStatus.active,
          statusText: AppConfig.MemberStatus.activeMessage,
          status_priority: AppConfig.MemberStatus.activePriority,
          member_register_date: new Date().toUTCString(),
          member_update_date: new Date().toUTCString(),
          sys_update_date: new Date().toUTCString(),
          admin_action: adminProfile.username || adminProfile.id,
          action_date: new Date().toUTCString()
        })
      Swal.fire(
        "ข้อมูลอัพเดตแล้ว",
        "บันทึกข้อมูลเรียบร้อยแล้ว",
        "success"
      )
      history.goBack()
    }
  }

  const handleRemovePermanent = () => {
    if (
      window.confirm(
        "กรุณายืนยันอีกครั้ง ถ้ากดลบข้อมูลจะไม่สามารถเรียกคืนได้อีก !!!"
      )
    ) {
      firebase
        .database()
        .ref(`${AppConfig.env}/members/${memberProfile.id}`)
        .remove()
      history.push("/admin", { member: adminProfile })
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

  const backPage = () => {
    history.push("/admin", { member: adminProfile })
  }

  const suspendMember = () => {
    firebase
      .database()
      .ref(`${AppConfig.env}/members/${memberProfile.id}`)
      .update({
        status: AppConfig.MemberStatus.suspend,
        statusText: AppConfig.MemberStatus.suspendMessage,
        status_priority: AppConfig.MemberStatus.suspendPriority,
        member_update_date: new Date().toUTCString(),
        sys_update_date: new Date().toUTCString(),
        admin_action: adminProfile.username || adminProfile.id,
        action_date: new Date().toUTCString()
      })
    history.goBack()
  }

  const cancelSuspendMember = () => {
    firebase
      .database()
      .ref(`${AppConfig.env}/members/${memberProfile.id}`)
      .update({
        status: AppConfig.MemberStatus.active,
        statusText: AppConfig.MemberStatus.activeMessage,
        status_priority: AppConfig.MemberStatus.activePriority,
        member_register_date: new Date().toUTCString(),
        member_update_date: new Date().toUTCString(),
        sys_update_date: new Date().toUTCString(),
        admin_action: adminProfile.username || adminProfile.id,
        action_date: new Date().toUTCString()
      })
    history.goBack()
  }

  return (
    <ImageBackground>
      <Header profile={adminProfile} />
      <div style={{ height: 500, overflow: "auto" }}>
        <div style={{ marginTop: 55 }}>
          <div
            style={{
              padding: 10,
              backgroundColor: "#ff32ee",
              fontWeight: "bold",
              verticalAlign: "center",
              textAlign: "center",
              color: "white",
              fontSize: 20
            }}
          >
            แสดงรายละเอียดสมาชิก
          </div>
          <div
            style={{
              borderRadius: 20,
              border: "1px solid",
              padding: 20,
              margin: 5
            }}
          >
            <div style={{ color: "blue" }}>
              ชื่อ: {memberProfile.name || memberProfile.username}
            </div>
            <div>โหมดงาน: {mode}</div>
            <div>
              วันที่เป็นสมาชิก:{" "}
              {Moment(memberProfile.sys_update_date).format(
                "DD/MM/YYYY HH:mm:ss"
              )}
            </div>
            <div>
              เพศ:{" "}
              {memberProfile.gender === "female"
                ? "หญิง"
                : memberProfile.gender === "male"
                ? "ชาย"
                : "อื่น ๆ"}
            </div>
            <div>
              อายุ: {memberProfile.age} | สูง: {memberProfile.height} | น้ำหนัก:{" "}
              {memberProfile.weight}
            </div>
            <div>สถานะ: {memberProfile.statusText}</div>
            <div>คะแนน: {memberProfile.point || 0}</div>
            <hr />
            <div>จังหวัด: {getProvinceNameShow(memberProfile)}</div>
            <hr />
            <div>ธนาคาร: {getBankNameShow(memberProfile)}</div>
            <div>เลขที่บัญชี: {memberProfile.bankNo}</div>
            <hr />
            <div>Line ID: {memberProfile.lineId}</div>
            <div>เบอร์ติดต่อ: {memberProfile.mobile}</div>
            {memberProfile.type4 && <div>ที่อยู่: {memberProfile.address}</div>}
            {memberProfile.type4 && <div>ราคา: {memberProfile.price4}</div>}
          </div>
        </div>
        <div style={{ margin: 10 }}>
          <ImageList rowHeight={450} cols={2}>
            {images &&
              images.map((item, index) => (
                <ImageListItem
                  cols={2}
                  key={item.id}
                  style={{ textAlign: "center" }}
                >
                  <img
                    src={item.url}
                    style={{ height: "100%", width: "auto" }}
                    alt={""}
                  />
                  <ImageListItemBar
                    title={item.title}
                    subtitle={
                      <span>
                        น้อง: {memberProfile.name} | {memberProfile.charactor} |{" "}
                        {getProvinceNameShow(memberProfile)}
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
          {memberProfile.imageUrl6 && (
            <div align="center" style={{ margin: 10 }}>
              <ReactPlayer url={memberProfile.imageUrl6} width={300} controls />
            </div>
          )}
        </div>
      </div>
      <div align="center" style={{ margin: 10 }}>
        {memberProfile.status === AppConfig.MemberStatus.newRegister && (
          <Button
            variant="contained"
            color="primary"
            style={{ margin: 5, backgroundColor: "green", color: "white" }}
            onClick={approveMember}
          >
            อนุมัติข้อมูล
          </Button>
        )}
        {memberProfile.status &&
          memberProfile.status !== AppConfig.MemberStatus.newRegister &&
          memberProfile.status !== AppConfig.MemberStatus.suspend && (
            <Button
              variant="contained"
              color="secondary"
              style={{ margin: 5 }}
              onClick={suspendMember}
            >
              สั่งพักงาน
            </Button>
          )}
        {memberProfile.status === AppConfig.MemberStatus.suspend && (
          <Button
            variant="contained"
            color="secondary"
            style={{ margin: 5 }}
            onClick={cancelSuspendMember}
          >
            ยกเลิกสั่งพักงาน
          </Button>
        )}
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: 5 }}
          onClick={handleRemovePermanent}
        >
          ลบข้อมูลออกจากระบบ
        </Button>
      </div>
      <Footer profile={adminProfile} />
    </ImageBackground>
  )
}
