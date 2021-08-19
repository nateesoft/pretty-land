import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import FormLabel from "@material-ui/core/FormLabel"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { Grid } from "@material-ui/core"

import Header from "../../../components/header"
import Footer from "../../../components/footer/Customer"
import ImageBackground from "../../../components/background"

import { getCountryList, getDistrictList } from "../../../../data/apis"
import { AppConfig } from "../../../../Constants"
import firebase from "../../../../util/firebase"

export default function CreateWorkForm4() {
  const history = useHistory()
  const { customerProfile, partnerRequest, partnerType } =
    history.location.state
  const [sex, setSex] = useState("female")
  const [province, setProvince] = useState("")
  const [district, setDistrict] = useState("")
  const [partnerQty, setPartnerQty] = useState("")
  const [partnerWantQty, setPartnerWantQty] = useState("")
  const [provinceList] = useState(getCountryList())
  const [districtList, setDistrictList] = useState([])
  const [partnerList, setPartnerList] = useState([])

  const selectProvince = (pv) => {
    setProvince(pv)
    setDistrictList(getDistrictList(pv))
    onChangeProvinceSelect(sex, pv)
  }

  const selectDistrict = (dt) => {
    setDistrict(dt)
    onChangeProvinceSelect(sex, province, dt)
  }

  const selectSex = (st) => {
    setSex(st)
    onChangeProvinceSelect(st, province, district)
  }

  const onChangeProvinceSelect = (sexType, province, district) => {
    getPartnerQty(sexType, province, district).catch((err) => alert(err))
  }

  const getPartnerQty = (sexType, province) => {
    return new Promise((resolve, reject) => {
      const ref = firebase.database().ref(`${AppConfig.env}/members`)
      ref.once("value", (snapshot) => {
        let count = 0
        let list = []
        snapshot.forEach((item) => {
          const data = { ...item.val() }
          if (data.memberType === "partner" && data.type4) {
            let isDistrict = true
            if (district) {
              isDistrict = data.district === district
            }
            if (
              data.province === province &&
              isDistrict &&
              data.status !== AppConfig.MemberStatus.newRegister &&
              data.status !== AppConfig.MemberStatus.notApprove &&
              data.status !== AppConfig.MemberStatus.suspend
            ) {
              if (data.gender === sexType) {
                count = count + 1
                list.push(data)
              }
            }
          }
        })

        setPartnerQty(count)
        setPartnerList(list)
        resolve(true)
      })
    })
  }

  const handleNext = (item) => {
    history.push("/time-price-form", {
      customerProfile,
      partnerProfile: item,
      province,
      partnerRequest,
      partnerType
    })
  }

  return (
    <ImageBackground>
      <Header profile={customerProfile} />
      <div align="center" style={{ padding: 10, marginTop: 55 }}>
        <div
          align="center"
          style={{ fontSize: 22, color: "blue", fontWeight: "bold" }}
        >
          {partnerRequest}
        </div>
        <FormControl
          variant="outlined"
          style={{ marginTop: 10, width: 350, borderRadius: 5 }}
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
          style={{
            marginTop: 10,
            width: 350,
            borderRadius: 5,
            marginBottom: 10
          }}
        >
          <InputLabel id="demo-simple-select-outlined-label">อำเภอ</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={district}
            onChange={(e) => selectDistrict(e.target.value)}
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
        {province !== "" && (
          <div
            style={{
              marginBottom: 10,
              backgroundColor: "pink",
              padding: 5,
              width: 325
            }}
          >
            <span style={{ fontSize: 16 }}>
              จำนวนพนักงานนวด: {partnerQty} คน
            </span>
          </div>
        )}
        <FormControl
          component="fieldset"
          style={{
            padding: 10,
            margin: 10,
            border: "1px solid gray",
            width: 325,
            borderRadius: 5
          }}
        >
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            row
            aria-label="gender"
            name="gender1"
            value={sex}
            onChange={(e) => selectSex(e.target.value)}
          >
            <FormControlLabel
              value="male"
              control={<Radio color="primary" />}
              label="ชาย"
              labelPlacement="end"
            />
            <FormControlLabel
              value="female"
              control={<Radio color="primary" />}
              label="หญิง"
              labelPlacement="end"
            />
            <FormControlLabel
              value="other"
              control={<Radio color="primary" />}
              label="อื่นๆ"
              labelPlacement="end"
            />
          </RadioGroup>
        </FormControl>
        {partnerList.length === 0 && (
          <div style={{ fontSize: 22, color: "gray", fontWeight: "bold" }}>
            ไม่พบข้อมูล {partnerRequest}
          </div>
        )}
        <Grid container spacing={1}>
          {partnerList.length > 0 &&
            partnerList.map((item, index) => (
              <Grid item xs={6} key={item.partnerId}>
                <div
                  style={{
                    color:
                      item.work_status === "available" || !item.work_status
                        ? "red"
                        : "white",
                    fontWeight: "bold",
                    backgroundColor:
                      item.work_status === "available" || !item.work_status
                        ? "rgb(70, 240, 238)"
                        : "green"
                  }}
                >
                  {item.work_status === "available" ? "ว่าง" : "ไม่ว่าง"}
                </div>
                <div>
                  <img
                    src={item.image}
                    alt=""
                    style={{ width: "100%", height: 200 }}
                    onClick={() => handleNext(item)}
                  />
                  <div
                    style={{
                      backgroundColor: "#b8256e",
                      color: "white",
                      alignItems: "center",
                      opacity: 0.8
                    }}
                  >
                    ฿ {item.price4}
                  </div>
                  <Grid container style={{ backgroundColor: "#fe9fbf" }}>
                    <Grid item xs={6} style={{ color: "red" }}>
                      {item.name}
                    </Grid>
                    <Grid item xs={6} style={{ color: "red" }}>
                      อายุ: {item.age}
                    </Grid>
                    <Grid item xs={8} style={{ color: "purple" }}>
                      {item.address}
                    </Grid>
                    <Grid item xs={4} style={{ color: "black" }}>
                      {item.gender === "female"
                        ? "หญิง"
                        : item.gender === "male"
                        ? "ชาย"
                        : "อื่นๆ"}
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            ))}
        </Grid>
      </div>
      {/* <Footer profile={customerProfile} /> */}
    </ImageBackground>
  )
}
