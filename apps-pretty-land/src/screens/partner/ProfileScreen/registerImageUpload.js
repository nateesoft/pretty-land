import React, { useEffect, useState, useRef, useContext } from "react"
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
  Alert,
  Button as ButtonLink,
  ImageBackground,
} from "react-native"
import * as Progress from "react-native-progress"
import * as ImagePicker from "expo-image-picker"
import { Video } from "expo-av"
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"
import { Button } from "react-native-elements"
import uuid from "react-native-uuid"

import {AppConfig} from '../../../Constants'
import bgImage from "../../../../assets/bg.png"
import { Context as AuthContext } from "../../../context/AuthContext"
import firebase from "../../../../util/firebase"
import { GetIcon } from "../../../components/GetIcons"

const RegisterImageUpload = ({ navigation, route }) => {
  const { signOut } = useContext(AuthContext)
  const { userId, status, bankData } = route.params
  const video = useRef(null)

  const [uploadFinish, setUploadFinish] = useState("none")
  const [hideButtonUpload, setHideButtonUpload] = useState(false)

  const [image, setImage] = useState(null)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)

  const [imageFile1, setImageFile1] = useState(null)
  const [imageFile2, setImageFile2] = useState(null)
  const [imageFile3, setImageFile3] = useState(null)
  const [imageFile4, setImageFile4] = useState(null)
  const [imageFile5, setImageFile5] = useState(null)
  const [imageFile6, setImageFile6] = useState(null)

  const [imageUrl1, setImageUrl1] = useState(null)
  const [imageUrl2, setImageUrl2] = useState(null)
  const [imageUrl3, setImageUrl3] = useState(null)
  const [imageUrl4, setImageUrl4] = useState(null)
  const [imageUrl5, setImageUrl5] = useState(null)
  const [imageUrl6, setImageUrl6] = useState(null)

  const saveProfileData = () => {
    const dataUpdate = {
      ...bankData,
      image: image ? image: imageUrl1,
      imageUrl1,
      imageUrl2,
      imageUrl3,
      imageUrl4,
      imageUrl5,
      videoUrl: imageUrl6,
      username,
      password,
      status: AppConfig.MemberStatus.newRegister,
      statusText: AppConfig.MemberStatus.newRegisterMessage,
    }
    firebase.database().ref(`members/${userId}`).update(dataUpdate)
    Alert.alert("กระบวนการเสร็จสมบูรณ์", "อัพเดตข้อมูลเรียบร้อยแล้ว รอ Admin อนุมัติข้อมูล")
    signOut()
  }

  const selectImage = async (handleImg) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      videoExportPreset: ImagePicker.VideoExportPreset.LowQuality
    })
    if (!result.cancelled) {
      handleImg(result.uri)
    }
  }

  const selectVideo = async (handleVideo) => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permissionResult.granted === false) {
      Alert.alert("แจ้งเตือน", "ขออภัย, กรุณาให้สิทธิ์การเข้าถึงรูปภาพของท่าน!")
      return
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      videoExportPreset: ImagePicker.VideoExportPreset.LowQuality
    })

    if (!result.cancelled) {
      handleVideo(result.uri)
    }
  }

  useEffect(() => {
    const onChangeValue = firebase
      .database()
      .ref(`members/${userId}`)
      .on("value", (snapshot) => {
        const data = { ...snapshot.val() }
        setUsername(data.username)
        setPassword(data.password)

        setImageUrl1(data.imageUrl1 || null)
        setImageUrl2(data.imageUrl2 || null)
        setImageUrl3(data.imageUrl3 || null)
        setImageUrl4(data.imageUrl4 || null)
        setImageUrl5(data.imageUrl5 || null)
        setImageUrl6(data.videoUrl || null)
      })

    // return () =>
    //   firebase.database().ref(`members/${userId}`).off("value", onChangeValue)
  }, [])

  const uploadAllImageVideo = () => {
    setHideButtonUpload(true)
    if (imageFile1) {
      uploadImageAsync(imageFile1, setImageUrl1, true)
    }
    if (imageFile2) {
      uploadImageAsync(imageFile2, setImageUrl2, false)
    }
    if (imageFile3) {
      uploadImageAsync(imageFile3, setImageUrl3, false)
    }
    if (imageFile4) {
      uploadImageAsync(imageFile4, setImageUrl4, false)
    }
    if (imageFile5) {
      uploadImageAsync(imageFile5, setImageUrl5, false)
    }
    if (imageFile6) {
      uploadImageAsync(imageFile6, setImageUrl6, false)
    }
  }

  async function uploadImageAsync(imageSource, updateUrl, isProfile) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    setUploadFinish("in_progress")
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onload = function () {
        resolve(xhr.response)
      }
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"))
      }
      xhr.responseType = "blob"
      xhr.open("GET", imageSource, true)
      xhr.send(null)
    })

    const uploadToCloud = true // config upload image to cloud

    if (uploadToCloud) {
      // const fileName = imageSource.substring(imageSource.lastIndexOf("/") + 1)
      const fileName = uuid.v4()
      const ref = firebase
        .storage()
        .ref("images/member/partner")
        .child(fileName)
      const snapshot = await ref.put(blob)

      // We're done with the blob, close and release it
      blob.close()

      const url = await snapshot.ref.getDownloadURL()
      updateUrl(url)
      if (isProfile) {
        setImage(url)
      }
    } else {
      blob.close()
    }
    setUploadFinish("finish")
  }

  const OldImage = ({ link, text }) => (
    <View style={{ marginTop: 5, alignSelf: "center" }}>
      <Image source={{ uri: link, width: 300, height: 250 }} />
      <Text
        style={{
          position: "absolute",
          fontSize: 20,
          fontWeight: "bold",
          color: "blue",
          backgroundColor: "yellow",
          bottom: 5,
          left: 10,
          padding: 5,
        }}
      >
        {text}
      </Text>
    </View>
  )

  const OldVideo = ({ link }) => (
    <View style={{ marginTop: 5 }}>
      <Video
        ref={video}
        style={{ width: 300, height: 250 }}
        source={{ uri: link }}
        useNativeControls
        resizeMode="contain"
        isLooping
      />
      <Text
        style={{
          position: "absolute",
          fontSize: 20,
          fontWeight: "bold",
          color: "white",
          backgroundColor: "red",
          bottom: 5,
          right: 10,
          padding: 5,
        }}
      >
        วิดีโอเดิมที่เคยอัพโหลด
      </Text>
    </View>
  )

  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.textFormInfo}>เพิ่ม/แก้ไข รูปภาพ และวิดีโอ</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.formControl, { marginTop: 20 }]}>
            <GetIcon type="ad" name="picture" />
            <TextInput
              value={imageFile1}
              onChangeText={(value) => setImageFile1(value)}
              style={styles.textInput}
              placeholder="ที่อยู่ URL รูปภาพ1"
            />
            <ButtonLink
              title="เลือกรูป"
              onPress={() => selectImage(setImageFile1)}
            />
          </View>
          {imageUrl1 && !imageFile1 && (
            <OldImage link={imageUrl1} text="รูปเดิมที่เคยอัพโหลด(1)" />
          )}
          {imageFile1 && (
            <View style={{ marginTop: 5, alignSelf: "center" }}>
              <Image
                source={{ uri: imageFile1, width: 315, height: 250 }}
                style={{ borderRadius: 5 }}
              />
            </View>
          )}
          <View style={styles.formControl}>
            <GetIcon type="ad" name="picture" />
            <TextInput
              value={imageFile2}
              onChangeText={(value) => setImageFile2(value)}
              style={styles.textInput}
              placeholder="ที่อยู่ URL รูปภาพ2"
            />
            <ButtonLink
              title="เลือกรูป"
              onPress={() => selectImage(setImageFile2)}
            />
          </View>
          {imageUrl2 && !imageFile2 && (
            <OldImage link={imageUrl2} text="รูปเดิมที่เคยอัพโหลด(2)" />
          )}
          {imageFile2 && (
            <View style={{ marginTop: 5, alignSelf: "center" }}>
              <Image
                source={{ uri: imageFile2, width: 315, height: 250 }}
                style={{ borderRadius: 5 }}
              />
            </View>
          )}
          <View style={styles.formControl}>
            <GetIcon type="ad" name="picture" />
            <TextInput
              value={imageFile3}
              onChangeText={(value) => setImageFile3(value)}
              style={styles.textInput}
              placeholder="ที่อยู่ URL รูปภาพ3"
            />
            <ButtonLink
              title="เลือกรูป"
              onPress={() => selectImage(setImageFile3)}
            />
          </View>
          {imageUrl3 && !imageFile3 && (
            <OldImage link={imageUrl3} text="รูปเดิมที่เคยอัพโหลด(3)" />
          )}
          {imageFile3 && (
            <View style={{ marginTop: 5, alignSelf: "center" }}>
              <Image
                source={{ uri: imageFile3, width: 315, height: 250 }}
                style={{ borderRadius: 5 }}
              />
            </View>
          )}
          <View style={styles.formControl}>
            <GetIcon type="ad" name="picture" />
            <TextInput
              value={imageFile4}
              onChangeText={(value) => setImageFile4(value)}
              style={styles.textInput}
              placeholder="ที่อยู่ URL รูปภาพ4"
            />
            <ButtonLink
              title="เลือกรูป"
              onPress={() => selectImage(setImageFile4)}
            />
          </View>
          {imageUrl4 && !imageFile4 && (
            <OldImage link={imageUrl4} text="รูปเดิมที่เคยอัพโหลด(4)" />
          )}
          {imageFile4 && (
            <View style={{ marginTop: 5, alignSelf: "center" }}>
              <Image
                source={{ uri: imageFile4, width: 315, height: 250 }}
                style={{ borderRadius: 5 }}
              />
            </View>
          )}
          <View style={styles.formControl}>
            <GetIcon type="ad" name="picture" />
            <TextInput
              value={imageFile5}
              onChangeText={(value) => setImageFile5(value)}
              style={styles.textInput}
              placeholder="ที่อยู่ URL รูปภาพ5"
            />
            <ButtonLink
              title="เลือกรูป"
              onPress={() => selectImage(setImageFile5)}
            />
          </View>
          {imageUrl5 && !imageFile5 && (
            <OldImage link={imageUrl5} text="รูปเดิมที่เคยอัพโหลด(5)" />
          )}
          {imageFile5 && (
            <View style={{ marginTop: 5, alignSelf: "center" }}>
              <Image
                source={{ uri: imageFile5, width: 315, height: 250 }}
                style={{ borderRadius: 5 }}
              />
            </View>
          )}
          <View style={styles.formControl}>
            <GetIcon type="ad" name="videocamera" />
            <TextInput
              value={imageFile6}
              onChangeText={(value) => setImageFile6(value)}
              style={styles.videoInput}
              placeholder="ที่อยู่ URL วิดีโอ"
            />
            <ButtonLink
              title="เลือกวิดีโอ"
              onPress={() => selectVideo(setImageFile6)}
            />
          </View>
          {imageUrl6 && !imageFile6 && <OldVideo link={imageUrl6} />}
          {imageFile6 && (
            <View style={{ marginTop: 5, alignSelf: "center" }}>
              <Video
                ref={video}
                style={{ width: 315, height: 250, borderRadius: 5 }}
                source={{ uri: imageFile6 }}
                useNativeControls
                resizeMode="contain"
                isLooping
              />
            </View>
          )}
        </ScrollView>
        {uploadFinish === "in_progress" && (
          <Progress.Bar
            width={200}
            indeterminate={true}
            style={{ marginTop: 10 }}
          />
        )}
        <Button
          title="อัพโหลด"
          iconLeft
          icon={
            <MaterialCommunityIcons
              name="cloud-upload"
              color="white"
              size={24}
              style={{ marginHorizontal: 8 }}
            />
          }
          buttonStyle={{
            backgroundColor: "green",
            marginTop: 20,
            borderRadius: 25,
            width: 250,
            paddingHorizontal: 15,
            height: 45,
            borderWidth: 0.5,
            marginBottom: 20,
          }}
          onPress={() => uploadAllImageVideo()}
        />
        <Button
          title="บันทึกข้อมูล"
          iconLeft
          icon={
            <AntDesign
              name="lock"
              color="white"
              size={24}
              style={{ marginHorizontal: 8 }}
            />
          }
          buttonStyle={{
            backgroundColor: "#65A3E1",
            marginTop: 5,
            borderRadius: 25,
            width: 200,
            paddingHorizontal: 15,
            height: 45,
            borderWidth: 0.5,
            marginBottom: 20,
          }}
          onPress={() => saveProfileData()}
        />
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
    marginBottom: 20,
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
  textOr: {
    fontSize: 14,
    color: "gray",
    marginTop: 50,
  },
  textInput: {
    width: 200,
    textAlign: "center",
    fontSize: 16,
    marginVertical: 5,
  },
  videoInput: {
    width: 180,
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
  textFooter: {
    position: "absolute",
    bottom: 80,
    width: "90%",
    textAlign: "center",
    flexWrap: "wrap",
    fontSize: 12,
    color: "gray",
  },
  textFormInfo: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
  },
  formControl: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    paddingHorizontal: 10,
    borderColor: "#ff2fe6",
    marginTop: 5,
    height: 40,
    borderRadius: 5,
  },
  inputControl: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    padding: 10,
    borderRadius: 25,
    marginTop: 5,
    backgroundColor: "pink",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
})

export default RegisterImageUpload
