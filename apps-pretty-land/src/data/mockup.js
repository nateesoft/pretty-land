import * as master from "./master_data"

export const partnerToSelect = [
  {
    name: "น้องกิ๊ฟ วันทอง",
    subtitle: "น่ารักยิ้มเก่ง ขาวหมวย",
    status: "พร้อมทำงาน",
    image: null,
    place: "เกษตรนวมินท์",
    partnerRequest: "Pretty",
    price: 2000,
    sex: "หญิง",
    detail: "ขาวสวย หมวยอึ๋ม",
  },
  {
    name: "น้องเข็ม",
    subtitle: "อวบ สมส่วน ขาว",
    status: "พร้อมทำงาน",
    image: null,
    place: "เกษตรนวมินท์",
    partnerRequest: "Pretty",
    price: 1500,
    sex: "หญิง",
    detail: "ผิวแทน เอาใจเก่ง",
  },
]

export const customerPostList = [
  // {
  //   id: 1,
  //   partnerType: "1",
  //   customer: "A",
  //   customerLevel: 0,
  //   name: "ฉลองซื้อรถใหม่",
  //   partnerRequest: "Pretty",
  //   partnerQtyRequest: 2,
  //   province: "กรุงเทพฯ",
  //   provinceId: 1,
  //   provinceMapping: {
  //     id: 1,
  //     value: "10",
  //     label: "กรุงเทพมหานคร",
  //   },
  //   image: require("../../assets/img_example/img1.png"),
  //   subtitle: "กรุงเทพฯ จำนวน 2 คน",
  //   place: "ซอยลาดพร้าว 71",
  //   status: "customer_new_post_done",
  //   statusText: "โพสท์ใหม่รอ approve",
  //   textToPartner: "",
  //   textToAdmin: "โพสท์ใหม่รอ approve",
  //   customerContact: "081-0000000",
  //   listPartnerSelect: [],
  //   create_date: "",
  //   update_date: "",
  // },
  // {
  //   id: 2,
  //   partnerType: "2",
  //   customer: "A",
  //   customerLevel: 0,
  //   name: "งานรถกะบะซิ่ง",
  //   partnerRequest: "Coyote",
  //   partnerQtyRequest: 10,
  //   province: "เชียงใหม่",
  //   provinceId: 5,
  //   provinceMapping: {
  //     id: 38,
  //     value: "50",
  //     label: "เชียงใหม่",
  //   },
  //   image: require("../../assets/img_example/img2.png"),
  //   subtitle: "เชียงใหม่ จำนวน 10 คน",
  //   place: "พหลโยธิน 1",
  //   status: "wait_customer_select_partner",
  //   statusText: "รอเลือก Partner",
  //   textToPartner: "รอรับงาน",
  //   textToAdmin: "รอ Partner รับงาน",
  //   customerContact: "081-0000000",
  //   listPartnerSelect: [],
  // },
  // {
  //   id: 3,
  //   partnerType: "3",
  //   customer: "A",
  //   customerLevel: 0,
  //   name: "รองรับแขก VIP",
  //   partnerRequest: "Pretty Entertain",
  //   partnerQtyRequest: 4,
  //   province: "กรงเทพฯ",
  //   provinceId: 1,
  //   provinceMapping: {
  //     id: 1,
  //     value: "10",
  //     label: "กรุงเทพมหานคร",
  //   },
  //   image: require("../../assets/img_example/img3.png"),
  //   subtitle: "กรงเทพฯ จำนวน 4 คน",
  //   place: "กรุงเทพ-นนท์ 122",
  //   status: "wait_customer_select_partner",
  //   statusText: "รอเลือก Partner",
  //   textToPartner: "รอรับงาน",
  //   textToAdmin: "รอ Partner รับงาน",
  //   customerContact: "081-0000000",
  //   listPartnerSelect: [
  //     {
  //       partnerId: 3,
  //       name: "พริตตี้-1",
  //       image: require("../../assets/img_example/img1.png"),
  //       price: 1000,
  //     },
  //   ],
  // },
  // {
  //   id: 4,
  //   partnerType: "4",
  //   customer: "A",
  //   customerLevel: 0,
  //   name: "นวดแผนไทย - อบรมพนักงาน",
  //   partnerRequest: "Massage",
  //   partnerQtyRequest: 5,
  //   province: "นครราชสีมา",
  //   provinceId: 3,
  //   provinceMapping: {
  //     id: 19,
  //     value: "30",
  //     label: "นครราชสีมา",
  //   },
  //   image: require("../../assets/img_example/img1.png"),
  //   subtitle: "นครราชสีมา จำนวน 5 คน",
  //   place: "อินทมะระ 9",
  //   status: "wait_customer_payment",
  //   statusText: "รอชำระเงิน",
  //   textToPartner: "รอลูกค้าชำระเงิน",
  //   textToAdmin: "รอลูกค้าชำระเงิน",
  //   customerContact: "081-0000000",
  //   listPartnerSelect: [
  //     {
  //       name: "น้องกิ๊ฟ วันทอง",
  //       subtitle: "น่ารักยิ้มเก่ง ขาวหมวย",
  //       status: "พร้อมทำงาน",
  //       image: require("../../assets/img_example/girl1.png"),
  //       place: "เกษตรนวมินท์",
  //       partnerRequest: "Pretty",
  //       price: 2000,
  //       sex: "หญิง",
  //       detail: "ขาวสวย หมวยอึ๋ม",
  //     },
  //     {
  //       name: "น้องเข็ม",
  //       subtitle: "อวบ สมส่วน ขาว",
  //       status: "พร้อมทำงาน",
  //       image: require("../../assets/img_example/girl2.png"),
  //       place: "เกษตรนวมินท์",
  //       partnerRequest: "Pretty",
  //       price: 1500,
  //       sex: "หญิง",
  //       detail: "ผิวแทน เอาใจเก่ง",
  //     },
  //   ],
  // },
  // {
  //   id: 5,
  //   partnerType: "4",
  //   customer: "A",
  //   customerLevel: 0,
  //   name: "นวดแผนไทย - อบรมพนักงาน",
  //   partnerRequest: "Massage",
  //   partnerQtyRequest: 5,
  //   province: "นครราชสีมา",
  //   provinceId: 3,
  //   provinceMapping: {
  //     id: 19,
  //     value: "30",
  //     label: "นครราชสีมา",
  //   },
  //   image: require("../../assets/img_example/img4.png"),
  //   subtitle: "นครราชสีมา จำนวน 5 คน",
  //   place: "ซอยลาดพร้าว 71",
  //   status: "wait_admin_confirm_payment",
  //   statusText: "รอ admin ตรวจสอบเงินโอน",
  //   textToPartner: "รอตรวจสอบเงินโอนจากลูกค้า",
  //   textToAdmin: "รอลูกค้าชำระเงิน",
  //   customerContact: "081-0000000",
  //   listPartnerSelect: [],
  // },
  // {
  //   id: 6,
  //   partnerType: "4",
  //   customer: "A",
  //   customerLevel: 0,
  //   name: "นวดแผนไทย - อบรมพนักงาน",
  //   partnerRequest: "Massage",
  //   partnerQtyRequest: 5,
  //   province: "นครราชสีมา",
  //   provinceId: 3,
  //   provinceMapping: {
  //     id: 19,
  //     value: "30",
  //     label: "นครราชสีมา",
  //   },
  //   image: require("../../assets/img_example/img2.png"),
  //   subtitle: "นครราชสีมา จำนวน 5 คน",
  //   place: "ซอยลาดพร้าว 71",
  //   status: "admin_confirm_payment",
  //   statusText: "อยู่ระหว่างภารกิจ",
  //   textToPartner: "อยู่ระหว่างภารกิจ",
  //   textToAdmin: "อยู่ระหว่างภารกิจ",
  //   customerContact: "081-0000000",
  //   listPartnerSelect: [],
  // },
  // {
  //   id: 7,
  //   partnerType: "4",
  //   customer: "A",
  //   customerLevel: 0,
  //   name: "นวดแผนไทย - อบรมพนักงาน",
  //   partnerRequest: "Massage",
  //   partnerQtyRequest: 5,
  //   province: "นครราชสีมา",
  //   provinceId: 3,
  //   provinceMapping: {
  //     id: 19,
  //     value: "30",
  //     label: "นครราชสีมา",
  //   },
  //   image: require("../../assets/img_example/img1.png"),
  //   subtitle: "นครราชสีมา จำนวน 5 คน",
  //   place: "ซอยลาดพร้าว 71",
  //   status: "close_job",
  //   statusText: "ปิดงานเรียบร้อย",
  //   textToPartner: "ปิดงานเรียบร้อย",
  //   textToAdmin: "ปิดงานเรียบร้อย",
  //   customerContact: "081-0000000",
  //   listPartnerSelect: [],
  // },
  // {
  //   id: 8,
  //   partnerType: "4",
  //   customer: "BBB",
  //   customerLevel: 2,
  //   name: "นวดแผนไทย - อบรมพนักงาน",
  //   partnerRequest: "Massage",
  //   partnerQtyRequest: 5,
  //   province: "นครราชสีมา",
  //   provinceId: 3,
  //   provinceMapping: {
  //     id: 19,
  //     value: "30",
  //     label: "นครราชสีมา",
  //   },
  //   image: require("../../assets/img_example/img1.png"),
  //   subtitle: "นครราชสีมา จำนวน 5 คน",
  //   place: "ซอยลาดพร้าว 71",
  //   status: "admin_confirm_new_post",
  //   statusText: "ปิดงานเรียบร้อย",
  //   textToPartner: "ปิดงานเรียบร้อย",
  //   textToAdmin: "ปิดงานเรียบร้อย",
  //   customerContact: "081-0000000",
  //   listPartnerSelect: [],
  // },
  // {
  //   id: 9,
  //   partnerType: "4",
  //   customer: "BBB",
  //   customerLevel: 2,
  //   name: "นวดแผนไทย - แก้เมื่อย",
  //   partnerRequest: "Massage",
  //   partnerQtyRequest: 5,
  //   province: "นครราชสีมา",
  //   provinceId: 3,
  //   provinceMapping: {
  //     id: 19,
  //     value: "30",
  //     label: "นครราชสีมา",
  //   },
  //   image: require("../../assets/img_example/img1.png"),
  //   subtitle: "นครราชสีมา จำนวน 1 คน",
  //   place: "ซอยลาดพร้าว 71",
  //   status: "admin_confirm_new_post",
  //   statusText: "รอเลือก Partner",
  //   textToPartner: "รอรับงาน",
  //   textToAdmin: "รอ Partner รับงาน",
  //   customerContact: "081-0000000",
  //   listPartnerSelect: [],
  // },
]

export const partnerJobsList = []

// export const partnerJobsList = [
//   {
//     id: 1,
//     jobId: "j001",
//     partnerType: "Pretty MC",
//     jobDateRequest: "18/05/2021",
//     place: "ซอยลาดพร้าว 71",
//     province: "เขียงใหม่",
//     priceRequest: 2000,
//     name: "ฉลองซื้อรถใหม่",
//     customer: "A",
//     customerContact: "081-0000001",
//     partnerId: 1,
//     jobStatus: "wait_customer_confirm",
//     jobStatusDesc: "รอลูกค้าคอนเฟิร์มเลือก",
//   },
//   {
//     id: 2,
//     jobId: "j002",
//     partnerType: "Pretty Event",
//     jobDateRequest: "22/05/2021",
//     place: "ซอยลาดพร้าว 72",
//     province: "นครราชสีมา",
//     priceRequest: 1000,
//     name: "งานเลี้ยงรับปริญญา",
//     customer: "A",
//     customerContact: "081-0000002",
//     partnerId: 1,
//     jobStatus: "customer_confirm",
//     jobStatusDesc: "ลูกค้ายืนยันให้ทำงาน",
//   },
//   {
//     id: 3,
//     jobId: "j003",
//     partnerType: "Pretty Event",
//     jobDateRequest: "22/05/2021",
//     place: "ซอยลาดพร้าว 72",
//     province: "นครราชสีมา",
//     priceRequest: 1000,
//     name: "งานเลี้ยงรับปริญญา",
//     customer: "A",
//     customerContact: "081-0000002",
//     partnerId: 1,
//     jobStatus: "customer_meet",
//     jobStatusDesc: "เจอลูกค้าแล้ว",
//   },
//   {
//     id: 4,
//     jobId: "j004",
//     partnerType: "Pretty Massage",
//     jobDateRequest: "30/05/2021",
//     place: "สุขุมวิท 62",
//     province: "นครราชสีมา",
//     priceRequest: 3500,
//     name: "ต้อนรับพนักงานใหม่",
//     customer: "A",
//     customerContact: "081-0000003",
//     partnerId: 2,
//     jobStatus: "wait_customer_confirm",
//     jobStatusDesc: "รอลูกค้าคอนเฟิร์มเลือก",
//   },
// ]
