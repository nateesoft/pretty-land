import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useHistory } from "react-router-dom"

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

export default function Dashboard() {
  const [items, setItems] = useState([])
  const history = useHistory()
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
        if (
          item.status === AppConfig.PostsStatus.adminConfirmNewPost ||
          item.status === AppConfig.PostsStatus.waitCustomerSelectPartner ||
          item.status === AppConfig.PostsStatus.waitPartnerConfrimWork
        ) {
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
      .catch((err) => alert(err))
    getPartnerDashboardType2()
      .then((res) => setPostType2Count(res))
      .catch((err) => alert(err))
    getPartnerDashboardType3()
      .then((res) => setPostType3Count(res))
      .catch((err) => alert(err))
    getPartnerDashboardType4()
      .then((res) => setPostType4Count(res))
      .catch((err) => alert(err))
  }, [])

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
      history.push("/partner-customer-posts", {
        partnerType: type,
        profile: member
      })
    }
  }

  return (
    <Container>
      <ItemContainer>
        {member.type1 && (
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
            <ItemBottom>
              <div style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
                พริตตี้ Event / Mc
              </div>
              <div style={{ color: "blue", fontSize: 12, fontWeight: "bold" }}>
                จำนวน {sumType1} งาน
              </div>
            </ItemBottom>
          </Item>
        )}
        {member.type2 && (
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
            <ItemBottom>
              <div style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
                โคโยตี้ / งานเต้น
              </div>
              <div style={{ color: "blue", fontSize: 12, fontWeight: "bold" }}>
                จำนวน {sumType2} งาน
              </div>
            </ItemBottom>
          </Item>
        )}
        {member.type3 && (
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
            <ItemBottom>
              <div style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
                พริตตี้ En / Env
              </div>
              <div style={{ color: "blue", fontSize: 12, fontWeight: "bold" }}>
                จำนวน {sumType3} งาน
              </div>
            </ItemBottom>
          </Item>
        )}
        {member.type4 && (
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
            <ItemBottom>
              <div style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
                พริตตี้ นวดแผนไทย
              </div>
              <div style={{ color: "blue", fontSize: 12, fontWeight: "bold" }}>
                จำนวน {sumType4} งาน
              </div>
            </ItemBottom>
          </Item>
        )}
      </ItemContainer>
    </Container>
  )
}
