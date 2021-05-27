import * as master from "./master_data"
import * as mockup from "./mockup"
import { provinces } from "./province"
import { districts } from "./district"
import { banks } from "./bank"
import { PARTNER_TYPE } from "./master_data"

export const getPartnerGroup = () => {
  return master.partnerGroup
}

export const getCountryList = () => {
  return provinces.sort()
}

export const getCountry = () => {
  return provinces
}

export const getPostList = () => {
  return mockup.customerPostList
}

export const getPostToConfirmList = () => {
  return mockup.customerPostList.filter(
    (item, index) => item.status === "customer_new_post_done"
  )
}

export const getPostToPayment = (postId) => {
  return mockup.customerPostList.filter(
    (item, index) =>
      item.status === "wait_customer_payment" && item.id === postId
  )
}

export const getPostToPartnerList = (provinceId) => {
  return mockup.customerPostList.filter(
    (item, index) =>
      item.status === "admin_confirm_new_post" && item.provinceId === provinceId
  )
}

export const getTransferListToConfirm = () => {
  return mockup.customerPostList.filter(
    (item, index) => item.status === "wait_admin_confirm_payment"
  )
}

export const getMemberCategory = () => {
  return master.memberGroup
}

export const getPostStatus = () => {
  return master.postStatus
}

export const addPostList = (newPost) => {
  mockup.customerPostList.push({
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
  return mockup.partnerToSelect
}

export const getDataForPartnerWork = (partnerId) => {
  return mockup.partnerJobsList.filter(
    (item, index) => item.partnerId === partnerId
  )
}

export const allGroupContryWork = () => {
  const data = []
  mockup.customerPostList.forEach((item, index) => {
    const pretty =
      item.partnerRequest === PARTNER_TYPE[0] ? item.partnerQtyRequest : 0
    const prettyEntertain =
      item.partnerRequest === PARTNER_TYPE[1] ? item.partnerQtyRequest : 0
    const coyote =
      item.partnerRequest === PARTNER_TYPE[2] ? item.partnerQtyRequest : 0
    const prettyMassage =
      item.partnerRequest === PARTNER_TYPE[3] ? item.partnerQtyRequest : 0
    data.push({
      id: index,
      provinceId: item.provinceId,
      province: item.province,
      work1: "พริตตี้ Event / Mc",
      prettyMcQty: pretty,
      work2: "โคโยตี้ / งานเต้น",
      prettyEntertainQty: prettyEntertain,
      work3: "พริตตี้ En / Env",
      coyoteQty: coyote,
      work4: "พริตตี้ นวดแผนไทย",
      prettyMassage: prettyMassage,
    })
  })

  return data
}

export const getBankList = () => {
  return banks
}

export const getDistrictList = (PROVINCE_ID) => {
  return districts.filter((item, index) => item.PROVINCE_ID === PROVINCE_ID)
}
