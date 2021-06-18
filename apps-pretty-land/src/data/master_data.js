import { AppConfig } from "../Constants"

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
