import React from "react"
import { View, Text } from "react-native"

const CardNotfound = ({ text = "ไม่พบข้อมูลในระบบ" }) => {
  return (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <Text style={{fontSize: 16}}>{text}</Text>
    </View>
  )
}

export default CardNotfound
