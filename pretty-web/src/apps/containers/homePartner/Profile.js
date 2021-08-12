import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import ImageList from "@material-ui/core/ImageList"
import ImageListItem from "@material-ui/core/ImageListItem"
import FormControlLabel from "@material-ui/core/FormControlLabel"

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
  const { profile } = props
  console.log("id:", profile.id, profile.work_status)
  const classes = useStyles()
  const [checked, setChecked] = useState(false)

  const handleStatus = (evt) => {
    updateWorkingStatus(profile.id, !evt.target.checked)
    setChecked(evt.target.checked)
  }

  useEffect(() => {
    if (profile) {
      setChecked(profile.work_status === "available")
    }
  }, [profile])

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
        <ProfileHeader profile={profile} />
        <ImageList rowHeight={450} className={classes.imageList} cols={2}>
          {profile.imageUrl1 && (
            <ImageListItem cols={2}>
              <img
                src={profile.imageUrl1}
                style={{ height: "100%" }}
                alt={""}
              />
            </ImageListItem>
          )}
          {profile.imageUrl2 && (
            <ImageListItem cols={2}>
              <img
                src={profile.imageUrl2}
                style={{ height: "100%" }}
                alt={""}
              />
            </ImageListItem>
          )}
          {profile.imageUrl3 && (
            <ImageListItem cols={2}>
              <img
                src={profile.imageUrl3}
                style={{ height: "100%" }}
                alt={""}
              />
            </ImageListItem>
          )}
          {profile.imageUrl4 && (
            <ImageListItem cols={2}>
              <img
                src={profile.imageUrl4}
                style={{ height: "100%" }}
                alt={""}
              />
            </ImageListItem>
          )}
          {profile.imageUrl5 && (
            <ImageListItem cols={2}>
              <img
                src={profile.imageUrl5}
                style={{ height: "100%" }}
                alt={""}
              />
            </ImageListItem>
          )}
        </ImageList>
      </div>
    </div>
  )
}
