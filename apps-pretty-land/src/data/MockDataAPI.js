import { country } from "./items"

export function getCountryCount(id, type) {
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
    return "";
  })
}
