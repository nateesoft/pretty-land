import React, { useEffect, useState } from "react"
import { Button, Grid } from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { AttachMoney, CheckCircle } from "@material-ui/icons"
import Cookies from "js-cookie"

import Header from "../../components/header"
import Footer from "../../components/footer/Customer"
import ImageBackground from "../../components/background"

import firebase from "../../../util/firebase"
import { AppConfig } from "../../../Constants"

export default function PartnerListSelect() {
  const history = useHistory()
  if (!Cookies.get("logged_in")) {
    window.location.href = ""
  }
  const { postItem, customerProfile } = history.location.state
  const [listSelect, setListSelect] = useState([])
  const [paymentActive, setPaymentActive] = useState(false)

  const mappingData = (pSelect) => {
    return new Promise((resolve, reject) => {
      const data = pSelect.partnerSelect
      const listPartner = []
      let activePaymentButton = false
      for (let key in data) {
        const obj = data[key]
        if (obj.selectStatus === AppConfig.PostsStatus.customerConfirm) {
          activePaymentButton = true
        }
        listPartner.push(obj)
      }
      setPaymentActive(activePaymentButton)
      resolve(listPartner)
    })
  }

  const handlePaymentForm = () => {
    history.push("/payment-form", { postItem, customerProfile })
  }

  const onPressShowPartnerDetail = (item) => {
    history.push("customer-partner-item", {
      postItem,
      partnerItem: item,
      customerProfile
    })
  }

  useEffect(() => {
    const ref = firebase.database().ref(`${AppConfig.env}/posts/${postItem.id}`)
    const listener = ref.on("value", (snapshot) => {
      const pSelect = { ...snapshot.val() }
      mappingData(pSelect).then((res) => setListSelect(res))
    })

    return () => ref.off("value", listener)
  }, [])

  return (
    <ImageBackground>
      <Header profile={customerProfile} />
      <div
        align="center"
        style={{
          backgroundColor: "#ff2fe6",
          padding: 10,
          fontSize: 22,
          fontWeight: "bold",
          color: "white",
          marginTop: 55,
          width: "100%"
        }}
      >
        น้องๆ พร้อมทำงาน
      </div>
      {paymentActive && (
        <div align="center">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AttachMoney />}
            onClick={handlePaymentForm}
            style={{ width: 200, borderRadius: 5, marginTop: 10 }}
          >
            เข้าหน้ารับชำระ
          </Button>
        </div>
      )}
      <Grid container spacing={1} style={{ margin: 5 }}>
        {listSelect &&
          listSelect.map((item, index) => (
            <Grid item xs={6} key={item.id}>
              <div>
                <img
                  src={item.image}
                  alt=""
                  style={{ width: "100%", height: 200 }}
                  onClick={() => onPressShowPartnerDetail(item)}
                />
                <div
                  align="center"
                  style={{
                    backgroundColor: "#b8256e",
                    color: "white",
                    alignItems: "center",
                    opacity: 0.8
                  }}
                >
                  ฿ {item.amount}
                </div>
              </div>
              <Grid container style={{ backgroundColor: "#fe9fbf" }}>
                <Grid item xs={6} style={{ color: "red", paddingLeft: 5 }}>
                  {item.partnerName}
                </Grid>
                <Grid item xs={6} style={{ color: "red", paddingLeft: 5 }}>
                  อายุ: {item.age}
                </Grid>
                <Grid item xs={6} style={{ color: "purple", paddingLeft: 5 }}>
                  {item.character}
                </Grid>
                <Grid item xs={6} style={{ color: "black", paddingLeft: 5 }}>
                  {item.sex === "female"
                    ? "หญิง"
                    : item.sex === "male"
                    ? "ชาย"
                    : "อื่นๆ"}
                </Grid>
                {item.selectStatus ===
                  AppConfig.PostsStatus.customerConfirm && (
                  <Grid item xs={12} style={{ color: "red" }}>
                    <div align="center">
                      <Button
                        style={{ background: "blue", color: "white" }}
                        variant="contained"
                        startIcon={<CheckCircle />}
                      >
                        เลือกคนนี้แล้ว
                      </Button>
                    </div>
                  </Grid>
                )}
              </Grid>
            </Grid>
          ))}
      </Grid>
      {/* <Footer profile={customerProfile} /> */}
    </ImageBackground>
  )
}
