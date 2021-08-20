import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Rating from "@material-ui/lab/Rating"
import Typography from "@material-ui/core/Typography"
import { CheckCircleOutline } from "@material-ui/icons"
import ImageList from "@material-ui/core/ImageList"
import ImageListItem from "@material-ui/core/ImageListItem"
import ImageListItemBar from "@material-ui/core/ImageListItemBar"
import IconButton from "@material-ui/core/IconButton"
import InfoIcon from "@material-ui/icons/PhotoSizeSelectActual"
import ReactPlayer from "react-player"
import NumberFormat from "react-number-format"
import Cookies from "js-cookie"
import { Button } from "@material-ui/core"

import Header from "../../../components/header"
import ImageBackground from "../../../components/background"

import { AppConfig } from "../../../../Constants"
import firebase from "../../../../util/firebase"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  imageList: {
    width: 500,
    height: 450
  },
  icon: {
    color: "pink"
  }
}))

export default function Type4ProfileReview() {
  const classes = useStyles()
  const history = useHistory()
  if (!Cookies.get("logged_in")) {
    window.location.href = ""
  }
  const {
    partnerProfile,
    customerProfile,
    province,
    partnerRequest,
    partnerType
  } = history.location.state

  const [selectStatus, setSelectStatus] = useState("")
  const [starCount, setStarCount] = useState(0)

  const onPressSelectPartner = () => {
    history.push("/time-price-form", {
      customerProfile,
      partnerProfile,
      province,
      partnerRequest,
      partnerType
    })
  }

  const getStarFromPosts = () => {
    return new Promise((resolve, reject) => {
      const ref = firebase
        .database()
        .ref(`${AppConfig.env}/partner_star/${partnerProfile.id}`)
      ref.once("value", (snapshot) => {
        const data = { ...snapshot.val() }
        let count = 0
        let starTotal = 0
        for (let key in data) {
          count += 1
          const obj = data[key]
          starTotal += obj.star
        }
        if (starTotal === 0 && count === 0) {
          setStarCount(0)
        } else {
          setStarCount(starTotal / count)
        }
        resolve(true)
      })
    })
  }

  useEffect(() => {
    firebase
      .database()
      .ref(`${AppConfig.env}/members/${partnerProfile.id}`)
      .once("value", (snapshot) => {
        getStarFromPosts().then((res) => {
          console.log(res)
        })
      })
  }, [])

  return (
    <ImageBackground>
      <Header profile={customerProfile} />
      <div
        align="center"
        style={{
          marginTop: 60,
          padding: 10,
          backgroundColor: "#ff32ee",
          fontWeight: "bold",
          verticalAlign: "center",
          color: "white",
          fontSize: 24
        }}
      >
        รายละเอียดข้อมูลน้อง ๆ
      </div>
      <div
        align="center"
        style={{
          padding: 10,
          margin: 10,
          border: "3px solid pinks",
          borderRadius: 25
        }}
      >
        <div style={{ color: "blue" }}>ชื่อ: {partnerProfile.name}</div>
        <div>
          สัดส่วน:{" "}
          <NumberFormat
            format="##-##-##"
            value={partnerProfile.stature}
            displayType="text"
          />
        </div>
        <div>
          น้ำหนัก: {partnerProfile.weight} สูง: {partnerProfile.height}
        </div>
        <div>ราคาที่เสนอ: {partnerProfile.price4}</div>
      </div>
      <div
        align="center"
        style={{
          backgroundColor: "black",
          color: "white",
          padding: 10,
          margin: 10,
          borderRadius: 15
        }}
      >
        <Typography component="legend">{starCount.toFixed(2)}</Typography>
        <Typography component="legend">คะแนนสะสมเฉลี่ย</Typography>
        <Rating value={starCount} readOnly={true} />
      </div>
      {selectStatus !== AppConfig.PostsStatus.customerConfirm && (
        <div align="center" style={{ margin: 10 }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#ff2fe6",
              color: "white",
              borderRadius: 25
            }}
            startIcon={<CheckCircleOutline />}
            onClick={onPressSelectPartner}
          >
            เลือกคนนี้
          </Button>
        </div>
      )}
      <div align="center">
        <ImageList rowHeight={450} cols={2}>
          <ImageListItem cols={2} style={{ textAlign: "center" }}>
            <img
              src={partnerProfile.imageUrl1}
              style={{ height: "100%", width: "auto", borderRadius: 10 }}
              alt={""}
            />
            <ImageListItemBar
              title="รูปที่ 1"
              actionIcon={
                <IconButton
                  aria-label={`info about ${partnerProfile.name}`}
                  className={classes.icon}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
          <ImageListItem cols={2} style={{ textAlign: "center" }}>
            <img
              src={partnerProfile.imageUrl2}
              style={{ height: "100%", width: "auto", borderRadius: 10 }}
              alt={""}
            />
            <ImageListItemBar
              title="รูปที่ 2"
              actionIcon={
                <IconButton
                  aria-label={`info about ${partnerProfile.name}`}
                  className={classes.icon}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
          <ImageListItem cols={2} style={{ textAlign: "center" }}>
            <img
              src={partnerProfile.imageUrl3}
              style={{ height: "100%", width: "auto", borderRadius: 10 }}
              alt={""}
            />
            <ImageListItemBar
              title="รูปที่ 3"
              actionIcon={
                <IconButton
                  aria-label={`info about ${partnerProfile.name}`}
                  className={classes.icon}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
          <ImageListItem cols={2} style={{ textAlign: "center" }}>
            <img
              src={partnerProfile.imageUrl4}
              style={{ height: "100%", width: "auto", borderRadius: 10 }}
              alt={""}
            />
            <ImageListItemBar
              title="รูปที่ 4"
              actionIcon={
                <IconButton
                  aria-label={`info about ${partnerProfile.name}`}
                  className={classes.icon}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
          <ImageListItem cols={2} style={{ textAlign: "center" }}>
            <img
              src={partnerProfile.imageUrl5}
              style={{ height: "100%", width: "auto", borderRadius: 10 }}
              alt={""}
            />
            <ImageListItemBar
              title="รูปที่ 5"
              actionIcon={
                <IconButton
                  aria-label={`info about ${partnerProfile.name}`}
                  className={classes.icon}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        </ImageList>
      </div>
      <div>
        {partnerProfile.imageUrl6 && (
          <div align="center" style={{ margin: 10 }}>
            <ReactPlayer url={partnerProfile.imageUrl6} width={300} controls />
          </div>
        )}
      </div>
    </ImageBackground>
  )
}
