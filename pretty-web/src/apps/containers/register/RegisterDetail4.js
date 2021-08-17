import React, { useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Button } from "@material-ui/core"
import { CloudUpload, Save } from "@material-ui/icons"
import { useHistory } from "react-router-dom"
import uuid from "react-uuid"
import LinearProgress from "@material-ui/core/LinearProgress"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

import Header from "../../components/header"
import ImageBackground from "../../components/background"

import firebase from "../../../util/firebase"
import * as ApiControl from "../../../apis"
import { AppConfig } from "../../../Constants"

const userId = uuid()
function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  )
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired
}

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

  const [progress1, setProgress1] = useState(0)
  const [progress2, setProgress2] = useState(0)
  const [progress3, setProgress3] = useState(0)
  const [progress4, setProgress4] = useState(0)
  const [progress5, setProgress5] = useState(0)
  const [progress6, setProgress6] = useState(0)

  const [showSave, setShowSave] = useState(false)

  const uploadImageVideoToFirebase = async () => {
    if (
      !imageFile1 ||
      !imageFile2 ||
      !imageFile3 ||
      !imageFile4 ||
      !imageFile5 ||
      !imageFile6
    ) {
      alert("กรุณาเพิ่มรูปให้ครบ 5 รูป และวิดีโอ 1 คลิป ก่อนบันทึกข้อมูล !!!")
      return
    }
    if (imageFile1) {
      await uploadImageAsync(
        imageFile1,
        setImageUrl1,
        true,
        `${userId}_pic1`,
        1
      )
    }
    if (imageFile2) {
      await uploadImageAsync(
        imageFile2,
        setImageUrl2,
        false,
        `${userId}_pic2`,
        2
      )
    }
    if (imageFile3) {
      await uploadImageAsync(
        imageFile3,
        setImageUrl3,
        false,
        `${userId}_pic3`,
        3
      )
    }
    if (imageFile4) {
      await uploadImageAsync(
        imageFile4,
        setImageUrl4,
        false,
        `${userId}_pic4`,
        4
      )
    }
    if (imageFile5) {
      await uploadImageAsync(
        imageFile5,
        setImageUrl5,
        false,
        `${userId}_pic5`,
        5
      )
    }
    if (imageFile6) {
      await uploadImageAsync(
        imageFile6,
        setImageUrl6,
        false,
        `${userId}_video`,
        6
      )
    }

    alert("Upload ข้อมูลเรียบร้อยแล้ว")
    setShowSave(true)
  }

  const uploadImageAsync = (
    imageSource,
    updateUrl,
    isProfile,
    fileName,
    index
  ) => {
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
          if (index === 1) {
            setProgress1(progress)
          } else if (index === 2) {
            setProgress2(progress)
          } else if (index === 3) {
            setProgress3(progress)
          } else if (index === 4) {
            setProgress4(progress)
          } else if (index === 5) {
            setProgress5(progress)
          } else if (index === 6) {
            setProgress6(progress)
          }
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

  const fixSize = 4
  const checkFileSizeValid = (file, setImageFile, input) => {
    const sizeTotal = file.size / (1024 * 1024)
    if (sizeTotal > fixSize) {
      alert("กรุณาอัพโหลด ไฟล์ภาพ หรือ video ไม่เกิน 4mb !!!")
      input.target.value = ""
      return
    }
    setImageFile(file)
  }

  const saveDataToDatabase = async () => {
    if (
      !imageUrl1 ||
      !imageUrl2 ||
      !imageUrl3 ||
      !imageUrl4 ||
      !imageUrl5 ||
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
      imageUrl6,
      memberType: "partner",
      status: AppConfig.MemberStatus.newRegister,
      statusText: AppConfig.MemberStatus.newRegisterMessage,
      status_priority: AppConfig.MemberStatus.newRegisterPriority,
      sys_create_date: new Date().toUTCString(),
      sys_update_date: new Date().toUTCString()
    }

    const result = await ApiControl.saveNewPartner(newData)
    if (result) {
      alert(
        "ลงทะเบียนเรียบร้อย รออนุมัติ ! กรุณาติดต่อ Admin ทางไลน์@ เพื่อนทำการยืนยันตัวตนอีกครั้ง"
      )
      window.location.href = "https://lin.ee/8f5kP3x"
      history.push("/", {})
    } else {
      alert("ไม่สามารถบันทึกข้อมูลได้")
    }
  }

  return (
    <ImageBackground>
      <Header hideBack />
      <div align="center" style={{ marginTop: 65 }}>
        <h3>เพิ่ม/แก้ไข รูปภาพ และวิดีโอ</h3>
        <div>Insert an image/ Video</div>
      </div>
      <div style={{ marginBottom: 10, paddingRight: 10, paddingLeft: 10 }}>
        <div style={{ padding: 10 }}>
          <label htmlFor="file1">รูปที่ 1</label>
          <input
            id="file1"
            accept="image/jpeg"
            style={{ width: "100%", margin: 5 }}
            type="file"
            onChange={(e) =>
              checkFileSizeValid(e.target.files[0], setImageFile1, e)
            }
          />
          <LinearProgressWithLabel value={progress1} />
          <img src={imageUrl1} alt="" style={{ width: 100, height: "auto" }} />
        </div>
        <div style={{ padding: 10 }}>
          <label htmlFor="file2">รูปที่ 2</label>
          <input
            id="file2"
            accept="image/jpeg"
            style={{ width: "100%", margin: 5 }}
            type="file"
            onChange={(e) =>
              checkFileSizeValid(e.target.files[0], setImageFile2, e)
            }
          />
          <LinearProgressWithLabel value={progress2} />
          <img src={imageUrl2} alt="" style={{ width: 100, height: "auto" }} />
        </div>
        <div style={{ padding: 10 }}>
          <label htmlFor="file3">รูปที่ 3</label>
          <input
            id="file3"
            accept="image/jpeg"
            style={{ width: "100%", margin: 5 }}
            type="file"
            onChange={(e) =>
              checkFileSizeValid(e.target.files[0], setImageFile3, e)
            }
          />
          <LinearProgressWithLabel value={progress3} />
          <img src={imageUrl3} alt="" style={{ width: 100, height: "auto" }} />
        </div>
        <div style={{ padding: 10 }}>
          <label htmlFor="file4">รูปที่ 4</label>
          <input
            id="file4"
            accept="image/jpeg"
            style={{ width: "100%", margin: 5 }}
            type="file"
            onChange={(e) =>
              checkFileSizeValid(e.target.files[0], setImageFile4, e)
            }
          />
          <LinearProgressWithLabel value={progress4} />
          <img src={imageUrl4} alt="" style={{ width: 100, height: "auto" }} />
        </div>
        <div style={{ padding: 10 }}>
          <label htmlFor="file5">รูปที่ 5</label>
          <input
            id="file5"
            accept="image/jpeg"
            style={{ width: "100%", margin: 5 }}
            type="file"
            onChange={(e) =>
              checkFileSizeValid(e.target.files[0], setImageFile5, e)
            }
          />
          <LinearProgressWithLabel value={progress5} />
          <img src={imageUrl5} alt="" style={{ width: 100, height: "auto" }} />
        </div>
        <div style={{ padding: 10 }}>
          <label htmlFor="file6">เลือก VIDEO</label>
          <input
            id="file6"
            accept="video/mp4,video/x-m4v,video/*"
            style={{ width: "100%", margin: 5 }}
            type="file"
            onChange={(e) =>
              checkFileSizeValid(e.target.files[0], setImageFile6, e)
            }
          />
          <LinearProgressWithLabel value={progress6} />
        </div>
      </div>
      <div
        style={{
          backgroundColor: "red",
          color: "white",
          padding: 10,
          margin: 10,
          width: "80%",
          fontSize: 12,
          opacity: "0.7"
        }}
      >
        <span style={{ fontWeight: "bold", textDecoration: "underline" }}>
          คำแนะนำ:
        </span>{" "}
        <br />
        - กรุณาถ่ายคลิป Video ไม่ควรเกิน 10 วิ
        <br />- รูปภาพที่อัพโหลดไม่ควรเกิน 4 mb
      </div>
      {!showSave && (
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
      )}
      {showSave && (
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
      )}
    </ImageBackground>
  )
}
