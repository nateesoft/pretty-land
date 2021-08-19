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
      <Grid container spacing={1} style={{ margin: 10 }}>
        {listSelect &&
          listSelect.map((item, index) => (
            <Grid item xs={5} key={item.id}>
              <img
                src={item.image}
                alt=""
                style={{ width: 150, height: "auto" }}
                onClick={() => onPressShowPartnerDetail(item)}
              />
              <div style={{ height: 125 }}>
                <div>
                  {item.character}, {item.partnerName}
                </div>
                <div>
                  อายุ: {item.age}{" "}
                  {item.sex === "female"
                    ? "หญิง"
                    : item.sex === "male"
                    ? "ชาย"
                    : "อื่นๆ"}
                </div>
                <div>ราคา: {item.amount || 0} บาท</div>
                {item.selectStatus ===
                  AppConfig.PostsStatus.customerConfirm && (
                  <div>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<CheckCircle />}
                    >
                      เลือกคนนี้แล้ว
                    </Button>
                  </div>
                )}
              </div>
            </Grid>
          ))}
      </Grid>
      <Footer profile={customerProfile} />
    </ImageBackground>
  )
}
