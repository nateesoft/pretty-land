import React, { useState } from "react"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import { useHistory } from "react-router-dom"
import InputLabel from "@material-ui/core/InputLabel"
import InputAdornment from "@material-ui/core/InputAdornment"
import Input from "@material-ui/core/Input"
import SaveIcon from "@material-ui/icons/Save"
import { Button } from "@material-ui/core"
import { Home, AccessTime, Snooze, Phone, ListAlt } from "@material-ui/icons"

import Header from "../../../components/header"
import Footer from "../../../components/footer/Customer"
import ImageBackground from "../../../components/background"

import { getProvinceName } from "../../../../data/apis"
import { saveNewPosts } from "../../../../apis"
import { AppConfig } from "../../../../Constants"

export default function PlaceForm() {
  const history = useHistory()
  const {
    customerProfile,
    partnerRequest,
    partnerType,
    province,
    partnerWantQty,
    partnerImage
  } = history.location.state
  const [sex, setSex] = useState("female")
  const [phone, setPhone] = useState("")
  const [place, setPlace] = useState("")
  const [remark, setRemark] = useState("")
  const [startTime, setStartTime] = useState("")
  const [stopTime, setStopTime] = useState("")
  const [customerGender, setCustomerGender] = useState("male")

  const createNewPost = () => {
    if (!place) {
      alert("กรุณาระบุ สถานที่")
      return
    }
    if (!startTime) {
      alert("กรุณาระบุ เวลาเริ่ม")
      return
    }
    if (!stopTime) {
      alert("กรุณาระบุ เวลาหยุด")
      return
    }
    if (!phone) {
      alert("กรุณาระบุ โทรศัพท์มือถือ")
      return
    }
    if (!customerGender) {
      alert("กรุณาระบุ เพศของผู้เรียก")
      return
    }
    const newDataPost = {
      customerId: customerProfile.id,
      partnerRequest,
      partnerImage: partnerImage || "",
      customerPhone: phone,
      placeMeeting: place,
      status: AppConfig.PostsStatus.customerNewPostDone,
      statusText: "โพสท์ใหม่",
      province,
      provinceName: getProvinceName(province)[0],
      customerRemark: remark,
      customerLevel: customerProfile.customerLevel || 0,
      customerName: customerProfile.profile || "",
      startTime,
      stopTime,
      partnerWantQty,
      sexTarget: sex,
      partnerType: partnerType,
      customerGender
    }
    saveNewPosts(newDataPost)
    alert("บันทึกข้อมูลสร้างโพสท์เรียบร้อยแล้ว")
    history.push("/customer", { member: customerProfile })
  }

  return (
    <ImageBackground>
      <Header profile={customerProfile} />
      <div
        align="center"
        style={{ overflow: "auto", marginTop: 55 }}
      >
        <FormControl
          component="fieldset"
          style={{
            padding: 10,
            margin: 10,
            borderRadius: 15,
            border: "1px solid",
            width: 250
          }}
        >
          <FormLabel component="legend">เลือก</FormLabel>
          <RadioGroup
            row
            aria-label="gender"
            name="gender1"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
          >
            <FormControlLabel value="male" control={<Radio />} label="ชาย" />
            <FormControlLabel value="female" control={<Radio />} label="หญิง" />
            <FormControlLabel value="other" control={<Radio />} label="อื่นๆ" />
          </RadioGroup>
        </FormControl>
        <FormControl style={{ margin: 10, alignContent: "center", width: 250 }}>
          <InputLabel htmlFor="input-with-icon-adornment">
            สถานที่นัดหมาย
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <Home />
              </InputAdornment>
            }
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            autoComplete="off"
          />
        </FormControl>
        <FormControl style={{ margin: 10, alignContent: "center", width: 250 }}>
          <InputLabel htmlFor="input-with-icon-adornment">เวลาเริ่ม</InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <AccessTime />
              </InputAdornment>
            }
            value={startTime}
            type="time"
            onChange={(e) => setStartTime(e.target.value)}
            autoComplete="off"
          />
        </FormControl>
        <FormControl style={{ margin: 10, alignContent: "center", width: 250 }}>
          <InputLabel htmlFor="input-with-icon-adornment">เวลาเลิก</InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <Snooze />
              </InputAdornment>
            }
            value={stopTime}
            type="time"
            onChange={(e) => setStopTime(e.target.value)}
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
            value={phone}
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="off"
          />
        </FormControl>
        <FormControl style={{ margin: 10, alignContent: "center", width: 250 }}>
          <InputLabel htmlFor="input-with-icon-adornment">
            รายละเอียดงาน
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <ListAlt />
              </InputAdornment>
            }
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            autoComplete="off"
          />
        </FormControl>
        <FormControl
          component="fieldset"
          style={{
            padding: 10,
            margin: 10,
            borderRadius: 15,
            border: "1px solid",
            width: 250
          }}
        >
          <FormLabel component="legend">กรุณาระบุ เพศ ของผู้เรียก</FormLabel>
          <RadioGroup
            row
            value={customerGender}
            onChange={(e) => setCustomerGender(e.target.value)}
          >
            <FormControlLabel value="male" control={<Radio />} label="ชาย" />
            <FormControlLabel value="female" control={<Radio />} label="หญิง" />
            <FormControlLabel value="other" control={<Radio />} label="อื่นๆ" />
          </RadioGroup>
        </FormControl>
      </div>
      <div align="center" style={{ margin: 10 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={createNewPost}
        >
          บันทึกโพสท์
        </Button>
      </div>
      <Footer profile={customerProfile} />
    </ImageBackground>
  )
}
