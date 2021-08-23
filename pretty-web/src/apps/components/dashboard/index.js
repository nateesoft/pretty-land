import React, { useEffect, useState, memo } from "react"
import { useHistory } from "react-router"

import { Content, Container, Box } from "./styles"
import Header from "../header"
import CustomerFooter from "../footer/Customer"
import AdminFooter from "../footer/Admin"
import PartnerFooter from "../footer/Partner"
import { AppConfig } from "../../../Constants"
import firebase from "../../../util/firebase"
import Loading from "../loading"

const DashboardComponent = (props) => {
  const history = useHistory()
  const { member } = history.location.state
  const {
    type,
    profile,
    loadDetailWork,
    customerProps,
    adminProps,
    partnerProps,
    onPressOptions
  } = props

  const [items, setItems] = useState([])
  const [appconfigMaster, setAppConfigMaster] = useState({})
  const [loading, setLoading] = useState(true)
  const [onlyOne, setOnlyOne] = useState(false)

  const getImageHeight = (fixHeight) => {
    let result = fixHeight / 2.5
    if (items.length === 1) {
      result = fixHeight / 2
    } else {
      if (fixHeight === 812) {
        result = fixHeight / 2.5
      } else if (fixHeight === 746) {
        result = fixHeight / 2.5 - 5
      } else if (fixHeight === 736) {
        result = fixHeight / 2.5 - 5
      } else if (fixHeight === 622) {
        result = fixHeight / 2.5 - 20
      } else if (fixHeight === 667) {
        result = fixHeight / 2.5 - 10
      }
    }
    return result - 55
  }

  const handleClick = ({ partnerType, partnerImage, partnerName }) => {
    if (type === "customer") {
      return loadDetailWork(partnerType, partnerImage, appconfigMaster)
    } else if (type === "admin") {
      return onPressOptions(partnerType)
    } else if (type === "partner") {
      return onPressOptions(partnerType, partnerName)
    }
  }

  useEffect(() => {
    const ref = firebase.database().ref(`${AppConfig.env}/appconfig`)
    ref.once("value", (snapshot) => {
      const dataItems = []
      const dataTemp = []
      const oneItems = []
      const appconfig = snapshot.val()
      let checkCountItem = 0
      if (type === "partner") {
        if (profile.type1) {
          dataTemp.push({ ...appconfig.partner1 })
          oneItems.push({ ...appconfig.partner1 })
          checkCountItem += 1
        } else {
          dataTemp.push({
            type: 11,
            image_url: false,
            label: "aaa",
            name: "aaa",
            value: "aaa",
            status: "none"
          })
        }
        if (profile.type2) {
          dataTemp.push({ ...appconfig.partner2 })
          oneItems.push({ ...appconfig.partner2 })
          checkCountItem += 1
        } else {
          dataTemp.push({
            type: 22,
            image_url: false,
            label: "bbb",
            name: "bbb",
            value: "bbb",
            status: "none"
          })
        }
        if (profile.type3) {
          dataTemp.push({ ...appconfig.partner3 })
          oneItems.push({ ...appconfig.partner3 })
          checkCountItem += 1
        } else {
          dataTemp.push({
            type: 33,
            image_url: false,
            label: "ccc",
            name: "ccc",
            value: "ccc",
            status: "none"
          })
        }
        if (profile.type4) {
          dataTemp.push({ ...appconfig.partner4 })
          oneItems.push({ ...appconfig.partner4 })
          checkCountItem += 1
        } else {
          dataTemp.push({
            type: 44,
            image_url: false,
            label: "ddd",
            name: "ddd",
            value: "ddd",
            status: "none"
          })
        }
      } else {
        dataItems.push({ ...appconfig.partner1 })
        dataItems.push({ ...appconfig.partner2 })
        dataItems.push({ ...appconfig.partner3 })
        dataItems.push({ ...appconfig.partner4 })
        checkCountItem = 4
      }

      setOnlyOne(checkCountItem === 1)
      if (type === "partner") {
        if (checkCountItem === 1) {
          setItems(oneItems)
        } else {
          setItems(dataTemp)
        }
      } else {
        setItems(dataItems)
      }

      setAppConfigMaster(appconfig)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <Loading loading={loading} />
  }

  return (
    <Content>
      <Header hideBack />
      <Container style={{ marginTop: 55 }}>
        {items &&
          items.map((item, index) => (
            <Box
              key={items[index].type}
              style={{ top: onlyOne ? "30%" : "0%" }}
              onClick={() =>
                handleClick({
                  partnerType: items[index].type,
                  partnerImage: items[index].image_url,
                  partnerName: items[index].label
                })
              }
            >
              <div
                align="right"
                style={{
                  border: "3px solid white",
                  margin: 5,
                  background: `url(${items[index].image_url})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  borderRadius: 15,
                  height: getImageHeight(window.innerHeight)
                }}
              >
                {type === "admin" && adminProps.notifys[index] > 0 && (
                  <div
                    align="center"
                    style={{
                      height: 40,
                      width: 40,
                      color: "red",
                      background: "rgb(70, 240, 238)",
                      borderRadius: "0 5px 0 0",
                      fontSize: 22,
                      fontWeight: "bold",
                      lineHeight: 1.75
                    }}
                  >
                    <span>{adminProps.notifys[index]}</span>
                  </div>
                )}
                {type === "partner" &&
                  partnerProps.notifys[index] > 0 &&
                  items[index].status !== "none" && (
                    <div
                      align="center"
                      style={{
                        height: 40,
                        width: 40,
                        color: "red",
                        background: "rgb(70, 240, 238)",
                        borderRadius: "0 5px 0 0",
                        fontSize: 22,
                        fontWeight: "bold",
                        lineHeight: 1.75
                      }}
                    >
                      {partnerProps.notifys[index]}
                    </div>
                  )}
              </div>
              <div
                style={{
                  color: items[index].status === "none" ? "red" : "white",
                  fontWeight: "bold"
                }}
              >
                {item.label}
              </div>
              {type === "customer" && (
                <div style={{ fontSize: 12, fontWeight: "bold" }}>
                  ({" "}
                  <span style={{ color: "blue" }}>
                    Girl: {customerProps.girl[index]}
                  </span>{" "}
                  <span>Boy: {customerProps.boy[index]}</span> )
                </div>
              )}
              {type === "admin" && (
                <div style={{ fontSize: 12, fontWeight: "bold" }}>
                  จำนวนงาน {adminProps.works[index]} งาน
                </div>
              )}
              {type === "partner" && (
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    color: items[index].status === "none" ? "red" : "black"
                  }}
                >
                  จำนวนงาน {partnerProps.works[index]} งาน
                </div>
              )}
            </Box>
          ))}
      </Container>
      {type === "customer" && <CustomerFooter profile={member} />}
      {type === "admin" && <AdminFooter profile={member} />}
      {type === "partner" && <PartnerFooter profile={member} />}
    </Content>
  )
}

export default memo(DashboardComponent)
