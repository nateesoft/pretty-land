import React, { useState } from "react"

import { Button, TextField } from "@material-ui/core"
import SaveIcon from "@material-ui/icons/Save"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import { useHistory } from "react-router-dom"
import Cookies from "js-cookie"
import { NotificationManager } from "react-notifications"

import ImageBackground from "../../../components/background"
import Header from "../../../components/header"

import { getCountryList, getDistrictList } from "../../../../data/apis"
import firebase from "../../../../util/firebase"
import { AppConfig } from "../../../../Constants"

export default function RegisterDetail2() {
  const history = useHistory()
  if (!Cookies.get("logged_in")) {
    window.location.href = ""
  }
  const { profile } = history.location.state
  const [lineId, setLineId] = useState(profile.lineId || "")
  const [mobile, setMobile] = useState(profile.mobile || "")
  const [province, setProvince] = useState(profile.province || "")
  const [district, setDistrict] = useState(profile.district || "")
  const [address, setAddress] = useState(profile.address || "")
  const [provinceList] = useState(getCountryList())
  const [districtList, setDistrictList] = useState([])

  const handleNext = async () => {
    if (!lineId) {
      NotificationManager.warning("กรุณาระบุ Line Id")
      return
    }
    if (!mobile) {
      NotificationManager.warning("กรุณาระบุเบอร์โทรศัพท์ เพื่อติดต่อ")
      return
    }
    if (!province) {
      NotificationManager.warning("กรุณาระบุจังหวัดที่รับงานได้")
      return
    }
    if (profile.type4 && !address) {
      NotificationManager.warning("กรุณาระบุรายละเอียดที่อยู่เพิ่มเติม")
      return
    }
    await firebase
      .database()
      .ref(`${AppConfig.env}/members/${profile.id}`)
      .update({
        lineId,
        mobile,
        province,
        district,
        address
      })
    history.push("/partner-edit-form-3", { profile })
  }

  const selectProvince = (pv) => {
    setProvince(pv)
    setDistrictList(getDistrictList(pv))
  }

  return (
    <ImageBackground>
      <Header profile={profile} />
      <div style={{ marginTop: 65 }}>
        <div align="center">
          <h3>จังหวัดที่รับงาน</h3>
          <div>(Way to get a job)</div>
        </div>
        <div style={{ padding: 10, marginTop: 10 }}>
          <div style={{ width: "100%" }}>
            <TextField
              required
              label="Line Id"
              variant="outlined"
              style={{ width: "100%" }}
              value={lineId}
              onChange={(e) => setLineId(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div style={{ width: "100%", marginTop: 10 }}>
            <TextField
              required
              label="เบอร์โทรศัพท์"
              variant="outlined"
              style={{ width: "100%" }}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              autoComplete="off"
              type="number"
            />
          </div>
          <FormControl
            variant="outlined"
            style={{ width: "100%", marginTop: 10 }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              จังหวัด
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={province}
              onChange={(e) => selectProvince(e.target.value)}
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
          <FormControl
            variant="outlined"
            style={{ width: "100%", marginTop: 10 }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              อำเภอ
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              label="อำเภอ"
            >
              <MenuItem value="">
                <em>--- เลือกอำเภอ --</em>
              </MenuItem>
              {districtList.map((item, index) => (
                <MenuItem value={item.value} key={item.label + index}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {profile.type4 && (
          <div style={{ marginBottom: 10, paddingRight: 10, paddingLeft: 10 }}>
            <div style={{ width: "100%", marginTop: 10 }}>
              <TextField
                required
                label="ที่อยู่พักอาศัย (สำหรับนวดแผนไทย)"
                variant="outlined"
                style={{ width: "100%" }}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>
        )}
        <div style={{ textAlign: "center" }}>
          <Button
            color="primary"
            variant="contained"
            style={{ width: 150, marginBottom: 10 }}
            startIcon={<SaveIcon />}
            onClick={handleNext}
          >
            บันทึก/ถัดไป
          </Button>
        </div>
      </div>
    </ImageBackground>
  )
}
