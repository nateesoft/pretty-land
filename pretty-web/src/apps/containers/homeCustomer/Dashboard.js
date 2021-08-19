import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Grid } from "@material-ui/core"

import { AppConfig } from "../../../Constants"
import firebase from "../../../util/firebase"
import { snapshotToArray } from "../../../util"
import { getConfigList } from "../../../apis"

import ImageBackground from "../../components/background"
import Header from "../../components/header"
import Footer from "../../components/footer/Customer"

export default function Dashboard() {
  const history = useHistory()
  const { member } = history.location.state
  const [items, setItems] = useState([])
  const [appconfigMaster, setAppConfigMaster] = useState({})

  const [sumGirl1, setSumGirl1] = useState("0")
  const [sumGirl2, setSumGirl2] = useState("0")
  const [sumGirl3, setSumGirl3] = useState("0")
  const [sumGirl4, setSumGirl4] = useState("0")

  const [sumBoy1, setSumBoy1] = useState("0")
  const [sumBoy2, setSumBoy2] = useState("0")
  const [sumBoy3, setSumBoy3] = useState("0")
  const [sumBoy4, setSumBoy4] = useState("0")

  const getAllPartnerList = (snapshot) => {
    return new Promise((resolve, reject) => {
      const arr = snapshotToArray(snapshot)
      let typeGirl1 = 0,
        typeBoy1 = 0,
        typeGirl2 = 0,
        typeBoy2 = 0,
        typeGirl3 = 0,
        typeBoy3 = 0,
        typeGirl4 = 0,
        typeBoy4 = 0
      arr.forEach((item) => {
        if (item.memberType === "partner") {
          if (item.type1) {
            if (item.gender === "female") {
              typeGirl1 = typeGirl1 + 1
            } else if (item.gender === "male") {
              typeBoy1 = typeBoy1 + 1
            }
          }
          if (item.type2) {
            if (item.gender === "female") {
              typeGirl2 = typeGirl2 + 1
            } else if (item.gender === "male") {
              typeBoy2 = typeBoy2 + 1
            }
          }
          if (item.type3) {
            if (item.gender === "female") {
              typeGirl3 = typeGirl3 + 1
            } else if (item.gender === "male") {
              typeBoy3 = typeBoy3 + 1
            }
          }
          if (item.type4) {
            if (item.gender === "female") {
              typeGirl4 = typeGirl4 + 1
            } else if (item.gender === "male") {
              typeBoy4 = typeBoy4 + 1
            }
          }
        }
      })
      setSumGirl1(typeGirl1)
      setSumGirl2(typeGirl2)
      setSumGirl3(typeGirl3)
      setSumGirl4(typeGirl4)

      setSumBoy1(typeBoy1)
      setSumBoy2(typeBoy2)
      setSumBoy3(typeBoy3)
      setSumBoy4(typeBoy4)

      resolve(true)
    })
  }

  useEffect(() => {
    const ref = firebase.database().ref(`${AppConfig.env}/posts`)
    const listener = ref.on("value", (snapshot) => {
      getConfigList()
        .then((res) => setItems(res))
        .catch((err) => alert(err))
    })
    return () => {
      ref.off("value", listener)
    }
  }, [])

  useEffect(() => {
    const ref = firebase.database().ref(`${AppConfig.env}/appconfig`)
    ref.once("value", (snapshot) => {
      const dataItems = []
      const appconfig = snapshot.val()
      dataItems.push({ ...appconfig.partner1 })
      dataItems.push({ ...appconfig.partner2 })
      dataItems.push({ ...appconfig.partner3 })
      dataItems.push({ ...appconfig.partner4 })

      setAppConfigMaster(appconfig)
      setItems(dataItems)
    })
  }, [])

  useEffect(() => {
    const ref = firebase.database().ref(`${AppConfig.env}/members`)
    const listener = ref.on("value", (snapshot) => {
      getAllPartnerList(snapshot).catch((err) => alert(err))
    })
    return () => {
      ref.off("value", listener)
    }
  }, [])

  const loadDetailWork = (type, imageUrl) => {
    let partnerRequest = ""
    if (type === 1) {
      partnerRequest = AppConfig.PartnerType.type1
    } else if (type === 2) {
      partnerRequest = AppConfig.PartnerType.type2
    } else if (type === 3) {
      partnerRequest = AppConfig.PartnerType.type3
    } else if (type === 4) {
      partnerRequest = AppConfig.PartnerType.type4
    }
    if (type === 4) {
      history.push("/customer-create-work4", {
        customerProfile: member,
        partnerRequest,
        partnerType: type,
        appconfig: appconfigMaster,
        partnerImage: imageUrl
      })
    } else {
      history.push("/customer-create-work", {
        customerProfile: member,
        partnerRequest,
        partnerType: type,
        appconfig: appconfigMaster,
        partnerImage: imageUrl
      })
    }
  }

  return (
    <ImageBackground>
      <Header profile={member} hideBack />
      <div align="center" style={{position: 'fixed', right: 10, bottom: 65}}>
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
                  onClick={() => loadDetailWork(1, items[0].image_url)}
                />
                <div
                  style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                >
                  พริตตี้ Event / Mc
                </div>
                <div
                  style={{ color: "black", fontSize: 12, fontWeight: "bold" }}
                >
                  ( <span style={{ color: "blue" }}>Girl : {sumGirl1}</span>{" "}
                  <span style={{ color: "black" }}>Boy : {sumBoy1}</span> )
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
                  onClick={() => loadDetailWork(2, items[1].image_url)}
                />
                <div
                  style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                >
                  โคโยตี้ / งานเต้น
                </div>
                <div
                  style={{ color: "black", fontSize: 12, fontWeight: "bold" }}
                >
                  ( <span style={{ color: "blue" }}>Girl : {sumGirl2}</span>{" "}
                  <span style={{ color: "black" }}>Boy : {sumBoy2}</span> )
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
                  onClick={() => loadDetailWork(3, items[2].image_url)}
                />
                <div
                  style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                >
                  พริตตี้ En / Env
                </div>
                <div
                  style={{ color: "black", fontSize: 12, fontWeight: "bold" }}
                >
                  ( <span style={{ color: "blue" }}>Girl : {sumGirl3}</span>{" "}
                  <span style={{ color: "black" }}>Boy : {sumBoy3}</span> )
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
                  onClick={() => loadDetailWork(4, items[3].image_url)}
                />
                <div
                  style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                >
                  พริตตี้ นวดแผนไทย
                </div>
                <div
                  style={{ color: "black", fontSize: 12, fontWeight: "bold" }}
                >
                  ( <span style={{ color: "blue" }}>Girl : {sumGirl4}</span>{" "}
                  <span style={{ color: "black" }}>Boy : {sumBoy4}</span> )
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
