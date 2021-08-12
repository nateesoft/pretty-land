import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import Moment from "moment"
import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: "80vh"
  }
}))

export default function Members(props) {
  const classes = useStyles()
  const history = useHistory()
  const { members, items } = props

  const loadMemberDetail = (profile) => {
    history.push("/member-profile", { profile })
  }

  const getPartnerTypeFromFirebase = (member) => {
    if (member.memberType === "partner") {
      const listType = [[]]
      if (member.type1) {
        listType.push(items[0].name)
      }
      if (member.type2) {
        listType.push(items[1].name)
      }
      if (member.type3) {
        listType.push(items[2].name)
      }
      if (member.type4) {
        listType.push(items[3].name)
      }
      return listType.toString()
    }
    return member.memberType
  }

  return (
    <List className={classes.root}>
      {members &&
        members.map((item, index) => (
          <ListItem onClick={() => loadMemberDetail(item)}>
            <ListItemAvatar>
              <Avatar src={item.image} alt="" />
            </ListItemAvatar>
            <ListItemText
              primary={`ชื่อ: ${item.username}`}
              secondary={`งานที่สมัคร: ${getPartnerTypeFromFirebase(
                item
              )} วันที่: ${Moment(item.sys_create_date).format("DD/MM/YYYY")}`}
              style={{ color: "blue" }}
            />
          </ListItem>
        ))}
    </List>
  )
}
