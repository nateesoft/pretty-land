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
    const newDataPost = {
      customerId: customerProfile.id,
      partnerRequest,
      partnerImage: partnerImage||'',
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
      partnerType: partnerType
    }
    saveNewPosts(newDataPost)
    alert("บันทึกข้อมูลสร้างโพสท์เรียบร้อยแล้ว")
    history.push("/customer", { member: customerProfile })
  }

  return (
    <div align="center">
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
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
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
          onChange={(e) => setStartTime(e.target.value)}
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
          onChange={(e) => setStopTime(e.target.value)}
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
          onChange={(e) => setPhone(e.target.value)}
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
        />
      </FormControl>
      <div style={{ margin: 10 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={createNewPost}
        >
          บันทึกโพสท์
        </Button>
      </div>
    </div>
  )
}
