import React from "react"
import { Backdrop } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import CircularProgress from "@material-ui/core/CircularProgress"

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}))

export default function Loading(props) {
  const classes = useStyles()

  return (
    <Backdrop className={classes.backdrop} open={props.loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
