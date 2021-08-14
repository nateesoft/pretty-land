import React, { useState } from "react"
import styled from "styled-components"
import { Button, Grid, TextField } from "@material-ui/core"
import SaveIcon from "@material-ui/icons/Save"
import FormLabel from "@material-ui/core/FormLabel"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { RadioGroup, Radio } from "@material-ui/core"
import Checkbox from "@material-ui/core/Checkbox"
import { useHistory } from "react-router-dom"

import NumberFormatCustom from "../../../components/numberFormat"
import firebase from "../../../../util/firebase"
import { AppConfig } from "../../../../Constants"

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url("assets/bg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-attachment: fixed;
`

export default function RegisterDetail1() {
  const history = useHistory()
  const { profile } = history.location.state
  console.log('id:', profile.id);

  const [gender, setGender] = useState("male")
  const [state, setState] = useState({
    type1: profile.type1 || false,
    type2: profile.type2 || false,
    type3: profile.type3 || false,
    type4: profile.type4 || false
  })
  const [price4, setPrice4] = useState(profile.price4 || 0)
  const [name, setName] = useState(profile.name || "")
  const [age, setAge] = useState(profile.age || 0)
  const [charactor, setCharactor] = useState(profile.charactor || "")
  const [height, setHeight] = useState(profile.height || "")
  const [weight, setWeight] = useState(profile.weight || "")
  const [stature, setStature] = useState(profile.stature || "")

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  const { type1, type2, type3, type4 } = state
  const error = [type1, type2, type3, type4].filter((v) => v).length !== 2

  const handleNext = async () => {
    if (!type1 && !type2 && !type3 && !type4) {
      alert("กรุณาระบุประเภทงานที่ต้องการรับบริการ !!!")
      return
    }
    if (!name) {
      alert("กรุณาระบุชื่อหรือชื่อเล่น เพื่อใช้เรียก")
      return
    }
    if (type4 && !price4) {
      alert("กรุณาระบุราคา สำหรับประเภทนวดแผนไทย")
      return
    }

    if (!type4) {
      setPrice4(0)
    }
    await firebase.database().ref(`${AppConfig.env}/members/${profile.id}`).update({
      name,
      age,
      charactor,
      height,
      weight,
      stature,
      price4,
      type1,
      type2,
      type3,
      type4
    })
    history.push("/partner-edit-form-2", { profile })
  }

  return (
    <Container>
      <div style={{ margin: 10 }}>
        <div align="center">
          <h3>รายละเอียดงานที่สมัคร</h3>
          <div>(Work Details)</div>
        </div>
        <div style={{ padding: 10 }}>
          <FormLabel component="legend">หมวดหมู่งาน</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={type1}
                  onChange={handleChange}
                  name="type1"
                />
              }
              label="พริตตี้ Event / Mc"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={type2}
                  onChange={handleChange}
                  name="type2"
                />
              }
              label="โคโยตี้ / งานเต้น"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={type3}
                  onChange={handleChange}
                  name="type3"
                />
              }
              label="พริตตี้ En / Env"
            />
            <FormControlLabel
              style={{ marginTop: 20 }}
              control={
                <Checkbox
                  checked={type4}
                  onChange={handleChange}
                  name="type4"
                />
              }
              label="พริตตี้ นวดแผนไทย"
            />
          </FormGroup>
        </div>
        {type4 && (
          <Grid item xs={12}>
            <TextField
              required
              label="ราคาสำหรับการนวดแผนไทยต่อ 1 ครั้ง"
              variant="outlined"
              style={{ width: "100%" }}
              value={price4}
              onChange={(e) => setPrice4(e.target.value)}
            />
          </Grid>
        )}
        <div style={{ padding: 10 }}>
          <FormLabel component="legend">เพศ</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="ชาย (Male)"
            />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="หญิง (Female)"
            />
            <FormControlLabel
              value="other"
              control={<Radio />}
              label="อื่นๆ (Other)"
            />
          </RadioGroup>
        </div>
        <div style={{ padding: 10 }}>
          <div style={{ width: "100%" }}>
            <TextField
              required
              label="ชื่อ/ชื่อเล่น (Name/Nickname)"
              variant="outlined"
              style={{ width: "100%" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{ width: "100%", marginTop: 10 }}>
            <TextField
              required
              label="อายุ"
              variant="outlined"
              style={{ width: "100%" }}
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div style={{ width: "100%", marginTop: 10 }}>
            <TextField
              required
              label="นิสัยหรือบุคลิก (Charactor)"
              variant="outlined"
              style={{ width: "100%" }}
              value={charactor}
              onChange={(e) => setCharactor(e.target.value)}
            />
          </div>
          <div style={{ width: "100%", marginTop: 10 }}>
            <TextField
              required
              label="ส่วนสูง"
              variant="outlined"
              style={{ width: "100%" }}
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div style={{ width: "100%", marginTop: 10 }}>
            <TextField
              required
              label="สัดส่วน"
              variant="outlined"
              style={{ width: "100%" }}
              value={stature}
              onChange={(e) => setStature(e.target.value)}
              InputProps={{
                inputComponent: NumberFormatCustom
              }}
            />
          </div>
          <div style={{ width: "100%", marginTop: 10 }}>
            <TextField
              required
              label="น้ำหนัก"
              variant="outlined"
              style={{ width: "100%" }}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
        </div>
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
    </Container>
  )
}
