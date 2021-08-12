import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import ImageList from "@material-ui/core/ImageList"
import ImageListItem from "@material-ui/core/ImageListItem"

import ProfileHeader from "./ProfileHeader"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 500,
    height: 450
  }
}))

export default function BasicImageList(props) {
  const { profile } = props
  const classes = useStyles()

  return (
    <div style={{ height: "500px", overflow: "auto" }}>
      <div className={classes.root}>
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
