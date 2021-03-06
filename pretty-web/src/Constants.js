const hostName = window.location.host
const getEnv = hostName !== "pretty-land.web.app" ? "demo" : "production"
const getEnvMaster = hostName === "localhost:3000" ? "test" : getEnv
console.log("Connection to...", getEnvMaster, hostName)
export const AppConfig = {
  env: getEnvMaster,
  MemberStatus: {
    newRegister: "new_register",
    newRegisterMessage: "รอออนุมัติ",
    newRegisterPriority: 1,
    active: "active",
    activeMessage: "ผ่านการอนุมัติ",
    activePriority: 2,
    notApprove: "not_approve",
    notApproveMessage: "",
    notApprovePriority: 3,
    suspend: "suspend",
    suspendMessage: "สั่งพักงานชั่วคราว",
    suspendPriority: 4,
    suspendMessagePopup: "ขออภัย! บัญชีของท่านถูกยกเลิกชั่วคราว"
  },
  PartnerType: {
    type1: "พริตตี้ Event / Mc",
    type2: "โคโยตี้ / งานเต้น",
    type3: "พริตตี้ En / Env",
    type4: "พริตตี้ นวดแผนไทย"
  },
  PostsStatus: {
    customerNewPostDone: "customer_new_post_done",
    customerCancelPost: "customer_cancel_post",
    waitAdminApprovePost: "wait_admin_approve_post",
    adminConfirmNewPost: "admin_confirm_new_post",
    notApprove: "not_approve",
    postCancel: "post_cancel",
    waitCustomerSelectPartner: "wait_customer_select_partner",
    customerConfirm: "customer_confirm",
    waitCustomerPayment: "wait_customer_payment",
    customerPayment: "customer_payment",
    waitAdminConfirmPayment: "wait_admin_confirm_payment",
    waitPartnerConfrimWork: "wait_partner_confirm_work",
    adminConfirmPayment: "admin_confirm_payment",
    customerMeet: "customer_meet",
    customerStartWork: "customer_start_work",
    partnerStartWork: "partner_start_work",
    partnerCancelWork: "partner_cancel_work",
    partnerAcceptWork: "partner_accept_work",
    postTimeout: "post_timeout",
    customerCloseJob: "customer_close_job",
    partnerCloseJob: "partner_close_job",
    startWork: "start_work",
    closeJob: "close_job"
  }
}
