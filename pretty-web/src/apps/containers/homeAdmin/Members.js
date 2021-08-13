import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import Moment from "moment"
import { useHistory } from "react-router-dom"
import { AppConfig } from "../../../Constants"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: window.innerHeight - 120
  }
}))

export default function Members(props) {
  const classes = useStyles()
  const history = useHistory()
  const { members, items } = props

  const loadMemberDetail = (profile) => {
    history.push("/member-profile", {
      profile,
      mode: getPartnerTypeFromFirebase(profile)
    })
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
      {members.length === 0 && (
        <div align="center">ไม่พบข้อมูลสมาชิกในระบบ</div>
      )}
      {members &&
        members.map((item, index) => (
          <ListItem key={item.id} onClick={() => loadMemberDetail(item)}>
            <ListItemAvatar>
              <Avatar
                src={item.image}
                alt=""
                variant="circle"
                style={{ width: 64, height: 64}}
              />
            </ListItemAvatar>
            <div
              style={{
                border: "2px solid #eee",
                padding: 10,
                width: "100%",
                borderRadius: 10,
                marginLeft: 5,
              }}
            >
              <div style={{color: 'blue'}}>ชื่อ: {item.username}</div>
              <div>งานที่สมัคร: {getPartnerTypeFromFirebase(item)}</div>
              <div>
                วันที่:{" "}
                {Moment(item.sys_create_date).format("DD/MM/YYYY HH:mm:ss")}
              </div>
              {item.status === AppConfig.MemberStatus.newRegister && (
                <div
                  style={{
                    backgroundColor: "#b61e98",
                    color: "white",
                    padding: 3,
                    borderRadius: 5
                  }}
                >
                  สถานะ: {item.statusText}
                </div>
              )}
              {item.status !== AppConfig.MemberStatus.newRegister && (
                <div>สถานะ: {item.statusText}</div>
              )}
            </div>
          </ListItem>
        ))}
    </List>
  )
}
