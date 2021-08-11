import React, { useState } from "react"

import styled from "styled-components"
import { Button, TextField } from "@material-ui/core"
import { CloudUpload, Save } from "@material-ui/icons"
import { useHistory } from "react-router-dom"

import * as ApiControl from "../../../apis"

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url("assets/bg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  padding: 20px;
`
export default function RegisterDetail4() {
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
    place,
    bankCode,
    bankNo
  } = history.location.state
  const [imageFile1, setImageFile1] = useState(null)
  const [imageFile2, setImageFile2] = useState(null)
  const [imageFile3, setImageFile3] = useState(null)
  const [imageFile4, setImageFile4] = useState(null)
  const [imageFile5, setImageFile5] = useState(null)
  const [imageFile6, setImageFile6] = useState(null)

  const [imageUrl1, setImageUrl1] = useState(null)
  const [imageUrl2, setImageUrl2] = useState(null)
  const [imageUrl3, setImageUrl3] = useState(null)
  const [imageUrl4, setImageUrl4] = useState(null)
  const [imageUrl5, setImageUrl5] = useState(null)
  const [imageUrl6, setImageUrl6] = useState(null)

  const uploadImageVideoToFirebase = () => {
    setImageUrl1("")
    setImageUrl2("")
    setImageUrl3("")
    setImageUrl4("")
    setImageUrl5("")
    setImageUrl6("")
  }

  const saveDataToDatabase = async () => {
    await ApiControl.saveNewPartner({
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
      bankNo,
      imageUrl1,
      imageUrl2,
      imageUrl3,
      imageUrl4,
      imageUrl5,
      imageUrl6
    })
    history.push("/", {})
  }

  return (
    <Container>
      <div align="center">
        <h3>เพิ่ม/แก้ไข รูปภาพ และวิดีโอ</h3>
        <div>Insert an image/ Video</div>
      </div>
      <div style={{ marginBottom: 10, paddingRight: 10, paddingLeft: 10 }}>
        <div style={{ width: "100%" }}>
          <TextField
            required
            variant="outlined"
            style={{ width: "100%" }}
            type="file"
            value={imageFile1}
            onChange={(e)=>setImageFile1(e.target.value)}
          />
        </div>
        <div style={{ width: "100%", marginTop: 5, marginBottom: 5 }}>
          <TextField
            required
            variant="outlined"
            style={{ width: "100%" }}
            type="file"
            value={imageFile2}
            onChange={(e)=>setImageFile2(e.target.value)}
          />
        </div>
        <div style={{ width: "100%", marginTop: 5, marginBottom: 5 }}>
          <TextField
            required
            variant="outlined"
            style={{ width: "100%" }}
            type="file"
            value={imageFile3}
            onChange={(e)=>setImageFile3(e.target.value)}
          />
        </div>
        <div style={{ width: "100%", marginTop: 5, marginBottom: 5 }}>
          <TextField
            required
            variant="outlined"
            style={{ width: "100%" }}
            type="file"
            value={imageFile4}
            onChange={(e)=>setImageFile4(e.target.value)}
          />
        </div>
        <div style={{ width: "100%", marginTop: 5, marginBottom: 5 }}>
          <TextField
            required
            variant="outlined"
            style={{ width: "100%" }}
            type="file"
            value={imageFile5}
            onChange={(e)=>setImageFile5(e.target.value)}
          />
        </div>
        <div style={{ width: "100%" }}>
          <TextField
            required
            variant="outlined"
            style={{ width: "100%" }}
            type="file"
            value={imageFile6}
            onChange={(e)=>setImageFile6(e.target.value)}
          />
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Button
          color="primary"
          variant="contained"
          style={{
            width: 150,
            borderRadius: 10,
            marginBottom: 10,
            backgroundColor: "green",
            color: "white"
          }}
          startIcon={<CloudUpload />}
          onClick={uploadImageVideoToFirebase}
        >
          อัพโหลด
        </Button>
      </div>
      <div style={{ textAlign: "center" }}>
        <Button
          color="primary"
          variant="contained"
          style={{ width: 150, marginBottom: 10, borderRadius: 10 }}
          startIcon={<Save />}
          onClick={saveDataToDatabase}
        >
          บันทึกข้อมูล
        </Button>
      </div>
    </Container>
  )
}
