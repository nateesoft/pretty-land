export const PARTNER_TYPE = ["Pretty", "Pretty Entertain", "Coyote", "Massage"]

export const partnerGroup = [
  {
    id: 1,
    type: "PRETTY_MC",
    value: "pretty-mc",
    label: "MC",
    active: true,
    img: require("../../assets/img_example/img1.png"),
  },
  {
    id: 2,
    type: "COYOTE",
    value: "coyote",
    label: "โคโยตี้",
    active: true,
    img: require("../../assets/img_example/img2.png"),
  },
  {
    id: 3,
    type: "PRETTY_ENTERTAIN",
    value: "pretty-entertain",
    label: "Entertain",
    active: true,
    img: require("../../assets/img_example/img3.png"),
  },
  {
    id: 4,
    type: "PRETTY_MASSAGE",
    value: "pretty-massage",
    label: "นวดแผนไทย",
    active: true,
    img: require("../../assets/img_example/img4.png"),
  },
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
