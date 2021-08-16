import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 999
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold",
    fontSize: 22,
    fontStyle: "italic"
  }
}))

export default function Header(props) {
  const history = useHistory()
  const { hideBack } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#ff32ee" }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <img src="logo.png" alt="" style={{ width: 32, height: 32 }} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Pretty Land
          </Typography>
          {!hideBack && (
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => history.goBack()}
            >
              Back
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}
