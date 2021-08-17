import React, { useState } from "react"

import styled from "styled-components"
import { Button, TextField } from "@material-ui/core"
import { SkipNext } from "@material-ui/icons"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import { useHistory } from "react-router-dom"

import Header from "../../components/header"
import ImageBackground from "../../components/background"

import { getCountryList, getDistrictList } from "../../../data/apis"

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url("assets/bg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`
export default function RegisterDetail2() {
  const history = useHistory()
  const {
    username,
    password,
    type1,
    type2,
    type3,
    type4,
    price4,
    gender,
    name,
    age,
    charactor,
    height,
    stature,
    weight
  } = history.location.state
  const [lineId, setLineId] = useState("")
  const [mobile, setMobile] = useState("")
  const [province, setProvince] = useState("")
  const [district, setDistrict] = useState("")
  const [address, setAddress] = useState("")
  const [provinceList] = useState(getCountryList())
  const [districtList, setDistrictList] = useState([])

  const handleNext = () => {
    if (!lineId) {
      alert("กรุณาระบุ Line Id")
      return
    }
    if (!mobile) {
      alert("กรุณาระบุเบอร์โทรศัพท์ เพื่อติดต่อ")
      return
    }
    if (!province) {
      alert("กรุณาระบุจังหวัดที่รับงานได้")
      return
    }
    if (type4 && !address) {
      alert("กรุณาระบุรายละเอียดที่อยู่เพิ่มเติม")
      return
    }
    history.push("/registerDetail3", {
      username,
      password,
      type1,
      type2,
      type3,
      type4,
      price4,
      gender,
      name,
      age,
      charactor,
      height,
      stature,
      weight,
      lineId,
      mobile,
      province,
      district,
      address
    })
  }

  const selectProvince = (pv) => {
    setProvince(pv)
    setDistrictList(getDistrictList(pv))
  }

  return (
    <ImageBackground>
      <Header hideBack />
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
        {type4 && (
          <div style={{ marginBottom: 10, paddingRight: 10, paddingLeft: 10 }}>
            <div style={{ width: "100%", marginTop: 10 }}>
              <TextField
                required
                label="ที่อยู่พักอาศัย (สำหรับนวดแผนไทย)"
                variant="outlined"
                style={{ width: "100%" }}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
        )}
        <div style={{ textAlign: "center" }}>
          <Button
            color="primary"
            variant="contained"
            style={{ width: 150, marginBottom: 10 }}
            startIcon={<SkipNext />}
            onClick={handleNext}
          >
            ถัดไป
          </Button>
        </div>
      </div>
    </ImageBackground>
  )
}
