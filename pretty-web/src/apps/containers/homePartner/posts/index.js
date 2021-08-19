import React, { useEffect, useState } from "react"
import Moment from "moment"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import { useHistory } from "react-router-dom"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"

import ImageBackground from "../../../components/background"
import Header from "../../../components/header"

import { getCountryList } from "../../../../data/apis"
import { AppConfig } from "../../../../Constants"
import firebase from "../../../../util/firebase"
import { snapshotToArray } from "../../../../util"
import { updatePosts } from "../../../../apis"

export default function CustomerPosts(props) {
  const [filterList, setFilterList] = useState([])
  const history = useHistory()
  const { partnerType, profile, partnerTypeNme } = history.location.state

  const [province, setProvince] = useState("")
  const [provinceList] = useState(getCountryList())

  const registerThisPost = (item) => {
    return new Promise((resolve, reject) => {
      const listItem = item.partnerSelect
      let foundPost = false
      for (let key in listItem) {
        if (key === profile.id) {
          foundPost = true
        }
      }
      resolve(foundPost)
    })
  }

  const onChangeProvinceSelect = async (value) => {
    setProvince(value)
    await getFilterPostByProvince(value)
  }

  const onPressOptions = (item) => {
    registerThisPost(item).then((res) => {
      if (res) {
        history.push("/partner-request-Detail", { item, profile })
      } else {
        history.push("/partner-customer-post-detail", { item, profile })
      }
    })
  }

  const getFilterPostByProvince = (provinceSelect) => {
    return new Promise((resolve, reject) => {
      let ref = firebase.database().ref(`${AppConfig.env}/posts`)
      if (provinceSelect !== "") {
        ref = ref.orderByChild("province").equalTo(provinceSelect)
      }
      ref.once("value", (snapshot) => {
        const postsList = snapshotToArray(snapshot)
        let listData = postsList.filter((item, index) => {
          if (
            item.partnerType === partnerType &&
            item.sexTarget === profile.gender
          ) {
            if (
              item.status !== AppConfig.PostsStatus.notApprove &&
              item.status !== AppConfig.PostsStatus.customerCancelPost &&
              item.status !== AppConfig.PostsStatus.closeJob &&
              item.status !== AppConfig.PostsStatus.waitAdminConfirmPayment &&
              item.status !== AppConfig.PostsStatus.postTimeout
            ) {
              const date1 = Moment()
              const date2 = Moment(item.sys_update_date)
              const diffHours = date1.diff(date2, "hours")

              if (item.status === AppConfig.PostsStatus.customerNewPostDone) {
                if (diffHours <= 24) {
                  if (item.partnerType === partnerType) {
                    return item
                  }
                } else {
                  // update timeout
                  updatePosts(item.id, {
                    status: AppConfig.PostsStatus.postTimeout,
                    statusText: "ข้อมูลการโพสท์ใหม่หมดอายุ",
                    sys_update_date: new Date().toUTCString()
                  })
                }
              } else if (
                item.status === AppConfig.PostsStatus.adminConfirmNewPost
              ) {
                if (diffHours <= 2) {
                  if (item.partnerType === partnerType) {
                    return item
                  }
                } else {
                  // update timeout
                  updatePosts(item.id, {
                    status: AppConfig.PostsStatus.postTimeout,
                    statusText:
                      "ข้อมูลการโพสท์หมดอายุ หลังจากอนุมัติเกิน 2 ชั่วโมง",
                    sys_update_date: new Date().toUTCString()
                  })
                }
              } else {
                if (item.partnerType === partnerType) {
                  return item
                }
              }
            }
          }
        })
        setFilterList(listData)
        resolve(true)
      })
    })
  }

  useEffect(() => {
    getFilterPostByProvince("").then()
  }, [])

  return (
    <ImageBackground>
      <Header profile={profile} />
      <div
        align="center"
        style={{
          backgroundColor: "#ff2fe6",
          padding: 10,
          fontSize: 22,
          fontWeight: "bold",
          color: "white",
          marginTop: 55
        }}
      >
        โพสท์ทั้งหมดในระบบ
      </div>
      <div align="center">
        <div
          style={{ backgroundColor: "chocolate", padding: 5, color: "white" }}
        >
          โหมด: {partnerTypeNme}
        </div>
        <div
          align="center"
          style={{
            fontSize: 16,
            color: "gray",
            fontWeight: "bold",
            marginTop: 10
          }}
        >
          เลือกจังหวัดสำหรับค้นหาโพสท์
        </div>

        <FormControl variant="outlined" style={{ width: 350, marginTop: 10 }}>
          <InputLabel id="demo-simple-select-outlined-label">
            จังหวัด
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={province}
            onChange={(e) => onChangeProvinceSelect(e.target.value)}
            label="จังหวัด"
            displayEmpty
          >
            <MenuItem value="">
              <em>-- ทั่วประเทศ --</em>
            </MenuItem>
            {provinceList.map((item, index) => (
              <MenuItem value={item.value} key={item.label + index}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {filterList &&
        filterList.map((item, index) => (
          <ListItem key={item.id} onClick={() => onPressOptions(item)}>
            <ListItemAvatar>
              <Avatar
                src={item.partnerImage}
                alt=""
                variant="circular"
                style={{ width: 64, height: 64 }}
              />
            </ListItemAvatar>
            <div
              style={{
                border: "2px solid #eee",
                padding: 10,
                width: "100%",
                borderRadius: 10,
                marginLeft: 5
              }}
            >
              <div>จำนวนน้องๆ ที่ต้องการ: {item.partnerWantQty}</div>
              {item.sexTarget && (
                <div>
                  เพศที่ที่เรียก:{" "}
                  {item.sexTarget === "male"
                    ? "ชาย"
                    : item.sexTarget === "female"
                    ? "หญิง"
                    : "อื่น ๆ"}
                </div>
              )}
              <div style={{ backgroundColor: "#FBE0D6" }}>
                <div style={{ color: "blue" }}>
                  ชื่อลูกค้า: {item.customerName}
                </div>
                {item.customerGender && (
                  <div>
                    เพศลูกค้า:{" "}
                    {item.customerGender === "male"
                      ? "ชาย"
                      : item.customerGender === "female"
                      ? "หญิง"
                      : "อื่น ๆ"}
                  </div>
                )}
              </div>
              <div style={{ fontWeight: "bold" }}>
                Level: {item.customerLevel}
              </div>
              <div>จังหวัด: {item.provinceName}</div>
              <div style={{ color: "green" }}>สถานที่: {item.placeMeeting}</div>
              <div style={{ color: "red" }}>
                เริ่ม: {item.startTime}, เลิก: {item.stopTime}
              </div>
              <div style={{ color: "brown" }}>
                รายละเอียดเพิ่มเติม: {item.customerRemark}
              </div>
              <div>
                วันที่โพสท์:{" "}
                {Moment(item.sys_create_date).format("DD/MM/YYYY HH:mm:ss")}
              </div>
            </div>
          </ListItem>
        ))}
    </ImageBackground>
  )
}
