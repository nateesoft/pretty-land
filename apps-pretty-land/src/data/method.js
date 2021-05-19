import * as mockup from "./mockup"
import { PARTNER_TYPE } from "./master_data"

export const getProvinceCountPartner = (provinceId) => {
  return new Promise((resolve, reject) => {
    const data = []
    const dataProvince = mockup.customerPostList.filter((item, index) => {
      return item.provinceMapping.value === provinceId
    })
    resolve({
      pretty: 1,
      prettyEntertain: 2,
      coyote: 3,
      prettyMassage: 4,
    })
    // if (data.length > 0) {
    //   dataProvince.forEach((item, index) => {
    //     const pretty =
    //       item.partnerRequest === PARTNER_TYPE[0] ? item.partnerQtyRequest : 0
    //     const prettyEntertain =
    //       item.partnerRequest === PARTNER_TYPE[1] ? item.partnerQtyRequest : 0
    //     const coyote =
    //       item.partnerRequest === PARTNER_TYPE[2] ? item.partnerQtyRequest : 0
    //     const prettyMassage =
    //       item.partnerRequest === PARTNER_TYPE[3] ? item.partnerQtyRequest : 0

    //     data.push({
    //       pretty,
    //       prettyEntertain,
    //       coyote,
    //       prettyMassage,
    //     })
    //   })
    //   resolve(data);
    // } else {
    //   resolve([])
    // }
  })
}
