import React from "react"

import styled from "styled-components"
import { Button, TextField } from "@material-ui/core"
import { CloudUpload, Save } from "@material-ui/icons"
import { Link } from "react-router-dom"

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
          />
        </div>
        <div style={{ width: "100%", marginTop: 5, marginBottom: 5 }}>
          <TextField
            required
            variant="outlined"
            style={{ width: "100%" }}
            type="file"
          />
        </div>
        <div style={{ width: "100%", marginTop: 5, marginBottom: 5 }}>
          <TextField
            required
            variant="outlined"
            style={{ width: "100%" }}
            type="file"
          />
        </div>
        <div style={{ width: "100%", marginTop: 5, marginBottom: 5 }}>
          <TextField
            required
            variant="outlined"
            style={{ width: "100%" }}
            type="file"
          />
        </div>
        <div style={{ width: "100%", marginTop: 5, marginBottom: 5 }}>
          <TextField
            required
            variant="outlined"
            style={{ width: "100%" }}
            type="file"
          />
        </div>
        <div style={{ width: "100%" }}>
          <TextField
            required
            variant="outlined"
            style={{ width: "100%" }}
            type="file"
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
        >
          อัพโหลด
        </Button>
      </div>
      <div style={{ textAlign: "center" }}>
        <Link to="/">
          <Button
            color="primary"
            variant="contained"
            style={{ width: 150, marginBottom: 10, borderRadius: 10 }}
            startIcon={<Save />}
          >
            บันทึกข้อมูล
          </Button>
        </Link>
      </div>
    </Container>
  )
}
