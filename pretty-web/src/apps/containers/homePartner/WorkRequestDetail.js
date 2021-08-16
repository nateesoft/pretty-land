import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import Moment from "moment"
import { useHistory } from "react-router-dom"

import ImageBackground from "../../components/background"
import Header from "../../components/header"
import Footer from "../../components/footer/Partner"

import { getMemberProfile } from "../../../apis"
import { AppConfig } from "../../../Constants"
import firebase from "../../../util/firebase"
import { snapshotToArray } from "../../../util"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    position: "relative",
    overflow: "auto",
    maxHeight: window.innerHeight - 120
  }
}))

export default function WorkRequestDetail(props) {
  const history = useHistory()
  const classes = useStyles()
  const { item, profile } = history.location.state
  const [partner, setPartner] = useState({})
  const [filterList, setFilterList] = useState([])
  const rate = 5 // default rate

  const saveHistoryStar = (partnerId) => {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`${AppConfig.env}/partner_star/${partnerId}/${item.id}`)
        .update({
          star: rate,
          sys_date: new Date().toUTCString()
        })
        .then((result) => {
          resolve("success")
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  const updateMember = (workIn = 0, workPoint = 0, partnerId) => {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`${AppConfig.env}/members/${partnerId}`)
        .update({
          workIn: parseInt(workIn) + 1,
          workPoint: parseInt(workPoint) + 10
        })
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  const partnerCloseJob = (partnerId) => {
    // update status post (for partner)
    firebase
      .database()
      .ref(`${AppConfig.env}/posts/${item.id}/partnerSelect/${partnerId}`)
      .update({
        selectStatus: AppConfig.PostsStatus.closeJob,
        selectStatusText: "ปิดงานเรียบร้อย",
        partnerStatus: AppConfig.PostsStatus.partnerCloseJob,
        partnerStatusText: "น้องๆแจ้งปิดงาน",
        partner_close_date: new Date().toUTCString(),
        sys_update_date: new Date().toUTCString()
      })

    if (item.partnerRequest === AppConfig.PartnerType.type4) {
      // update partner close job
      firebase.database().ref(`${AppConfig.env}/posts/${item.id}`).update({
        selectStatus: AppConfig.PostsStatus.closeJob,
        selectStatusText: "ปิดงานเรียบร้อย",
        sys_update_date: new Date().toUTCString()
      })
    }

    getMemberProfile(partnerId).then((pData) => {
      updateMember(pData.workIn, pData.workPoint, partnerId).then((result) => {
        saveHistoryStar(partnerId).then((result) => {
          // navigation.navigate('List-My-Work');
        })
      })
    })
  }

  const startWorking = () => {
    firebase.database().ref(`${AppConfig.env}/posts/${item.id}`).update({
      status: AppConfig.PostsStatus.startWork,
      statusText: "เริ่มปฏิบัติงาน",
      sys_update_date: new Date().toUTCString(),
      start_work_date: new Date().toUTCString()
    })

    // navigation.navigate('List-My-Work');
  }

  const partnerMassageCancel = (partnerId) => {
    firebase
      .database()
      .ref(`${AppConfig.env}/posts/${item.id}/partnerSelect/${partnerId}`)
      .update({
        partnerStatus: AppConfig.PostsStatus.partnerCancelWork,
        partnerStatusText: "น้องๆแจ้งไม่รับงาน",
        partnerStart: new Date().toUTCString(),
        sys_update_date: new Date().toUTCString(),
        start_work_date: new Date().toUTCString()
      })

    firebase.database().ref(`${AppConfig.env}/posts/${item.id}`).update({
      status: AppConfig.PostsStatus.postCancel,
      statusText: "น้องๆแจ้งไม่รับงาน",
      sys_update_date: new Date().toUTCString()
    })

    // navigation.navigate("List-My-Work")
  }

  const partnerMassageAccept = (partnerId) => {
    firebase
      .database()
      .ref(`${AppConfig.env}/posts/${item.id}/partnerSelect/${partnerId}`)
      .update({
        partnerStatus: AppConfig.PostsStatus.partnerAcceptWork,
        partnerStatusText: "น้องๆแจ้งรับงาน",
        partnerStart: new Date().toUTCString(),
        sys_update_date: new Date().toUTCString(),
        start_work_date: new Date().toUTCString()
      })

    firebase.database().ref(`${AppConfig.env}/posts/${item.id}`).update({
      status: AppConfig.PostsStatus.waitAdminApprovePost,
      statusText: "รอ Admin อนุมัติโพสท์",
      sys_update_date: new Date().toUTCString()
    })

    // navigation.navigate("List-My-Work")
  }

  useEffect(() => {
    const ref = firebase
      .database()
      .ref(`${AppConfig.env}/posts/${item.id}/partnerSelect/${profile.id}`)
    ref.once("value", (snapshot) => {
      const data = { ...snapshot.val() }
      setPartner(data)
    })
  }, [])

  const getListMyWork = (snapshot) => {
    return new Promise((resolve, reject) => {
      const posts = snapshotToArray(snapshot)
      let myWorkList = []
      posts.forEach((item) => {
        const data = item.partnerSelect
        for (let key in data) {
          const obj = data[key]
          const statusMatch =
            item.status === AppConfig.PostsStatus.waitPartnerConfrimWork ||
            item.status === AppConfig.PostsStatus.waitCustomerSelectPartner
          if (obj.partnerId === profile.id && statusMatch) {
            myWorkList.push(item)
          }
        }
      })
      setFilterList(myWorkList)
      resolve(true)
    })
  }

  useEffect(() => {
    const ref = firebase.database().ref(`${AppConfig.env}/posts`)
    const listener = ref.on("value", (snapshot) => {
      getListMyWork(snapshot).catch((err) => alert(err))
    })
    return () => ref.off("value", listener)
  }, [])

  return (
    <ImageBackground>
      <Header profile={profile} />
      <div align="center" style={{ marginTop: 55 }}>
        <div
          align="center"
          style={{
            backgroundColor: "#ff2fe6",
            padding: 10,
            fontSize: 22,
            fontWeight: "bold",
            color: "white"
          }}
        >
          รายละเอียดงานที่แจ้งลูกค้า
        </div>
        {filterList.length === 0 && (
          <div
            style={{
              border: "1px solid #bbb",
              padding: 10,
              margin: 10
            }}
          >
            ไม่พบข้อมูลงานที่เสนอในระบบ
          </div>
        )}
        <List className={classes.root}>
          {filterList &&
            filterList.map((item, index) => (
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <Avatar
                    src={item.partnerImage}
                    alt=""
                    variant="circular"
                    style={{ width: 64, height: 64 }}
                  />
                </ListItemAvatar>
                <div style={{ margin: 10, width: "100%" }}>
                  <div
                    style={{
                      backgroundColor: "#123456",
                      color: "white",
                      padding: 5
                    }}
                  >
                    ลูกค้า: {item.customerName}
                  </div>
                  <div>จังหวัด: {item.provinceName}</div>
                  <div>
                    วันที่แจ้ง:{" "}
                    {Moment(item.sys_create_date).format("D MMM YYYY")}
                  </div>
                  <div>Lv.ลูกค้า: {item.customerLevel}</div>
                  <div>เบอร์ติดต่อ: {item.customerPhone}</div>
                  <div style={{ backgroundColor: "chocolate", color: "white" }}>
                    โหมดงาน: {item.partnerRequest}
                  </div>
                  <div
                    style={{
                      padding: 20,
                      border: "1px solid",
                      borderRadius: 10,
                      marginTop: 10
                    }}
                  >
                    <div>ราคาที่เสนอ {partner.amount}</div>
                    <hr />
                  </div>
                </div>
              </ListItem>
            ))}
        </List>
      </div>
      <Footer profile={profile} />
    </ImageBackground>
  )
}
