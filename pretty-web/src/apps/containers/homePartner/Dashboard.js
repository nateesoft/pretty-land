import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useHistory } from "react-router-dom"
import { Grid } from "@material-ui/core"
import Cookies from "js-cookie"
import { NotificationManager } from "react-notifications"

import ImageBackground from "../../components/background"
import Footer from "../../components/footer/Partner"
import Header from "../../components/header"

import { AppConfig } from "../../../Constants"
import firebase from "../../../util/firebase"
import { snapshotToArray } from "../../../util"
import {
  getConfigList,
  getPartnerDashboardType1,
  getPartnerDashboardType2,
  getPartnerDashboardType3,
  getPartnerDashboardType4
} from "../../../apis"

export default function Dashboard() {
  const [items, setItems] = useState([])
  const history = useHistory()
  if (!Cookies.get("logged_in")) {
    window.location.href = ""
  }
  const { member } = history.location.state

  const [taskList, setTaskList] = useState([])

  const [sumType1, setSumType1] = useState("0")
  const [sumType2, setSumType2] = useState("0")
  const [sumType3, setSumType3] = useState("0")
  const [sumType4, setSumType4] = useState("0")

  const [postType1Count, setPostType1Count] = useState(null)
  const [postType2Count, setPostType2Count] = useState(null)
  const [postType3Count, setPostType3Count] = useState(null)
  const [postType4Count, setPostType4Count] = useState(null)

  const getComputeGroup = (snapshot) => {
    return new Promise((resolve, reject) => {
      const listTrue = []
      const arr = snapshotToArray(snapshot)
      let type1 = 0,
        type2 = 0,
        type3 = 0,
        type4 = 0

      arr.forEach((item) => {
        const statusMatch =
          item.status === AppConfig.PostsStatus.adminConfirmNewPost ||
          item.status === AppConfig.PostsStatus.waitCustomerSelectPartner ||
          item.status === AppConfig.PostsStatus.waitPartnerConfrimWork
        if (item.status !== AppConfig.PostsStatus.closeJob) {
          if (statusMatch) {
            if (item.partnerRequest === AppConfig.PartnerType.type1) {
              type1 = type1 + 1
            }
            if (item.partnerRequest === AppConfig.PartnerType.type2) {
              type2 = type2 + 1
            }
            if (item.partnerRequest === AppConfig.PartnerType.type3) {
              type3 = type3 + 1
            }
            if (item.partnerRequest === AppConfig.PartnerType.type4) {
              type4 = type4 + 1
            }
            listTrue.push(item)
          }
        }
      })
      setSumType1(type1)
      setSumType2(type2)
      setSumType3(type3)
      setSumType4(type4)

      setTaskList(listTrue)

      resolve(true)
    })
  }

  useEffect(() => {
    getPartnerDashboardType1()
      .then((res) => setPostType1Count(res))
      .catch((err) => NotificationManager.error(err))
    getPartnerDashboardType2()
      .then((res) => setPostType2Count(res))
      .catch((err) => NotificationManager.error(err))
    getPartnerDashboardType3()
      .then((res) => setPostType3Count(res))
      .catch((err) => NotificationManager.error(err))
    getPartnerDashboardType4()
      .then((res) => setPostType4Count(res))
      .catch((err) => NotificationManager.error(err))
  }, [])

  useEffect(() => {
    const ref = firebase.database().ref(`${AppConfig.env}/posts`)
    const listener = ref.on("value", (snapshot) => {
      getComputeGroup(snapshot).catch((err) => NotificationManager.error(err))
      getConfigList()
        .then((res) => setItems(res))
        .catch((err) => NotificationManager.error(err))
    })
    return () => {
      ref.off("value", listener)
    }
  }, [])

  const onPressOptions = (type, partnerTypeNme) => {
    if (type === 4) {
    } else {
      history.push("/partner-customer-posts", {
        partnerType: type,
        profile: member,
        partnerTypeNme
      })
    }
  }

  return (
    <ImageBackground>
      <Header profile={member} hideBack />
      <div align="center" style={{ position: "fixed", right: 10, bottom: 60 }}>
        <Grid container spacing={1} style={{ marginTop: 55 }}>
          {items[0] && (
            <Grid item xs={6}>
              <div
                style={{
                  backgroundColor: "red",
                  borderRadius: 15,
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  verticalAlign: "center",
                  margin: 5
                }}
              >
                <img
                  src="assets/type1.jpg"
                  style={{
                    margin: 10,
                    borderRadius: 15,
                    width: "80%",
                    height: "70%",
                    border: "5px solid white"
                  }}
                  alt=""
                  onClick={() => onPressOptions(1, 'พริตตี้ Event / Mc')}
                />
                <div
                  style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                >
                  พริตตี้ Event / Mc
                </div>
                <div
                  style={{ color: "blue", fontSize: 12, fontWeight: "bold" }}
                >
                  จำนวน {sumType1} งาน
                </div>
              </div>
            </Grid>
          )}
          {items[1] && (
            <Grid item xs={6}>
              <div
                style={{
                  backgroundColor: "red",
                  borderRadius: 15,
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  verticalAlign: "center",
                  margin: 5
                }}
              >
                <img
                  src="assets/type2.jpg"
                  style={{
                    margin: 10,
                    borderRadius: 15,
                    width: "80%",
                    height: "70%",
                    border: "5px solid white"
                  }}
                  alt=""
                  onClick={() => onPressOptions(2, 'โคโยตี้ / งานเต้น')}
                />
                <div
                  style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                >
                  โคโยตี้ / งานเต้น
                </div>
                <div
                  style={{ color: "blue", fontSize: 12, fontWeight: "bold" }}
                >
                  จำนวน {sumType2} งาน
                </div>
              </div>
            </Grid>
          )}
          {items[2] && (
            <Grid item xs={6}>
              <div
                style={{
                  backgroundColor: "red",
                  borderRadius: 15,
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  verticalAlign: "center",
                  margin: 5
                }}
              >
                <img
                  src="assets/type3.jpg"
                  style={{
                    margin: 10,
                    borderRadius: 15,
                    width: "80%",
                    height: "70%",
                    border: "5px solid white"
                  }}
                  alt=""
                  onClick={() => onPressOptions(3, 'พริตตี้ En / Env')}
                />
                <div
                  style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                >
                  พริตตี้ En / Env
                </div>
                <div
                  style={{ color: "blue", fontSize: 12, fontWeight: "bold" }}
                >
                  จำนวน {sumType3} งาน
                </div>
              </div>
            </Grid>
          )}
          {items[3] && (
            <Grid item xs={6}>
              <div
                style={{
                  backgroundColor: "red",
                  borderRadius: 15,
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  verticalAlign: "center",
                  margin: 5
                }}
              >
                <img
                  src="assets/type4.jpg"
                  style={{
                    margin: 10,
                    borderRadius: 15,
                    width: "80%",
                    height: "70%",
                    border: "5px solid white"
                  }}
                  alt=""
                  onClick={() => onPressOptions(4, '')}
                />
                <div
                  style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                >
                  พริตตี้ นวดแผนไทย
                </div>
                <div
                  style={{ color: "blue", fontSize: 12, fontWeight: "bold" }}
                >
                  จำนวน {sumType4} งาน
                </div>
              </div>
            </Grid>
          )}
        </Grid>
      </div>
      <Footer profile={member} />
    </ImageBackground>
  )
}
