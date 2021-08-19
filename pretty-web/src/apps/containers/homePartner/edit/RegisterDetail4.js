import React, { useState } from "react"
import PropTypes from "prop-types"
import { Button } from "@material-ui/core"
import { CloudUpload, Save } from "@material-ui/icons"
import { useHistory } from "react-router-dom"
import LinearProgress from "@material-ui/core/LinearProgress"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Cookies from "js-cookie"

import ImageBackground from "../../../components/background"
import Header from "../../../components/header"

import firebase from "../../../../util/firebase"
import { AppConfig } from "../../../../Constants"
import { clearOldFiles } from "../../../../apis"

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

export default function RegisterDetail4() {
  const history = useHistory()
  if (!Cookies.get("logged_in")) {
    window.location.href = ""
  }
  const { profile } = history.location.state

  const [image, setImage] = useState(null)
  const [imageFile1, setImageFile1] = useState(null)
  const [imageFile2, setImageFile2] = useState(null)
  const [imageFile3, setImageFile3] = useState(null)
  const [imageFile4, setImageFile4] = useState(null)
  const [imageFile5, setImageFile5] = useState(null)
  const [imageFile6, setImageFile6] = useState(null)

  const [imageUrl1, setImageUrl1] = useState(profile.imageUrl1 || null)
  const [imageUrl2, setImageUrl2] = useState(profile.imageUrl2 || null)
  const [imageUrl3, setImageUrl3] = useState(profile.imageUrl3 || null)
  const [imageUrl4, setImageUrl4] = useState(profile.imageUrl4 || null)
  const [imageUrl5, setImageUrl5] = useState(profile.imageUrl5 || null)
  const [imageUrl6, setImageUrl6] = useState(profile.imageUrl6 || null)

  const [progress1, setProgress1] = useState(0)
  const [progress2, setProgress2] = useState(0)
  const [progress3, setProgress3] = useState(0)
  const [progress4, setProgress4] = useState(0)
  const [progress5, setProgress5] = useState(0)
  const [progress6, setProgress6] = useState(0)

  const uploadImageVideoToFirebase = async () => {
    if (imageFile1) {
      await clearOldFiles(profile.id + "_pic1")
      await uploadImageAsync(
        imageFile1,
        setImageUrl1,
        true,
        `${profile.id}_pic1`,
        1
      )
    }
    if (imageFile2) {
      await clearOldFiles(profile.id + "_pic2")
      await uploadImageAsync(
        imageFile2,
        setImageUrl2,
        false,
        `${profile.id}_pic2`,
        2
      )
    }
    if (imageFile3) {
      await clearOldFiles(profile.id + "_pic3")
      await uploadImageAsync(
        imageFile3,
        setImageUrl3,
        false,
        `${profile.id}_pic3`,
        3
      )
    }
    if (imageFile4) {
      await clearOldFiles(profile.id + "_pic4")
      await uploadImageAsync(
        imageFile4,
        setImageUrl4,
        false,
        `${profile.id}_pic4`,
        4
      )
    }
    if (imageFile5) {
      await clearOldFiles(profile.id + "_pic5")
      await uploadImageAsync(
        imageFile5,
        setImageUrl5,
        false,
        `${profile.id}_pic5`,
        5
      )
    }
    if (imageFile6) {
      await clearOldFiles(profile.id + "_video")
      await uploadImageAsync(
        imageFile6,
        setImageUrl6,
        false,
        `${profile.id}_video`,
        6
      )
    }
    alert("Upload ข้อมูลเรียบร้อยแล้ว")
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
    if (imageFile1) {
      await firebase
        .database()
        .ref(`${AppConfig.env}/members/${profile.id}`)
        .update({ image: imageUrl1, imageUrl1 })
    }
    if (imageFile2) {
      await firebase
        .database()
        .ref(`${AppConfig.env}/members/${profile.id}`)
        .update({ imageUrl2 })
    }
    if (imageFile3) {
      await firebase
        .database()
        .ref(`${AppConfig.env}/members/${profile.id}`)
        .update({ imageUrl3 })
    }
    if (imageFile4) {
      await firebase
        .database()
        .ref(`${AppConfig.env}/members/${profile.id}`)
        .update({ imageUrl4 })
    }
    if (imageFile5) {
      await firebase
        .database()
        .ref(`${AppConfig.env}/members/${profile.id}`)
        .update({ imageUrl5 })
    }
    if (imageFile6) {
      await firebase
        .database()
        .ref(`${AppConfig.env}/members/${profile.id}`)
        .update({ imageUrl6 })
    }
    const dataToUpdate = {
      memberType: "partner",
      status: AppConfig.MemberStatus.newRegister,
      statusText: AppConfig.MemberStatus.newRegisterMessage,
      status_priority: AppConfig.MemberStatus.newRegisterPriority,
      sys_update_date: new Date().toUTCString()
    }
    await firebase
      .database()
      .ref(`${AppConfig.env}/members/${profile.id}`)
      .update(dataToUpdate)
    alert(
      "ลงทะเบียนเรียบร้อย รออนุมัติ ! กรุณาติดต่อ Admin ทางไลน์@ เพื่อนทำการยืนยันตัวตนอีกครั้ง"
    )
    window.location.href = "https://lin.ee/8f5kP3x"
    history.push("/", {})
  }

  return (
    <ImageBackground>
      <Header profile={profile} />
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
          {profile.imageUrl1 && (
            <img
              src={profile.imageUrl1}
              style={{ width: "auto", height: 100 }}
              alt=""
            />
          )}
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
          {profile.imageUrl2 && (
            <img
              src={profile.imageUrl2}
              style={{ width: "auto", height: 100 }}
              alt=""
            />
          )}
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
          {profile.imageUrl3 && (
            <img
              src={profile.imageUrl3}
              style={{ width: "auto", height: 100 }}
              alt=""
            />
          )}
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
          {profile.imageUrl4 && (
            <img
              src={profile.imageUrl4}
              style={{ width: "auto", height: 100 }}
              alt=""
            />
          )}
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
          {profile.imageUrl5 && (
            <img
              src={profile.imageUrl5}
              style={{ width: "auto", height: 100 }}
              alt=""
            />
          )}
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
          {profile.imageUrl6 && (
            <img
              src={profile.imageUrl6}
              style={{ width: "auto", height: 100 }}
              alt=""
            />
          )}
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
      <div align="center">
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
    </ImageBackground>
  )
}
