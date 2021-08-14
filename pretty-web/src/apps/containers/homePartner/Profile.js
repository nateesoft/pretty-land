import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import ImageList from "@material-ui/core/ImageList"
import ImageListItem from "@material-ui/core/ImageListItem"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import ReactPlayer from "react-player"
import Button from "@material-ui/core/Button"
import EditIcon from "@material-ui/icons/Edit"
import InfoIcon from "@material-ui/icons/PhotoSizeSelectActual"
import { useHistory } from "react-router-dom"
import ImageListItemBar from "@material-ui/core/ImageListItemBar"
import IconButton from "@material-ui/core/IconButton"

import { getProvinceName, getBankName } from "../../../data/apis"
import ProfileHeader from "./ProfileHeader"
import IOSSwitch from "./iosSwitch"
import { updateWorkingStatus } from "../../../apis"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: theme.palette.background.paper
  },
  imageList: {
    width: 500,
    height: 450
  }
}))

export default function Profile(props) {
  const history = useHistory()
  const { profile } = props
  const classes = useStyles()
  const [checked, setChecked] = useState(false)
  const [images, setImages] = useState([])

  const handleStatus = (evt) => {
    updateWorkingStatus(profile.id, !evt.target.checked)
    setChecked(evt.target.checked)
  }

  useEffect(() => {
    const list = []
    list.push({
      id: 1,
      url: profile.imageUrl1,
      title: "รูปที่ 1"
    })
    list.push({
      id: 2,
      url: profile.imageUrl2,
      title: "รูปที่ 2"
    })
    list.push({
      id: 3,
      url: profile.imageUrl3,
      title: "รูปที่ 3"
    })
    list.push({
      id: 4,
      url: profile.imageUrl4,
      title: "รูปที่ 4"
    })
    list.push({
      id: 5,
      url: profile.imageUrl5,
      title: "รูปที่ 5"
    })
    setImages(list)
  }, [profile])

  useEffect(() => {
    if (profile) {
      setChecked(profile.work_status === "available")
    }
  }, [profile])

  const handleNext = () => {
    history.push("/partner-edit-form", { profile })
  }

  const getProvinceNameShow = (p) => {
    if (p.province) {
      return getProvinceName(p.province)[0]
    }
    return ""
  }
  const getBankNameShow = (p) => {
    if (p.bank) {
      return getBankName(p.bank)[0].label
    }
    return ""
  }

  return (
    <div style={{ height: "500px", overflow: "auto" }}>
      <div className={classes.root}>
        <FormControlLabel
          control={
            <IOSSwitch
              checked={checked}
              onChange={handleStatus}
              name="checked"
            />
          }
          label={checked ? "พร้อมรับงาน" : "ไม่ว่าง"}
        />
        <Button
          variant="outlined"
          size="small"
          startIcon={<EditIcon />}
          onClick={() => handleNext()}
        >
          แก้ไขข้อมูล
        </Button>
        <ProfileHeader profile={profile} />
        <ImageList rowHeight={450} className={classes.imageList} cols={2}>
          {images &&
            images.map((item, index) => (
              <ImageListItem cols={2} key={item.id}>
                <img
                  src={profile.imageUrl1}
                  style={{ height: "100%" }}
                  alt={""}
                />
                <ImageListItemBar
                  title={item.title}
                  subtitle={
                    <span>
                      น้อง: {profile.name} | {profile.charactor} |{" "}
                      {getProvinceNameShow(profile)}
                    </span>
                  }
                  actionIcon={
                    <IconButton
                      aria-label={`info about ${item.title}`}
                      className={classes.icon}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
        </ImageList>
        {profile.imageUrl6 && (
          <div align="center" style={{ margin: 10 }}>
            <ReactPlayer url={profile.imageUrl6} width={300} controls />
          </div>
        )}
      </div>
    </div>
  )
}
