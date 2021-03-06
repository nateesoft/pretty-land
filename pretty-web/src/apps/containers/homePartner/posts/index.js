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
import Cookies from "js-cookie"

import ImageBackground from "../../../components/background"
import Header from "../../../components/header"

import { getCountryList } from "../../../../data/apis"
import { AppConfig } from "../../../../Constants"
import firebase from "../../../../util/firebase"
import { snapshotToArray } from "../../../../util"
import { updatePosts, filterPostsToUpdate } from "../../../../apis"

export default function CustomerPosts(props) {
  const [filterList, setFilterList] = useState([])
  const history = useHistory()
  if (!Cookies.get("logged_in")) {
    window.location.href = ""
  }
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
        history.push("/partner-request-detail", { item, profile })
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
          let resultGender = false
          if (item.sexTarget === "other") {
            if (profile.gender === "female" || profile.gender === "other") {
              resultGender = true
            }
          } else {
            resultGender = item.sexTarget === profile.gender
          }
          if (item.sexTarget === "male" && profile.gender === "male") {
            resultGender = true
          }
          if (item.partnerType === partnerType && resultGender) {
            if (
              item.status === AppConfig.PostsStatus.adminConfirmNewPost ||
              item.status === AppConfig.PostsStatus.waitCustomerSelectPartner
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
                    statusText: "???????????????????????????????????????????????????????????????????????????",
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
                      "??????????????????????????????????????????????????????????????? ?????????????????????????????????????????????????????? 2 ?????????????????????",
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
    (async () => {
      await filterPostsToUpdate()
    })()
  }, [])

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
        ??????????????????????????????????????????????????????
      </div>
      <div align="center">
        <div
          style={{ backgroundColor: "chocolate", padding: 5, color: "white" }}
        >
          ????????????: {partnerTypeNme}
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
          ????????????????????????????????????????????????????????????????????????????????????
        </div>
        <FormControl variant="outlined" style={{ width: 350, marginTop: 10 }}>
          <InputLabel id="demo-simple-select-outlined-label">
            ?????????????????????
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={province}
            onChange={(e) => onChangeProvinceSelect(e.target.value)}
            label="?????????????????????"
            displayEmpty
          >
            <MenuItem value="">
              <em>-- ?????????????????????????????? --</em>
            </MenuItem>
            {provinceList.map((item, index) => (
              <MenuItem value={item.value} key={item.label + index}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {filterList.length === 0 && (
        <div
          align="center"
          style={{
            padding: 10,
            margin: 10,
            fontSize: 20,
            fontWeight: "bold",
            color: "gray"
          }}
        >
          ??????????????????????????????????????????
        </div>
      )}
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
              <div>?????????????????????????????? ??????????????????????????????: {item.partnerWantQty}</div>
              {item.sexTarget && (
                <div>
                  ?????????????????????????????????:{" "}
                  {item.sexTarget === "male"
                    ? "?????????"
                    : item.sexTarget === "female"
                    ? "????????????"
                    : "???????????? ???"}
                </div>
              )}
              <div style={{ backgroundColor: "#FBE0D6" }}>
                <div style={{ color: "blue" }}>
                  ??????????????????????????????: {item.customerName}
                </div>
                {item.customerGender && (
                  <div>
                    ???????????????????????????:{" "}
                    {item.customerGender === "male"
                      ? "?????????"
                      : item.customerGender === "female"
                      ? "????????????"
                      : "???????????? ???"}
                  </div>
                )}
              </div>
              <div style={{ fontWeight: "bold" }}>
                Level: {item.customerLevel}
              </div>
              <div>?????????????????????: {item.provinceName}</div>
              <div style={{ color: "green" }}>?????????????????????: {item.placeMeeting}</div>
              <div style={{ color: "red" }}>
                ???????????????: {item.startTime}, ????????????: {item.stopTime}
              </div>
              <div style={{ color: "brown" }}>
                ?????????????????????????????????????????????????????????: {item.customerRemark}
              </div>
              <div>
                ?????????????????????????????????:{" "}
                {Moment(item.sys_create_date).format("DD/MM/YYYY HH:mm:ss")}
              </div>
            </div>
          </ListItem>
        ))}
    </ImageBackground>
  )
}
