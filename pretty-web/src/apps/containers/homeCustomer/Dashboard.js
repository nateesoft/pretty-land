import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useHistory } from "react-router-dom"

import { AppConfig } from "../../../Constants"
import firebase from "../../../util/firebase"
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
        partnerImage: imageUrl,
      })
    } else {
      console.log("loadDetailWork")
      history.push("/customer-create-work", {
        customerProfile: member,
        partnerRequest,
        partnerType: type,
        appconfig: appconfigMaster,
        partnerImage: imageUrl,
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
            <div style={{ color: "blue", fontSize: 12, fontWeight: "bold" }}>
              จำนวน 0 งาน
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
            <div style={{ color: "blue", fontSize: 12, fontWeight: "bold" }}>
              จำนวน 0 งาน
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
            <div style={{ color: "blue", fontSize: 12, fontWeight: "bold" }}>
              จำนวน 0 งาน
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
            <div style={{ color: "blue", fontSize: 12, fontWeight: "bold" }}>
              จำนวน 0 งาน
            </div>
          </ItemBottom>
        </Item>
      </ItemContainer>
    </Container>
  )
}
