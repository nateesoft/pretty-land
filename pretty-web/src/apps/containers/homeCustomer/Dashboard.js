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
      console.log("loadDetailWork")
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
              onClick={() => loadDetailWork(1, items[0].image_url)}
            />
          )}
          <ItemBottom>
            <div style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
              พริตตี้ Event / Mc
            </div>
            <div style={{ color: "black", fontSize: 12, fontWeight: "bold" }}>
              ( Boy : {sumBoy1} Gril : {sumGirl1} )
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
              onClick={() => loadDetailWork(2, items[1].image_url)}
            />
          )}
          <ItemBottom>
            <div style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
              โคโยตี้ / งานเต้น
            </div>
            <div style={{ color: "black", fontSize: 12, fontWeight: "bold" }}>
              ( Boy : {sumBoy2} Gril : {sumGirl2} )
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
              onClick={() => loadDetailWork(3, items[2].image_url)}
            />
          )}
          <ItemBottom>
            <div style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
              พริตตี้ En / Env
            </div>
            <div style={{ color: "black", fontSize: 12, fontWeight: "bold" }}>
              ( Boy : {sumBoy3} Gril : {sumGirl3} )
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
              onClick={() => loadDetailWork(4, items[3].image_url)}
            />
          )}
          <ItemBottom>
            <div style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
              พริตตี้ นวดแผนไทย
            </div>
            <div style={{ color: "black", fontSize: 12, fontWeight: "bold" }}>
              ( Boy : {sumBoy4} Gril : {sumGirl4} )
            </div>
          </ItemBottom>
        </Item>
      </ItemContainer>
    </Container>
  )
}
