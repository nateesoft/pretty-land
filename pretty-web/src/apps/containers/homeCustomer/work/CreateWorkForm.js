import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import InputAdornment from "@material-ui/core/InputAdornment"
import Input from "@material-ui/core/Input"
import { Person, SkipNext } from "@material-ui/icons"
import { Button } from "@material-ui/core"

import Header from "../../../components/header"
import Footer from "../../../components/footer/Customer"
import ImageBackground from "../../../components/background"

import { getCountryList } from "../../../../data/apis"
import { AppConfig } from "../../../../Constants"
import firebase from "../../../../util/firebase"

export default function CreateWorkForm() {
  const history = useHistory()
  const { customerProfile, partnerRequest, partnerType, partnerImage } =
    history.location.state
  const [province, setProvince] = useState("")
  const [provinceList] = useState(getCountryList())
  const [partnerQty, setPartnerQty] = useState("")
  const [partnerWantQty, setPartnerWantQty] = useState("")

  const getPartnerQty = (value) => {
    return new Promise((resolve, reject) => {
      const ref = firebase.database().ref(`${AppConfig.env}/members`)
      ref.once("value", (snapshot) => {
        let count = 0
        snapshot.forEach((item) => {
          const data = { ...item.val() }
          const type1 = AppConfig.PartnerType.type1 === partnerRequest
          const type2 = AppConfig.PartnerType.type2 === partnerRequest
          const type3 = AppConfig.PartnerType.type3 === partnerRequest
          const type4 = AppConfig.PartnerType.type4 === partnerRequest
          if (
            data.province === value &&
            data.memberType === "partner" &&
            data.status !== AppConfig.MemberStatus.newRegister &&
            data.status !== AppConfig.MemberStatus.notApprove &&
            data.status !== AppConfig.MemberStatus.suspend
          ) {
            if (
              (data.type1 && type1) ||
              (data.type2 && type2) ||
              (data.type3 && type3) ||
              (data.type4 && type4)
            ) {
              count = count + 1
            }
          }
        })

        setPartnerQty(count)
        resolve(true)
      })
    })
  }

  const onChangeProvinceSelect = (value) => {
    setProvince(value)
    getPartnerQty(value).then((data) => console.log(data))
  }

  const handleNext = () => {
    if (!province) {
      alert("กรุณาระบุ จังหวัด")
      return
    }
    if (!partnerWantQty) {
      alert("กรุณาระบุ จำนวนสมาชิก")
      return
    }
    history.push("/place-form", {
      customerProfile,
      partnerRequest,
      partnerType,
      province,
      partnerWantQty,
      partnerImage
    })
  }

  return (
    <ImageBackground>
      <Header profile={customerProfile} />
      <div align="center" style={{ padding: 10 }}>
        <div
          align="center"
          style={{ fontSize: 22, color: "blue", fontWeight: "bold" }}
        >
          เลือกจังหวัด
        </div>
        <div style={{ fontSize: 14 }}>โหมดงาน: {partnerRequest}</div>
        <FormControl variant="outlined" style={{ marginTop: 10, width: 350 }}>
          <InputLabel id="demo-simple-select-outlined-label">
            จังหวัด
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={province}
            onChange={(e) => onChangeProvinceSelect(e.target.value)}
            label="จังหวัด"
          >
            <MenuItem value="">
              <em>-- เลือกจังหวัด --</em>
            </MenuItem>
            {provinceList.map((item, index) => (
              <MenuItem value={item.value} key={item.label + index}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {partnerQty && (
          <div
            style={{
              backgroundColor: "pink",
              width: 250,
              margin: 10
            }}
          >
            จำนวนสมาชิก ในระบบ: {partnerQty} คน
          </div>
        )}
        <FormControl style={{ margin: 10, alignContent: "center", width: 350 }}>
          <InputLabel htmlFor="input-with-icon-adornment">
            จำนวนน้องๆ ที่ต้องการ
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            }
            value={partnerWantQty}
            type="number"
            onChange={(e) => setPartnerWantQty(e.target.value)}
          />
        </FormControl>
        <div style={{ margin: 10 }}>
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#ff32ee" }}
            startIcon={<SkipNext />}
            onClick={handleNext}
          >
            ถัดไป
          </Button>
        </div>
      </div>
      <Footer profile={customerProfile} />
    </ImageBackground>
  )
}
