import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import styled from "styled-components"
import { Button, TextField } from "@material-ui/core"
import { SkipNext } from "@material-ui/icons"
import FormLabel from "@material-ui/core/FormLabel"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { RadioGroup, Radio } from "@material-ui/core"
import Checkbox from "@material-ui/core/Checkbox"
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing(3)
  }
}))
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url("assets/bg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-attachment: fixed;
  padding: 20px;
`
export default function RegisterDetail1() {
  const [value, setValue] = React.useState("male")
  const [state, setState] = React.useState({
    type1: false,
    type2: false,
    type3: false,
    type4: false
  })

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  const handleRadioChange = (event) => {
    setValue(event.target.value)
  }

  const { type1, type2, type3, type4 } = state
  const error = [type1, type2, type3, type4].filter((v) => v).length !== 2

  return (
    <Container>
      <div align="center">
        <h3>รายละเอียดงานที่สมัคร</h3>
        <div>(Work Details)</div>
      </div>
      <div style={{ padding: 10 }}>
        <FormLabel component="legend">หมวดหมู่งาน</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={type1} onChange={handleChange} name="type1" />
            }
            label="พริตตี้ Event / Mc"
          />
          <FormControlLabel
            control={
              <Checkbox checked={type2} onChange={handleChange} name="type2" />
            }
            label="โคโยตี้ / งานเต้น"
          />
          <FormControlLabel
            control={
              <Checkbox checked={type3} onChange={handleChange} name="type3" />
            }
            label="พริตตี้ En / Env"
          />
          <FormControlLabel
            style={{ marginTop: 20 }}
            control={
              <Checkbox checked={type4} onChange={handleChange} name="type4" />
            }
            label="พริตตี้ นวดแผนไทย"
          />
        </FormGroup>
      </div>
      {type4 && (
        <div style={{ marginBottom: 10, paddingRight: 10, paddingLeft: 10 }}>
          <div style={{ width: "100%" }}>
            <TextField
              required
              label="ราคาสำหรับการนวดแผนไทยต่อ 1 ครั้ง"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      )}
      <div style={{ padding: 10 }}>
        <FormLabel component="legend">เพศ</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender"
          value={value}
          onChange={handleRadioChange}
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
          />
        </div>
        <div style={{ width: "100%", marginTop: 5 }}>
          <TextField
            required
            label="อายุ"
            variant="outlined"
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ width: "100%", marginTop: 5 }}>
          <TextField
            required
            label="นิสัยหรือบุคลิก (Charactor)"
            variant="outlined"
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ width: "100%", marginTop: 5 }}>
          <TextField
            required
            label="ส่วนสูง"
            variant="outlined"
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ width: "100%", marginTop: 5 }}>
          <TextField
            required
            label="สัดส่วน"
            variant="outlined"
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ width: "100%", marginTop: 5 }}>
          <TextField
            required
            label="น้ำหนัก"
            variant="outlined"
            style={{ width: "100%" }}
          />
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Link to="/registerDetail2">
          <Button
            color="primary"
            variant="contained"
            style={{ width: 150, marginBottom: 10 }}
            startIcon={<SkipNext />}
          >
            ถัดไป
          </Button>
        </Link>
      </div>
    </Container>
  )
}
