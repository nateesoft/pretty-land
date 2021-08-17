import React, { useEffect, useState } from "react"
import { Button, Grid } from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { AttachMoney } from "@material-ui/icons"

import Header from "../../components/header"
import Footer from "../../components/footer/Customer"
import ImageBackground from "../../components/background"

import firebase from "../../../util/firebase"
import { snapshotToArray } from "../../../util"
import { AppConfig } from "../../../Constants"

export default function PartnerListSelect() {
  const history = useHistory()
  const { postItem, customerProfile } = history.location.state
  const [listSelect, setListSelect] = useState([])
  const [paymentActive, setPaymentActive] = useState(false)

  const mappingData = () => {
    return new Promise((resolve, reject) => {
      const data = postItem.partnerSelect
      const listPartner = []
      for (let key in data) {
        const obj = data[key]
        listPartner.push(obj)
      }
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
    mappingData().then((res) => setListSelect(res))
  }, [])

  useEffect(() => {
    const ref = firebase
      .database()
      .ref(`${AppConfig.env}/posts/${postItem.id}/partnerSelect`)
      .orderByChild("selectStatus")
      .equalTo(AppConfig.PostsStatus.customerConfirm)
    const listener = ref.on("value", (snapshot) => {
      const sizePartner = snapshotToArray(snapshot)
      if (sizePartner.length > 0) {
        setPaymentActive(true)
      }
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
      <Grid container spacing={3} style={{ margin: 10 }}>
        {listSelect &&
          listSelect.map((item, index) => (
            <Grid item xs={6} key={item.id}>
              <img
                src={item.image}
                alt=""
                style={{ width: 150, height: "auto" }}
                onClick={() => onPressShowPartnerDetail(item)}
              />
              <div>
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
              </div>
            </Grid>
          ))}
      </Grid>
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
      <Footer profile={customerProfile} />
    </ImageBackground>
  )
}
