import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Grid } from "@material-ui/core"

import ImageBackground from "../../components/background"
import Footer from "../../components/footer/Admin"
import Header from "../../components/header"

import { AppConfig } from "../../../Constants"
import firebase from "../../../util/firebase"
import { snapshotToArray } from "../../../util"
import { getConfigList } from "../../../apis"

const NoticeCompo = ({ count }) => (
  <div
    style={{
      position: "absolute",
      backgroundColor: "rgb(70, 240, 238)",
      width: 32,
      height: 40,
      fontSize: 22,
      fontWeight: "bold",
      color: "red"
    }}
  >
    <div style={{ marginTop: 5 }}>{count}</div>
  </div>
)

export default function Dashboard() {
  const history = useHistory()
  const { member } = history.location.state
  const [items, setItems] = useState([])

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
      const arr = snapshotToArray(snapshot)
      let type1 = 0,
        type2 = 0,
        type3 = 0,
        type4 = 0

      let countType1 = 0,
        countType2 = 0,
        countType3 = 0,
        countType4 = 0

      arr.forEach((item) => {
        const statusMatch =
          item.status === AppConfig.PostsStatus.customerNewPostDone ||
          item.status === AppConfig.PostsStatus.waitAdminConfirmPayment
        if (item.partnerRequest === AppConfig.PartnerType.type1) {
          type1 = type1 + 1
          if (statusMatch) {
            countType1 = countType1 + 1
          }
        }
        if (item.partnerRequest === AppConfig.PartnerType.type2) {
          type2 = type2 + 1
          if (statusMatch) {
            countType2 = countType2 + 1
          }
        }
        if (item.partnerRequest === AppConfig.PartnerType.type3) {
          type3 = type3 + 1
          if (statusMatch) {
            countType3 = countType3 + 1
          }
        }
        if (item.partnerRequest === AppConfig.PartnerType.type4) {
          type4 = type4 + 1
          if (
            statusMatch ||
            item.status === AppConfig.PostsStatus.waitAdminApprovePost
          ) {
            countType4 = countType4 + 1
          }
        }
      })

      setSumType1(type1)
      setSumType2(type2)
      setSumType3(type3)
      setSumType4(type4)

      setPostType1Count(countType1)
      setPostType2Count(countType2)
      setPostType3Count(countType3)
      setPostType4Count(countType4)

      resolve(true)
    })
  }

  useEffect(() => {
    const ref = firebase.database().ref(`${AppConfig.env}/posts`)
    const listener = ref.on("value", (snapshot) => {
      getComputeGroup(snapshot).catch((err) => alert(err))
      getConfigList()
        .then((res) => setItems(res))
        .catch((err) => alert(err))
    })
    return () => {
      ref.off("value", listener)
    }
  }, [])

  const onPressOptions = (type) => {
    history.push("/admin-customer-posts", { partnerType: type, member })
  }

  return (
    <ImageBackground>
      <Header profile={member} hideBack />
      <Grid
        container
        spacing={1}
        justifyContent="center"
        style={{ marginTop: 55 }}
      >
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
              {postType1Count > 0 && <NoticeCompo count={postType1Count} />}
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
                onClick={() => onPressOptions(1, items[0].image_url)}
              />
              <div style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
                พริตตี้ Event / Mc
              </div>
              <div style={{ color: "blue", fontSize: 12, fontWeight: "bold" }}>
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
              {postType2Count > 0 && <NoticeCompo count={postType2Count} />}
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
                onClick={() => onPressOptions(2, items[1].image_url)}
              />
              <div style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
                โคโยตี้ / งานเต้น
              </div>
              <div style={{ color: "blue", fontSize: 12, fontWeight: "bold" }}>
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
              {postType3Count > 0 && <NoticeCompo count={postType3Count} />}
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
                onClick={() => onPressOptions(3, items[2].image_url)}
              />
              <div style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
                พริตตี้ En / Env
              </div>
              <div style={{ color: "blue", fontSize: 12, fontWeight: "bold" }}>
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
              {postType4Count > 0 && <NoticeCompo count={postType4Count} />}
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
                onClick={() => onPressOptions(4, items[3].image_url)}
              />
              <div style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
                พริตตี้ นวดแผนไทย
              </div>
              <div style={{ color: "blue", fontSize: 12, fontWeight: "bold" }}>
                จำนวน {sumType4} งาน
              </div>
            </div>
          </Grid>
        )}
      </Grid>
      <Footer profile={member} />
    </ImageBackground>
  )
}
