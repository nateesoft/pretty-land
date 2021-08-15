import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useHistory } from "react-router-dom"

import { AppConfig } from "../../../Constants"
import firebase from "../../../util/firebase"
import { snapshotToArray } from "../../../util"
import { getConfigList } from "../../../apis"

const Container = styled.div`
  background-image: url("assets/bg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: red;
  border-radius: 10px;
`
const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: space-between;
  border-radius: 5px;
`
const Item = styled.div`
  width: 46%;
  height: 40vh;
  margin: 5px;
  border-radius: 5px;
  position: relative;
`

const ItemBottom = styled.div`
  position: absolute;
  bottom: 0;
  text-align: center;
  width: 100%;
`

const NoticeCompo = ({ count }) => (
  <div
    style={{
      position: "absolute",
      top: 5,
      right: 10,
      backgroundColor: "rgb(70, 240, 238)",
      width: 32,
      height: 40,
      fontSize: 22,
      fontWeight: "bold",
      color: "red"
    }}
  >
    {count}
  </div>
)

export default function Dashboard() {
  const history = useHistory()
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
    if (type === 4) {
    } else {
      history.push("/admin-customer-posts", { partnerType: type })
    }
  }

  return (
    <Container>
      <ItemContainer>
        <Item>
          {items[0] && (
            <img
              src={items[0].image_url}
              style={{
                width: "90%",
                height: "80%",
                borderRadius: "5px",
                border: "3px solid white"
              }}
              alt=""
              onClick={() => onPressOptions(1)}
            />
          )}
          {postType1Count > 0 && <NoticeCompo count={postType1Count} />}
          <ItemBottom>
            <div style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
              พริตตี้ Event / Mc
            </div>
            <div style={{ color: "blue", fontSize: 12, fontWeight: "bold" }}>
              จำนวน {sumType1} งาน
            </div>
          </ItemBottom>
        </Item>
        <Item>
          {items[1] && (
            <img
              src={items[1].image_url}
              style={{
                width: "90%",
                height: "80%",
                borderRadius: "5px",
                border: "3px solid white"
              }}
              alt=""
              onClick={() => onPressOptions(2)}
            />
          )}
          {postType2Count > 0 && <NoticeCompo count={postType2Count} />}
          <ItemBottom>
            <div style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
              โคโยตี้ / งานเต้น
            </div>
            <div style={{ color: "blue", fontSize: 12, fontWeight: "bold" }}>
              จำนวน {sumType2} งาน
            </div>
          </ItemBottom>
        </Item>
        <Item>
          {items[2] && (
            <img
              src={items[2].image_url}
              style={{
                width: "90%",
                height: "80%",
                borderRadius: "5px",
                border: "3px solid white"
              }}
              alt=""
              onClick={() => onPressOptions(3)}
            />
          )}
          {postType3Count > 0 && <NoticeCompo count={postType3Count} />}
          <ItemBottom>
            <div style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
              พริตตี้ En / Env
            </div>
            <div style={{ color: "blue", fontSize: 12, fontWeight: "bold" }}>
              จำนวน {sumType3} งาน
            </div>
          </ItemBottom>
        </Item>
        <Item>
          {items[3] && (
            <img
              src={items[3].image_url}
              style={{
                width: "90%",
                height: "80%",
                borderRadius: "5px",
                border: "3px solid white"
              }}
              alt=""
              onClick={() => onPressOptions(4)}
            />
          )}
          {postType4Count > 0 && <NoticeCompo count={postType4Count} />}
          <ItemBottom>
            <div style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
              พริตตี้ นวดแผนไทย
            </div>
            <div style={{ color: "blue", fontSize: 12, fontWeight: "bold" }}>
              จำนวน {sumType4} งาน
            </div>
          </ItemBottom>
        </Item>
      </ItemContainer>
    </Container>
  )
}
