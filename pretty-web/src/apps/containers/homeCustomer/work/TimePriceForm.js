import React, { useState } from "react"
import FormControl from "@material-ui/core/FormControl"
import { useHistory } from "react-router-dom"
import InputLabel from "@material-ui/core/InputLabel"
import InputAdornment from "@material-ui/core/InputAdornment"
import Input from "@material-ui/core/Input"
import SaveIcon from "@material-ui/icons/Save"
import { Button } from "@material-ui/core"
import { AccessTime, Phone } from "@material-ui/icons"

import Header from "../../../components/header"
import Footer from "../../../components/footer/Customer"
import ImageBackground from "../../../components/background"

import { getProvinceName, getBankName } from "../../../../data/apis"
import { saveNewPosts } from "../../../../apis"
import { AppConfig } from "../../../../Constants"

export default function TimePriceForm() {
  const history = useHistory()
  const {
    customerProfile: customer,
    partnerRequest,
    province,
    partnerProfile,
    partnerType
  } = history.location.state
  const [timeMeeting, setTimeMeeting] = useState("")
  const [phone, setPhone] = useState("")

  const sendToMassagePartner = (data) => {
    if (!timeMeeting) {
      alert("กรุณาระบุ เวลาที่จะไป")
      return
    }
    if (!phone) {
      alert("กรุณาระบุ โทรศัพท์มือถือ")
      return
    }

    const dataToSave = {
      customerId: customer.id,
      customerName: customer.profile,
      partnerRequest,
      customerPhone: phone,
      partnerImage: partnerProfile.image,
      partnerType: partnerType,
      status: AppConfig.PostsStatus.waitPartnerConfrimWork,
      statusText: "รอแจ้งรับงาน",
      province,
      provinceName: getProvinceName(province)[0],
      customerLevel: customer.customerLevel || 0,
      timeMeeting,
      partnerSelect: {
        [data.id]: {
          partnerId: data.id,
          telephone: data.mobile,
          sex: data.gender,
          amount: data.price4,
          image: data.image,
          sys_create_date: new Date().toUTCString(),
          age: data.age,
          name: data.name,
          bankNo: data.bankNo,
          bankCode: data.bank,
          bankName: getBankName(data.bank)[0].label,
          lineId: data.lineId
        }
      }
    }
    saveNewPosts(dataToSave)

    history.push("/customer", { member: customer })
  }

  return (
    <ImageBackground>
      <Header profile={customer} />
      <div align="center" style={{ marginTop: 55 }}>
        <div>{partnerProfile.name}</div>
        <div>
          <img
            src={partnerProfile.image}
            alt=""
            style={{ width: 150, height: "auto" }}
          />
        </div>
        <FormControl style={{ margin: 10, alignContent: "center", width: 250 }}>
          <InputLabel htmlFor="input-with-icon-adornment">เวลาเริ่ม</InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <AccessTime />
              </InputAdornment>
            }
            type="time"
            value={timeMeeting}
            onChange={(e) => setTimeMeeting(e.target.value)}
            autoComplete="off"
          />
        </FormControl>
        <FormControl style={{ margin: 10, alignContent: "center", width: 250 }}>
          <InputLabel htmlFor="input-with-icon-adornment">
            เบอร์โทรศัพท์
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <Phone />
              </InputAdornment>
            }
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="off"
          />
        </FormControl>
        <div style={{ margin: 10 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={() => sendToMassagePartner(partnerProfile)}
          >
            ส่งไปยัง Partner
          </Button>
        </div>
      </div>
      <Footer profile={customer} />
    </ImageBackground>
  )
}
