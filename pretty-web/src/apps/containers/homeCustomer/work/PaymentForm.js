import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useHistory } from "react-router-dom"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import InputAdornment from "@material-ui/core/InputAdornment"
import FormControl from "@material-ui/core/FormControl"
import { AttachMoney, Save, DateRange } from "@material-ui/icons"
import { Button, Grid } from "@material-ui/core"
import LinearProgress from "@material-ui/core/LinearProgress"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Cookies from "js-cookie"
import { NotificationManager } from "react-notifications"
import Swal from "sweetalert2"

import ImageBackground from "../../../components/background"
import { savePaymentSlip } from "../../../../apis"
import { getBankName } from "../../../../data/apis"
import firebase from "../../../../util/firebase"
import { AppConfig } from "../../../../Constants"

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  )
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired
}

export default function PaymentForm() {
  const history = useHistory()
  if (!Cookies.get("logged_in")) {
    window.location.href = ""
  }
  const { postItem, customerProfile } = history.location.state

  const [partnerAmount, setPartnerAmount] = useState("")
  const [feeAmount, setFeeAmount] = useState("")
  const [netTotalAmount, setNetTotalAmount] = useState("")

  const [image, setImage] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [bank, setBank] = useState("")
  const [toAccount, setToAccount] = useState("")
  const [bankAccount, setBankAccount] = useState("")
  const [transferAmount, setTransferAmount] = useState("")
  const [datetime, setDateTime] = useState("")

  const [listPartner, setListPartner] = useState([])
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleBankAccount = (value) => {
    setBank(value)
    firebase
      .database()
      .ref(`${AppConfig.env}/bank_account/${value}`)
      .once("value", (snapshot) => {
        const data = { ...snapshot.val() }
        if (data.account_no) {
          setToAccount(data.account_no)
          setBankAccount(data.account_name)
        }
      })
  }

  const computeAmount = (snapshot) => {
    return new Promise((resolve, reject) => {
      let totalAmount = 0
      let list = []
      const listPartner = snapshot.val()
      for (let key in listPartner) {
        const partnerObj = listPartner[key]
        if (
          partnerObj.selectStatus === AppConfig.PostsStatus.customerConfirm ||
          partnerObj.partnerStatus === AppConfig.PostsStatus.partnerAcceptWork
        ) {
          const amt = parseInt(partnerObj.amount)
          totalAmount = totalAmount + amt
          list.push(partnerObj)
        }
      }
      setListPartner(list)
      resolve(totalAmount)
    })
  }

  const getFeeAmountFromFirebase = () => {
    return new Promise((resolve, reject) => {
      const ref = firebase
        .database()
        .ref(`${AppConfig.env}/appconfig/fee_amount`)
      ref.once("value", (snapshot) => {
        const feeAmt = parseInt(snapshot.val())
        resolve(feeAmt)
      })
    })
  }

  useEffect(() => {
    const ref = firebase
      .database()
      .ref(`${AppConfig.env}/posts/${postItem.id}/partnerSelect`)
    ref.once("value", async (snapshot) => {
      const pAmount = await computeAmount(snapshot)
      const fAmount = await getFeeAmountFromFirebase()
      const netTotalAmt = parseInt(pAmount) + parseInt(fAmount)

      setPartnerAmount(pAmount.toFixed(2))
      setFeeAmount(fAmount.toFixed(2))
      setNetTotalAmount(netTotalAmt.toFixed(2))
      setTransferAmount(netTotalAmt.toFixed(2))
    })
  }, [])

  const saveCustomerPayment = () => {
    if (!bank) {
      NotificationManager.warning("กรุณาระบุธนาคารที่ท่านโอนเงิน")
      return
    }
    if (!transferAmount) {
      NotificationManager.warning("กรุณาระบุยอดเงินที่ท่านโอน")
      return
    }
    if (!datetime) {
      NotificationManager.warning("กรุณาระบุวันที่ และเวลาที่โอนเงิน")
      return
    }

    if (parseInt(transferAmount) < parseInt(netTotalAmount)) {
      NotificationManager.warning("จำนวนเงินรับชำระไม่ถูกต้อง !")
      return
    }

    // upload slip image
    if (imageFile) {
      uploadImageAsync(imageFile).then((res) => {
        if (res) {
          Swal.fire(
            "ข้อมูลอัพเดตแล้ว",
            "บันทึกข้อมูลการโอนเงินเรียบร้อยแล้ว",
            "success"
          )
          history.push("/customer-posts", { member: customerProfile })
        }
      })
    } else {
      NotificationManager.warning("กรุณาเลือกสลิปการโอนเงิน !")
      return
    }
  }

  function uploadImageAsync(imageSource) {
    return new Promise((resolve, reject) => {
      const storage = firebase.storage()
      const storageRef = storage.ref(
        `${AppConfig.env}/images/member/customer/payment_slip/${postItem.id}`
      )
      const uploadTask = storageRef.put(imageSource)
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          setProgress(
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
        },
        (err) => {
          console.log("upload failure:", err)
          resolve(false)
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setImage(url)
            const getBank = getBankName(bank)
            const bankData = { ...getBank[0] }

            // save to firebase
            const dataPayment = {
              slip_image: url,
              status: AppConfig.PostsStatus.waitAdminConfirmPayment,
              statusText: "รอ admin ตรวจสอบการชำระเงิน",
              bankId: bankData.value,
              bankName: bankData.label,
              transferTime: datetime,
              transferAmount: transferAmount,
              sys_update_date: new Date().toUTCString()
            }

            savePaymentSlip(dataPayment, postItem)
              .then((res) => {
                if (res) {
                  setLoading("finish")
                }
              })
              .catch((err) => NotificationManager.error(err))

            resolve(true)
          })
        }
      )
    })
  }

  return (
    <ImageBackground>
      <div
        align="center"
        style={{
          padding: 10,
          backgroundColor: "#ff32ee",
          fontWeight: "bold",
          verticalAlign: "center",
          color: "white"
        }}
      >
        โอนเงิน เพื่อชำระค่าบริการ
      </div>
      <div
        align="center"
        style={{
          padding: 10,
          backgroundColor: "green",
          fontWeight: "bold",
          verticalAlign: "center",
          color: "white"
        }}
      >
        โหมด: {postItem.partnerRequest}
      </div>
      <div align="center" style={{ margin: 10 }}>
        <img
          src={postItem.partnerImage}
          alt=""
          style={{ width: 150, height: "auto", borderRadius: 20 }}
        />
      </div>
      <div align="center">
        <FormControl style={{ margin: 10, alignContent: "center", width: 350 }}>
          <InputLabel htmlFor="input-with-icon-adornment">
            จำนวนเงินที่ต้องชำระ (บาท)
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            value={partnerAmount}
            startAdornment={
              <InputAdornment position="start">
                <AttachMoney />
              </InputAdornment>
            }
            autoComplete="off"
          />
        </FormControl>
        <FormControl style={{ margin: 10, alignContent: "center", width: 350 }}>
          <InputLabel htmlFor="input-with-icon-adornment">
            ค่าธรรมเนียม (บาท)
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            value={feeAmount}
            startAdornment={
              <InputAdornment position="start">
                <AttachMoney />
              </InputAdornment>
            }
            autoComplete="off"
          />
        </FormControl>
        <FormControl style={{ margin: 10, alignContent: "center", width: 350 }}>
          <InputLabel htmlFor="input-with-icon-adornment">
            รวมยอดชำระทั้งหมด
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            value={netTotalAmount}
            startAdornment={
              <InputAdornment position="start">
                <AttachMoney />
              </InputAdornment>
            }
            autoComplete="off"
          />
        </FormControl>
      </div>
      <div align="center" style={{ color: "blue", fontWeight: "bold" }}>
        เลือกบัญชีธนาคาร สำหรับโอนเงิน
      </div>
      <div align="center">
        <Grid container>
          <Grid item xs={3}>
            <img
              src="/assets/bank/kbank.png"
              alt=""
              style={{ width: 64, height: "auto", margin: 5 }}
              onClick={() => handleBankAccount("kbank")}
            />
            <div>กสิกรไทย</div>
          </Grid>
          {/* <Grid item xs={3}>
            <img
              src="/assets/bank/scb.png"
              alt=""
              style={{ width: 64, height: "auto", margin: 5 }}
              onClick={() => handleBankAccount("scb")}
            />
            <div>ไทยพาณิชย์</div>
          </Grid>
          <Grid item xs={3}>
            <img
              src="/assets/bank/ktb.png"
              alt=""
              style={{ width: 64, height: "auto", margin: 5 }}
              onClick={() => handleBankAccount("ktb")}
            />
            <div>กรุงไทย</div>
          </Grid>
          <Grid item xs={3}>
            <img
              src="/assets/bank/bay.png"
              alt=""
              style={{ width: 64, height: "auto", margin: 5 }}
              onClick={() => handleBankAccount("bay")}
            />
            <div>กรุงศรี</div>
          </Grid> */}
        </Grid>
      </div>
      <div align="center">
        <FormControl style={{ margin: 10, alignContent: "center", width: 350 }}>
          <InputLabel htmlFor="input-with-icon-adornment">
            เลขที่บัญชีปลายทาง
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            value={toAccount}
            startAdornment={
              <InputAdornment position="start">
                <AttachMoney />
              </InputAdornment>
            }
            disabled
            autoComplete="off"
          />
        </FormControl>
        <FormControl style={{ margin: 10, alignContent: "center", width: 350 }}>
          <InputLabel htmlFor="input-with-icon-adornment">
            ชื่อบัญชีปลายทาง
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            value={bankAccount}
            startAdornment={
              <InputAdornment position="start">
                <AttachMoney />
              </InputAdornment>
            }
            disabled
            autoComplete="off"
          />
        </FormControl>
        <FormControl style={{ margin: 10, alignContent: "center", width: 350 }}>
          <InputLabel htmlFor="input-with-icon-adornment">
            ยอดเงินโอน (บาท)
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <AttachMoney />
              </InputAdornment>
            }
            autoComplete="off"
          />
        </FormControl>
        <FormControl style={{ margin: 10, alignContent: "center", width: 350 }}>
          <InputLabel htmlFor="input-with-icon-adornment">
            เวลาที่โอนเงิน (dd/MM/yyyy HH:mm:ss)
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            value={datetime}
            type="datetime-local"
            onChange={(e) => setDateTime(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <DateRange />
              </InputAdornment>
            }
            autoComplete="off"
          />
        </FormControl>
      </div>
      <div align="center" style={{ margin: 10 }}>
        <div style={{ margin: 10 }}>เลือกไฟล์...สลิปสำหรับการโอนเงิน</div>
        <input
          id="addSlipFile"
          accept="image/jpeg"
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      </div>
      <LinearProgressWithLabel value={progress} />
      <div align="center">
        <Button
          variant="contained"
          color="primary"
          startIcon={<Save />}
          onClick={saveCustomerPayment}
        >
          ส่งข้อมูลการโอนเงิน
        </Button>
      </div>
    </ImageBackground>
  )
}
