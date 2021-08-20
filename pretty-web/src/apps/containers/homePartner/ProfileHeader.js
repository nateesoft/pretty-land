import React from "react"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Badge from "@material-ui/core/Badge"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { Link } from "react-router-dom"
import NumberFormat from "react-number-format"

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""'
    }
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0
    }
  }
}))(Badge)

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  media: {
    height: 350,
    margin: 10,
    borderRadius: 15
  }
})

export default function ProfileHeader(props) {
  const { profile } = props
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <div align="center">
          <StyledBadge
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            variant="dot"
          >
            <Avatar
              alt={profile.name}
              src={profile.image}
              style={{ width: 100, height: 100, marginTop: 10 }}
            />
          </StyledBadge>
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {profile.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            เพศ{" "}
            {profile.gender === "male"
              ? "ชาย"
              : profile.gender === "female"
              ? "หญิง"
              : "อื่นๆ"}{" "}
            | สูง {profile.height} | นิสัย {profile.charactor}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="span">
            สัดส่วน:{" "}
            <NumberFormat
              format="##-##-##"
              value={profile.stature}
              displayType="text"
            />
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          โทร: {profile.mobile}
        </Button>
        <Button size="small" color="primary">
          Line: {profile.lineId}
        </Button>
        <Link
          to={{ pathname: "https://lin.ee/8f5kP3x" }}
          target="_blank"
          style={{
            textDecoration: "none",
            backgroundColor: "green",
            borderRadius: 5,
            padding: 5
          }}
        >
          <Button size="small" color="primary" style={{ color: "white" }}>
            ติดต่อ @Admin
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}
