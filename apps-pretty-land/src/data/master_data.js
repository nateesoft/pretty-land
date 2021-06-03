import { AppConfig } from "../Constants"

export const PARTNER_TYPE = ["Pretty", "Pretty Entertain", "Coyote", "Massage"]

export const partnerGroup = [
  {
    id: 1,
    type: "PRETTY_MC",
    value: "pretty-mc",
    label: AppConfig.PartnerType.type1,
    active: true,
    img: "https://firebasestorage.googleapis.com/v0/b/pretty-land.appspot.com/o/images%2Fpartner1.jpg?alt=media&token=3133f733-4a8a-4fe0-978f-1df2a7ea84b0",
  },
  {
    id: 2,
    type: "COYOTE",
    value: "coyote",
    label: AppConfig.PartnerType.type2,
    active: true,
    img: "https://firebasestorage.googleapis.com/v0/b/pretty-land.appspot.com/o/images%2Fpartner2.jpg?alt=media&token=2cc7e943-1d7e-4012-aed2-4e36501129ed",
  },
  {
    id: 3,
    type: "PRETTY_ENTERTAIN",
    value: "pretty-entertain",
    label: AppConfig.PartnerType.type3,
    active: true,
    img: "https://firebasestorage.googleapis.com/v0/b/pretty-land.appspot.com/o/images%2Fpartner3.jpg?alt=media&token=37eb5c37-091f-41dd-bf9f-774ef06184e7",
  },
  {
    id: 4,
    type: "PRETTY_MASSAGE",
    value: "pretty-massage",
    label: AppConfig.PartnerType.type4,
    active: true,
    img: "https://firebasestorage.googleapis.com/v0/b/pretty-land.appspot.com/o/images%2Fpartner4.jpg?alt=media&token=a9f88168-fbe5-437a-a869-4774b5c28059",
  },
]

export const memberStatus = [
  { value: 1, label: AppConfig.MemberStatus.active },
  { value: 2, label: AppConfig.MemberStatus.newRegister },
  { value: 3, label: AppConfig.MemberStatus.notApprove },
  { value: 4, label: AppConfig.MemberStatus.suspend },
]

export const memberGroup = [
  { value: 1, label: "Customer" },
  { value: 2, label: "Partner" },
  { value: 3, label: "Admin" },
]

export const postStatus = [
  { value: 1, label: "โพสท์ใหม่" },
  { value: 2, label: "ตรวจสอบแล้ว" },
  { value: 3, label: "รอตรวจสอบสลิปโอนเงิน" },
  { value: 4, label: "ปิดงานเรียบร้อย" },
]
