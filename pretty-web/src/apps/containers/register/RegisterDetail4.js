import React, { useState } from "react"

import styled from "styled-components"
import { Button } from "@material-ui/core"
import { CloudUpload, Save } from "@material-ui/icons"
import { useHistory } from "react-router-dom"
import uuid from "react-uuid"

import firebase from "../../../util/firebase"
import * as ApiControl from "../../../apis"
import { AppConfig } from "../../../Constants"

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
  const userId = uuid()
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
    mobile,
    province,
    district,
    address,
    bank,
    bankNo
  } = history.location.state

  const [image, setImage] = useState(null)
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

  const uploadImageVideoToFirebase = async () => {
    if (
      !imageFile1 &&
      !imageFile2 &&
      !imageFile3 &&
      !imageFile4 &&
      !imageFile5 &&
      !imageFile6
    ) {
      alert("กรุณาเพิ่มรูปให้ครบ 5 รูป และวิดีโอ 1 คลิป ก่อนบันทึกข้อมูล !!!")
      return
    }
    if (imageFile1) {
      await uploadImageAsync(imageFile1, setImageUrl1, true, `${userId}_pic1`)
    }
    if (imageFile2) {
      await uploadImageAsync(imageFile2, setImageUrl2, false, `${userId}_pic2`)
    }
    if (imageFile3) {
      await uploadImageAsync(imageFile3, setImageUrl3, false, `${userId}_pic3`)
    }
    if (imageFile4) {
      await uploadImageAsync(imageFile4, setImageUrl4, false, `${userId}_pic4`)
    }
    if (imageFile5) {
      await uploadImageAsync(imageFile5, setImageUrl5, false, `${userId}_pic5`)
    }
    if (imageFile6) {
      await uploadImageAsync(imageFile6, setImageUrl6, false, `${userId}_video`)
    }
  }

  const uploadImageAsync = (imageSource, updateUrl, isProfile, fileName) => {
    return new Promise((resolve, reject) => {
      const storage = firebase.storage()
      const storageRef = storage.ref(
        `${AppConfig.env}/images/member/partner/${fileName}`
      )
      const uploadTask = storageRef.put(imageSource)
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          const progress =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log("progress:", progress)
        },
        (err) => {
          console.log("upload failure:", err)
          resolve(false)
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            updateUrl(url)
            if (isProfile) {
              setImage(url)
            }
            resolve(true)
          })
        }
      )
    })
  }

  const saveDataToDatabase = async () => {
    if (
      !imageUrl1 &&
      !imageUrl2 &&
      !imageUrl3 &&
      !imageUrl4 &&
      !imageUrl5 &&
      !imageUrl6
    ) {
      alert("กรุณาเพิ่มรูปให้ครบ 5 รูป และวิดีโอ 1 คลิป ก่อนบันทึกข้อมูล !!!")
      return
    }

    const newData = {
      userId,
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
      mobile,
      province,
      district,
      address,
      bank,
      bankNo,
      image,
      imageUrl1,
      imageUrl2,
      imageUrl3,
      imageUrl4,
      imageUrl5,
      imageUrl6
    }
    const result = await ApiControl.saveNewPartner(newData)
    if (result) {
      history.push("/", {})
    } else {
      alert("ไม่สามารถบันทึกข้อมูลได้")
    }
  }

  return (
    <Container>
      <div align="center">
        <h3>เพิ่ม/แก้ไข รูปภาพ และวิดีโอ</h3>
        <div>Insert an image/ Video</div>
      </div>
      <div style={{ marginBottom: 10, paddingRight: 10, paddingLeft: 10 }}>
        <div style={{ width: "100%", margin: 10, padding: 10 }}>
          <input
            accept="image/jpeg"
            style={{ width: "100%", margin: 5 }}
            type="file"
            onChange={(e) => setImageFile1(e.target.files[0])}
          />
          <input
            accept="image/jpeg"
            style={{ width: "100%", margin: 5 }}
            type="file"
            onChange={(e) => setImageFile2(e.target.files[0])}
          />
          <input
            accept="image/jpeg"
            style={{ width: "100%", margin: 5 }}
            type="file"
            onChange={(e) => setImageFile3(e.target.files[0])}
          />
          <input
            accept="image/jpeg"
            style={{ width: "100%", margin: 5 }}
            type="file"
            onChange={(e) => setImageFile4(e.target.files[0])}
          />
          <input
            accept="image/jpeg"
            style={{ width: "100%", margin: 5 }}
            type="file"
            onChange={(e) => setImageFile5(e.target.files[0])}
          />
          <input
            accept="video/mp4,video/x-m4v,video/*"
            style={{ width: "100%", margin: 5 }}
            type="file"
            onChange={(e) => setImageFile6(e.target.files[0])}
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
