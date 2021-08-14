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
    onChangeProvinceSelect(sex, province, district)
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
          const type4 = AppConfig.PartnerType.type4 === partnerRequest
          let isDistrict = true
          if (district) {
            isDistrict = data.district === district
          }
          if (
            data.province === province &&
            isDistrict &&
            data.memberType === "partner" &&
            data.status !== AppConfig.MemberStatus.newRegister &&
            data.status !== AppConfig.MemberStatus.notApprove &&
            data.status !== AppConfig.MemberStatus.suspend
          ) {
            if (data.type4 && type4) {
              if (data.sex === sexType) {
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

  const handleNext = () => {
    history.push("/place-form", {
      customerProfile,
      partnerRequest,
      partnerType,
      province,
      partnerWantQty
    })
  }

  return (
    <div align="center" style={{ padding: 10 }}>
      <div style={{ color: "blue", fontSize: 22, fontWeight: "bold" }}>
        {partnerRequest}
      </div>
      <FormControl variant="outlined" style={{ marginTop: 10, width: 250 }}>
        <InputLabel id="demo-simple-select-outlined-label">จังหวัด</InputLabel>
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
      <FormControl variant="outlined" style={{ marginTop: 10, width: 250 }}>
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
          onChange={(e) => selectSex(e.target.value)}
        >
          <FormControlLabel value="male" control={<Radio />} label="ชาย" />
          <FormControlLabel value="female" control={<Radio />} label="หญิง" />
          <FormControlLabel value="other" control={<Radio />} label="อื่นๆ" />
        </RadioGroup>
      </FormControl>
      {partnerList.length === 0 && (
        <div style={{ fontSize: 22, color: "gray", fontWeight: "bold" }}>
          ไม่พบข้อมูล {partnerRequest}
        </div>
      )}
    </div>
  )
}
