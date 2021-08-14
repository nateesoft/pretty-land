import React, { useState } from "react"

import styled from "styled-components"
import { Button, TextField } from "@material-ui/core"
import SaveIcon from "@material-ui/icons/Save"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import { useHistory } from "react-router-dom"

import { getBankList } from "../../../../data/apis"
import firebase from "../../../../util/firebase"
import { AppConfig } from "../../../../Constants"

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url("assets/bg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`
export default function RegisterDetail3() {
  const history = useHistory()
  const { profile } = history.location.state
  const [bank, setBank] = useState(profile.bank || "")
  const [bankNo, setBankNo] = useState(profile.bankNo || "")
  const [bankList] = useState(getBankList())

  const handleNext = async () => {
    if (!bank) {
      alert("กรุณาระบุธนาคารที่รอรับเงินโอน")
      return
    }
    if (!bankNo) {
      alert("กรุณาระบุเลขที่บัญชีธนาคาร")
      return
    }
    await firebase
      .database()
      .ref(`${AppConfig.env}/members/${profile.id}`)
      .update({
        bank,
        bankNo
      })
    history.push("/partner-edit-form-4", { profile })
  }

  return (
    <Container>
      <div style={{ margin: 10 }}>
        <div align="center">
          <h3>เพิ่มข้อมูลธนาคาร</h3>
        </div>
        <div style={{ padding: 10 }}>
          <FormControl
            variant="outlined"
            style={{ width: "100%", marginTop: 5 }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              ธนาคาร
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              label="Age"
            >
              <MenuItem value="">
                <em>--- เลือกธนาคาร ---</em>
              </MenuItem>
              {bankList.map((item, index) => (
                <MenuItem value={item.value} key={item.label + index}>
                  {item.label}
                </MenuItem>
              ))}
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
