import React, { useState, useEffect } from "react"
import FormControl from "@material-ui/core/FormControl"
import { AttachMoney, Save } from "@material-ui/icons"
import { Button } from "@material-ui/core"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import InputAdornment from "@material-ui/core/InputAdornment"
import { useHistory } from "react-router-dom"

import { partnerAcceptJobWaitCustomerReview } from "../../../../apis"
import firebase from "../../../../util/firebase"
import { AppConfig } from "../../../../Constants"

export default function ConfirmPriceForm() {
  const history = useHistory()
  const { item: postDetail, profile } = history.location.state
  const [amount, setAmount] = useState("")
  const [workStatus, setWorkStatus] = useState("")
  const [getWork, setGetWork] = useState(false)
  const workHide =
    postDetail.partnerQty -
      (postDetail.partnerSelect
        ? Object.keys(postDetail.partnerSelect).length
        : 0) ===
    0

  const partnerQuatation = () => {
    if (!amount) {
      alert("กรุณาระบุจำนวนเงินที่ต้องการ")
      return
    }
    partnerAcceptJobWaitCustomerReview(postDetail, {
      ...profile,
      amount
    })
    // history.push("/partner", { member: profile })
  }

  useEffect(() => {
    const ref = firebase
      .database()
      .ref(`posts/${postDetail.id}/partnerSelect/${profile.id}`)
    ref.once("value", (snapshot) => {
      const checkItem = { ...snapshot.val() }
      const acceptAlready = checkItem.partnerId === profile.id
      if (acceptAlready) {
        setAmount(checkItem.amount)
        setWorkStatus(checkItem.selectStatus)
      }
      setGetWork(acceptAlready)
    })
  }, [])

  return (
    <div>
      <div
        style={{
          backgroundColor: "#ff2fe6",
          color: "white",
          padding: 10,
          fontSize: 22,
          fontWeight: "bold"
        }}
      >
        <div align="center">รายละเอียดโพสท์</div>
      </div>
      <div align="center" style={{ padding: 10 }}>
        <FormControl style={{ margin: 10, width: 250 }}>
          <InputLabel htmlFor="input-with-icon-adornment">
            ค่าบริการ (บาท)
          </InputLabel>
          <Input
            type="text"
            startAdornment={
              <InputAdornment position="start">
                <AttachMoney />
              </InputAdornment>
            }
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </FormControl>
      </div>
      <div align="center">
        <Button
          variant="contained"
          color="primary"
          startIcon={<Save />}
          onClick={partnerQuatation}
        >
          ยืนยันราคา
        </Button>
      </div>
      {getWork && workStatus === AppConfig.PostsStatus.customerConfirm && (
        <div
          style={{
            color: "white",
            backgroundColor: "blue",
            padding: 20,
            fontSize: 20,
            fontWeight: "bold"
          }}
        >
          ได้งานแล้ว รอลูกค้าชำระเงิน
        </div>
      )}
      {getWork &&
        workStatus === AppConfig.PostsStatus.waitCustomerSelectPartner && (
          <div
            style={{
              color: "white",
              backgroundColor: "blue",
              padding: 20,
              fontSize: 20,
              fontWeight: "bold"
            }}
          >
            รอลูกค้ารับงาน
          </div>
        )}
      {!getWork && workHide && (
        <div
          style={{
            color: "black",
            backgroundColor: "red",
            padding: 20,
            fontSize: 20,
            fontWeight: "bold"
          }}
        >
          งานนี้ถูกรับงานไปเต็มแล้ว
        </div>
      )}
    </div>
  )
}
