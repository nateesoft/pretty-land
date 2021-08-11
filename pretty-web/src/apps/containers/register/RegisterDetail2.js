import React from "react"

import styled from "styled-components"
import { Button, TextField } from "@material-ui/core"
import { SkipNext } from "@material-ui/icons"
import FormControl from "@material-ui/core/FormControl"
import { Link } from "react-router-dom"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url("assets/bg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  padding: 20px;
`
export default function RegisterDetail2() {
  const [age, setAge] = React.useState("")

  const handleChange = (event) => {
    setAge(event.target.value)
  }

  return (
    <Container>
      <div align="center">
        <h3>จังหวัดที่รับงาน</h3>
        <div>(Way to get a job)</div>
      </div>
      <div style={{ padding: 10 }}>
        <div style={{ width: "100%" }}>
          <TextField
            required
            label="Line Id"
            variant="outlined"
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ width: "100%", marginTop: 5 }}>
          <TextField
            required
            label="เบอร์โทรศัพท์"
            variant="outlined"
            style={{ width: "100%" }}
          />
        </div>
        <FormControl variant="outlined" style={{ width: "100%", marginTop: 5 }}>
          <InputLabel id="demo-simple-select-outlined-label">
            จังหวัด
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={age}
            onChange={handleChange}
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
        <FormControl variant="outlined" style={{ width: "100%", marginTop: 5 }}>
          <InputLabel id="demo-simple-select-outlined-label">อำเภอ</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={age}
            onChange={handleChange}
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
            label="ที่อยู่พักอาศัย (สำหรับนวดแผนไทย)"
            variant="outlined"
            style={{ width: "100%" }}
          />
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Link to="/registerDetail3">
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
