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

const formatStature = (data) => {
  return data.substr(0, 2) + "-" + data.substr(2, 2) + "-" + data.substr(4, 2)
}

export default function ProfileHeader(props) {
  const { profile } = props
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {/* <CardMedia
          className={classes.media}
          image={profile.image}
          title="Contemplative Reptile"
        /> */}
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
              style={{ width: 128, height: 128 }}
            />
          </StyledBadge>
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {profile.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            เพศ{" "}
            {profile.sex === "male"
              ? "ชาย"
              : profile.sex === "female"
              ? "หญิง"
              : "อื่นๆ"}{" "}
            | สูง {profile.height} | นิสัย {profile.charactor} | สัดส่วน{" "}
            {formatStature(profile.stature)}
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
