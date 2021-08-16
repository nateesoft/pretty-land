import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import Moment from "moment"
import { useHistory } from "react-router-dom"

import ImageBackground from "../../components/background"
import Header from "../../components/header"
import Footer from "../../components/footer/Admin"

import { AppConfig } from "../../../Constants"
import { getConfigList } from "../../../apis"
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

export default function Members() {
  const classes = useStyles()
  const history = useHistory()
  const { member: adminProfile } = history.location.state
  const [members, setMembers] = useState([])
  const [items, setItems] = useState([])

  const loadMemberDetail = (profile) => {
    history.push("/member-profile", {
      adminProfile,
      memberProfile: profile,
      mode: getPartnerTypeFromFirebase(profile)
    })
  }

  const getPartnerTypeFromFirebase = (ms) => {
    if (ms.memberType === "partner") {
      const listType = []
      if (items[0] && ms.type1) {
        listType.push(items[0].name)
      }
      if (items[1] && ms.type2) {
        listType.push(items[1].name)
      }
      if (items[2] && ms.type3) {
        listType.push(items[2].name)
      }
      if (items[3] && ms.type4) {
        listType.push(items[3].name)
      }
      return listType.toString()
    }
    return ms.memberType
  }

  useEffect(() => {
    const ref = firebase.database().ref(`${AppConfig.env}/members`)
    const listener = ref.on("value", (snapshot) => {
      const memberInCloud = snapshotToArray(snapshot)
      let newMemberList = memberInCloud.filter(
        (item, index) => item.memberType === "partner"
      )
      let waitApprove = memberInCloud.filter(
        (item, index) =>
          item.status === AppConfig.MemberStatus.newRegister &&
          item.memberType === "partner"
      )
      waitApprove = waitApprove.sort((a, b) => {
        return Moment(b.sys_update_date) - Moment(a.sys_update_date)
      })
      let readyApprove = memberInCloud.filter(
        (item, index) =>
          item.status === AppConfig.MemberStatus.active &&
          item.memberType === "partner"
      )
      readyApprove = readyApprove.sort((a, b) => {
        return Moment(b.sys_update_date) - Moment(a.sys_update_date)
      })
      newMemberList = waitApprove.concat(readyApprove)
      setMembers(newMemberList)

      getConfigList()
        .then((res) => {
          setItems(res)
        })
        .catch((err) => alert(err))
    })

    return () => ref.off("value", listener)
  }, [])

  return (
    <ImageBackground>
      <Header profile={adminProfile} hideBack />
      <List className={classes.root} style={{ marginTop: 55 }}>
        {members.length === 0 && (
          <div align="center">ไม่พบข้อมูลสมาชิกในระบบ</div>
        )}
        {members &&
          members.map((item, index) => (
            <ListItem key={item.id} onClick={() => loadMemberDetail(item)}>
              <ListItemAvatar>
                <Avatar
                  src={item.image}
                  alt=""
                  variant="circular"
                  style={{ width: 64, height: 64 }}
                />
              </ListItemAvatar>
              <div
                style={{
                  padding: 10,
                  width: "100%",
                  borderRadius: 10,
                  marginLeft: 5
                }}
              >
                <div style={{ color: "blue" }}>ชื่อ: {item.username}</div>
                <div
                  style={{
                    border: "1px solid #eee",
                    borderRadius: 10,
                    padding: 10
                  }}
                >
                  <div>งานที่สมัคร: {getPartnerTypeFromFirebase(item)}</div>
                  <div>
                    วันที่:{" "}
                    {Moment(item.sys_create_date).format("DD/MM/YYYY HH:mm:ss")}
                  </div>
                  {item.status === AppConfig.MemberStatus.newRegister && (
                    <div
                      style={{
                        backgroundColor: "#b61e98",
                        color: "white",
                        padding: 3,
                        borderRadius: 5
                      }}
                    >
                      สถานะ: {item.statusText}
                    </div>
                  )}
                </div>
                {item.status !== AppConfig.MemberStatus.newRegister && (
                  <div
                    style={{
                      padding: 5,
                      borderRadius: 10,
                      fontWeight: "bold"
                    }}
                  >
                    สถานะ: {item.statusText}
                  </div>
                )}
              </div>
            </ListItem>
          ))}
      </List>
      <Footer profile={adminProfile} />
    </ImageBackground>
  )
}
