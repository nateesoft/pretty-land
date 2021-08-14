import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import ImageList from "@material-ui/core/ImageList"
import ImageListItem from "@material-ui/core/ImageListItem"
import itemData from "./itemData"

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
  }
}))

export default function BasicImageList(props) {
  const { images } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ImageList rowHeight={160} className={classes.imageList} cols={3}>
        {images &&
          images.map((item) => (
            <ImageListItem key={item.img} cols={item.cols || 1}>
              <img src={item.img} alt={item.title} />
            </ImageListItem>
          ))}
      </ImageList>
    </div>
  )
}
