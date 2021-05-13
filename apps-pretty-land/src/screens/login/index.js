import React from "react"
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableHighlight,
} from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { Button } from "react-native-elements/dist/buttons/Button"

import bg from "../../../assets/login.png"
import bgImage from "../../../assets/bg.png"
import lineLogo from '../../../assets/icons/LINE_APP.png';
import facebookLogo from '../../../assets/icons/f_logo_RGB-Blue_58.png';

const LoginScreen = (props) => {
  const { navigate } = props.navigation

  return (
    <ImageBackground source={bgImage} style={styles.imageBg}>
      <View style={styles.container}>
        <Image style={styles.image} source={bg} />
        <Text style={styles.textLogo}>PRETTY LAND</Text>
        <Text style={styles.textDetail}>Love Your Moments</Text>
        <TouchableHighlight
          style={styles.btnClickContain}
          onPress={() => props.navigation.navigate("Customer-Home")}
        >
          <View style={styles.btnContainer}>
            <Image source={facebookLogo} style={{ width: 24, height: 24}} />
            <Text
              style={{
                marginLeft: 10,
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              เข้าสู่ระบบด้วย facebook
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.btnLineClickContain}
          onPress={() => props.navigation.navigate("Customer-Home")}
        >
          <View style={styles.btnContainer}>
            <Image source={lineLogo} style={{ width: 24, height: 24}} />
            <Text
              style={{
                marginLeft: 10,
                color: "snow",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              เข้าสู่ระบบด้วย LINE
            </Text>
          </View>
        </TouchableHighlight>
        <Text style={styles.textOr}>------ OR ------</Text>
        <Button
          icon={
            <AntDesign
              name="login"
              size={20}
              style={{ marginLeft: 10 }}
              color="white"
            />
          }
          iconRight
          title="LOGIN"
          titleStyle={{
            fontWeight: "bold",
            fontSize: 14,
          }}
          buttonStyle={{
            backgroundColor: "#ff2fe6",
            marginTop: 5,
            borderRadius: 25,
            width: 250,
            paddingHorizontal: 15,
            height: 45,
            borderWidth: 1,
            borderColor: "gray",
          }}
          onPress={() => props.navigation.navigate("Login-Form")}
        />
        <Button
          title="ลงทะเบียนผู้ร่วมงาน"
          titleStyle={{
            color: "blue",
            fontSize: 14,
            textDecorationLine: 'underline'
          }}
          buttonStyle={{
            borderRadius: 25,
            width: 250,
            height: 45,
          }}
          onPress={() => props.navigation.navigate("Register-Partner-Form")}
        />
        <Text style={styles.textFooter1}>Contact Us</Text>
        <Text style={styles.textFooter2}>
          Tel : 09-7874-7874 (24Hr) / Line : @Prettylandthailand / Fb: PrettyLand
          - Thailand / Email : Prettylandthailand@gmail.com
        </Text>
        <Text style={styles.textFooter3}>
          คุณเห็นด้วยกับเงื่อนไขการให้บริการ และ นโยบายความเป็นส่วนตัว
        </Text>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -120,
  },
  image: {
    height: 100,
    width: 100,
    marginBottom: 10,
  },
  textLogo: {
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "purple",
  },
  textDetail: {
    fontSize: 12,
    fontWeight: "bold",
    color: "gray",
  },
  btnFacebook: {
    marginHorizontal: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    backgroundColor: "blue",
    paddingVertical: 2,
    borderRadius: 23,
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    textAlignVertical: "center",
    paddingLeft: 10,
  },
  textOr: {
    marginVertical: 15,
    fontSize: 14,
    fontWeight: 'bold',
    color: "gray",
  },
  textInput: {
    backgroundColor: "white",
    width: 250,
    textAlign: "center",
    fontSize: 16,
    marginVertical: 5,
  },
  textRegister: {
    color: "purple",
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  textFooter1: {
    width: "90%",
    textAlign: "center",
    flexWrap: "wrap",
    fontSize: 12,
    color: "gray",
    position: "absolute",
    bottom: 120,
    color: 'red',
  },
  textFooter2: {
    width: "90%",
    textAlign: "center",
    flexWrap: "wrap",
    fontSize: 12,
    color: "gray",
    position: "absolute",
    bottom: 85,
    color: 'black',
  },
  textFooter3: {
    width: "90%",
    textAlign: "center",
    flexWrap: "wrap",
    fontSize: 12,
    color: "gray",
    position: "absolute",
    bottom: 60,
    color: 'green',
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  btnClickContain: {
    paddingTop: 11,
    paddingLeft: 10,
    marginBottom: 5,
    backgroundColor: "#0A69D6",
    marginTop: 45,
    borderRadius: 25,
    width: 250,
    height: 45,
  },
  btnLineClickContain: {
    paddingTop: 11,
    paddingLeft: 10,
    marginBottom: 5,
    backgroundColor: "#35D00D",
    marginTop: 5,
    borderRadius: 25,
    width: 250,
    height: 45,
  },
})

export default LoginScreen
