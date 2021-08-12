import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { Link } from "react-router-dom"

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  media: {
    height: 350,
    margin: 10,
    borderRadius: 35
  }
})

export default function ProfileHeader(props) {
  const { profile } = props
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={profile.image}
          title="Contemplative Reptile"
        />
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
            {profile.stature}
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
