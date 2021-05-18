import {
  partnerCategory,
  memberCategory,
  postStatus,
  countryList,
  membersSystemList,
} from "./master_data"

import {
  customerPostList,
  partnerCountOfCountry,
  partnerToSelect,
  partnerJobsList,
  customerPostGroupByProvince,
} from "./mockup"

export const getCountryCount = (id, type) => {
  return partnerCountOfCountry.map((data) => {
    if (data.id === id) {
      if (type === "1") {
        return data.type1
      } else if (type === "2") {
        return data.type2
      } else if (type === "3") {
        return data.type3
      } else if (type === "4") {
        return data.type4
      }
    }
    return ""
  })
}

export const getPartnerGroup = () => {
  return partnerCategory
}

export const getCountryList = () => {
  return countryList
}

export const getCountry = () => {
  return countryList
}

export const getPostList = () => {
  return customerPostList
}

export const getPostToConfirmList = () => {
  return customerPostList.filter(
    (item, index) => item.status === "customer_new_post_done"
  )
}

export const getPostToPartnerList = (provinceId) => {
  return customerPostList.filter(
    (item, index) =>
      item.status === "admin_confirm_new_post" && item.provinceId === provinceId
  )
}

export const getTransferListToConfirm = () => {
  return customerPostList.filter(
    (item, index) => item.status === "wait_admin_confirm_payment"
  )
}

export const getMemberList = () => {
  return membersSystemList
}

export const getMemberCategory = () => {
  return memberCategory
}

export const getPostStatus = () => {
  return postStatus
}

export const addPostList = (newPost) => {
  customerPostList.push({
    id: customerPostList.length + 1,
    post_owner: newPost.customer,
    partnerType: newPost.partnerType,
    name: newPost.name,
    image: require("../../assets/img_example/img1.png"),
    subtitle: newPost.subtitle,
    status: "customer_new_post_done",
    statusText: "โพสท์ใหม่",
  })
}

export const getPartnerListToSelect = () => {
  return partnerToSelect
}

export const getDataForPartnerWork = (partnerId) => {
  return partnerJobsList.filter((item, index) => item.partnerId === partnerId)
}

export const allGroupContryWork = () => {
  return customerPostGroupByProvince
}
