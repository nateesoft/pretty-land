import { country, partnerCategory, countryList, postList } from "./items"

export const getCountryCount = (id, type) => {
  return country.map((data) => {
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
  return country
}

export const getPostList = () => {
  return postList
}
