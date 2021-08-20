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
import Cookies from "js-cookie"
import { NotificationManager } from "react-notifications"

import Header from "../../../components/header"
import ImageBackground from "../../../components/background"

import { getCountryList, getDistrictList } from "../../../../data/apis"
import { AppConfig } from "../../../../Constants"
import firebase from "../../../../util/firebase"

export default function CreateWorkForm4() {
  const history = useHistory()
  if (!Cookies.get("logged_in")) {
    window.location.href = ""
  }
  const { customerProfile, partnerRequest, partnerType } =
    history.location.state
  const [sex, setSex] = useState("female")
  const [province, setProvince] = useState("")
  const [district, setDistrict] = useState("")
  const [partnerQty, setPartnerQty] = useState("")
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
    getPartnerQty(sexType, province, district).catch((err) =>
      NotificationManager.error(err)
    )
  }

  const getPartnerQty = (sexType, province) => {
    return new Promise((resolve, reject) => {
      const ref = firebase
        .database()
        .ref(`${AppConfig.env}/members`)
        .orderByChild("type4")
        .equalTo(true)
      ref.once("value", (snapshot) => {
        let count = 0
        let list = []
        snapshot.forEach((item) => {
          const data = { ...item.val() }
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
        })

        let avList = list.filter(item=>item.work_status==='available')
        let notAvList = list.filter(item=>item.work_status!=='available')

        setPartnerQty(count)
        setPartnerList(avList.concat(notAvList))
        resolve(true)
      })
    })
  }

  const handleNext = (item) => {
    history.push("/customer-review-type4-profile", {
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
        <div algin="center">
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
        </div>
        <div align="center">
          <FormControl
            variant="outlined"
            style={{
              marginTop: 10,
              width: 350,
              borderRadius: 5,
              marginBottom: 10
            }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              อำเภอ
            </InputLabel>
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
        </div>
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
          <FormLabel component="legend">เลือกเพศ</FormLabel>
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
              <Grid item xs={6} key={item.id}>
                <div
                  style={{
                    position: "absolute",
                    color: item.work_status === "available" ? "white" : "red",
                    fontWeight: "bold",
                    padding: 5,
                    width: 45,
                    backgroundColor:
                      item.work_status === "available"
                        ? "green"
                        : "rgb(70, 240, 238)"
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
                      opacity: 0.8,
                      bottom: 90,
                      fontSize: 18,
                      padding: 5,
                      fontWeight: "bold"
                    }}
                  >
                    ฿ {item.price4}
                  </div>
                </div>
                <Grid container style={{ backgroundColor: "#fe9fbf" }}>
                  <Grid
                    item
                    xs={6}
                    style={{ color: "red", fontWeight: "bold" }}
                  >
                    {item.name}
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    style={{ color: "red", fontWeight: "bold" }}
                  >
                    อายุ: {item.age}
                  </Grid>
                  <Grid
                    item
                    xs={8}
                    style={{ color: "purple", fontWeight: "bold" }}
                  >
                    {item.address}
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    {item.gender}
                  </Grid>
                </Grid>
              </Grid>
            ))}
        </Grid>
      </div>
    </ImageBackground>
  )
}
