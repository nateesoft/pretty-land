import React, { useState } from "react"
import styled from "styled-components"
import { Button, Grid, TextField } from "@material-ui/core"
import { SkipNext } from "@material-ui/icons"
import FormLabel from "@material-ui/core/FormLabel"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { RadioGroup, Radio } from "@material-ui/core"
import Checkbox from "@material-ui/core/Checkbox"
import { useHistory } from "react-router-dom"

import Header from "../../components/header"
import ImageBackground from "../../components/background"

import NumberFormatCustom from "../../components/numberFormat"

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
  const { username, password } = history.location.state

  const [gender, setGender] = useState("male")
  const [state, setState] = useState({
    type1: false,
    type2: false,
    type3: false,
    type4: false
  })
  const [price4, setPrice4] = useState(0)
  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [charactor, setCharactor] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [stature, setStature] = useState("")

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  const { type1, type2, type3, type4 } = state
  const error = [type1, type2, type3, type4].filter((v) => v).length !== 2
  console.log("error:", error)

  const handleNext = () => {
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
    history.push("/registerDetail2", {
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
    })
  }

  return (
    <ImageBackground>
      <Header />
      <div style={{ marginTop: 65 }}>
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
          <div align="center" style={{ margin: 10 }}>
            <TextField
              required
              label="ราคาสำหรับการนวดแผนไทยต่อ 1 ครั้ง"
              variant="outlined"
              style={{ width: "100%" }}
              value={price4}
              onChange={(e) => setPrice4(e.target.value)}
              autoComplete={false}
            />
          </div>
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
              autoComplete={false}
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
              autoComplete={false}
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
              autoComplete={false}
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
              autoComplete={false}
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
              autoComplete={false}
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
              autoComplete={false}
            />
          </div>
        </div>
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
