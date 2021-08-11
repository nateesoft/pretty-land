import React, { useState } from "react"

import styled from "styled-components"
import { Button, TextField } from "@material-ui/core"
import { SkipNext } from "@material-ui/icons"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import { useHistory } from "react-router-dom"

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url("assets/bg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  padding: 20px;
`
export default function RegisterDetail3() {
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
    weight,
    lineId,
    telephone,
    province,
    district,
    place
  } = history.location.state
  const [bankCode, setBankCode] = useState("")
  const [bankNo, setBankNo] = useState("")

  const handleNext = () => {
    history.push("/registerDetail4", {
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
      telephone,
      province,
      district,
      place,
      bankCode,
      bankNo
    })
  }

  return (
    <Container>
      <div align="center">
        <h3>เพิ่มข้อมูลธนาคาร</h3>
      </div>
      <div style={{ padding: 10 }}>
        <FormControl variant="outlined" style={{ width: "100%", marginTop: 5 }}>
          <InputLabel id="demo-simple-select-outlined-label">ธนาคาร</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={bankCode}
            onChange={(e) => setBankCode(e.target.value)}
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div style={{ marginBottom: 10, paddingRight: 10, paddingLeft: 10 }}>
        <div style={{ width: "100%" }}>
          <TextField
            required
            label="เลขที่บัญชีธนาคาร"
            variant="outlined"
            style={{ width: "100%" }}
            value={bankNo}
            onChange={(e) => setBankNo(e.target.value)}
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
    </Container>
  )
}
