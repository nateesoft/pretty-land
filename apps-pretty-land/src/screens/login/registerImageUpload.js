import React, { useEffect, useState } from "react"
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
  Button,
  Platform,
  Alert,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import { Video } from "expo-av"
import { AntDesign } from "@expo/vector-icons"

import firebase from "../../../util/firebase"
import { GetIcon } from "../../components/GetIcons"
import bg from "../../../assets/login.png"

const RegisterImageUpload = ({ navigation, route }) => {
  const { navigate } = navigation
  const { bankData } = route.params
  const video = React.useRef(null)
  const { workType1, workType2, workType3, workType4 } = bankData

  const [imgA1, setImgA1] = useState(null)
  const [imgA2, setImgA2] = useState(null)
  const [imgA3, setImgA3] = useState(null)
  const [imgA4, setImgA4] = useState(null)
  const [imgA5, setImgA5] = useState(null)
  const [imgA6, setImgA6] = useState(null)

  const [imgB1, setImgB1] = useState(null)
  const [imgB2, setImgB2] = useState(null)
  const [imgB3, setImgB3] = useState(null)
  const [imgB4, setImgB4] = useState(null)
  const [imgB5, setImgB5] = useState(null)
  const [imgB6, setImgB6] = useState(null)

  const [imgC1, setImgC1] = useState(null)
  const [imgC2, setImgC2] = useState(null)
  const [imgC3, setImgC3] = useState(null)
  const [imgC4, setImgC4] = useState(null)
  const [imgC5, setImgC5] = useState(null)
  const [imgC6, setImgC6] = useState(null)

  const [imgD1, setImgD1] = useState(null)
  const [imgD2, setImgD2] = useState(null)
  const [imgD3, setImgD3] = useState(null)
  const [imgD4, setImgD4] = useState(null)
  const [imgD5, setImgD5] = useState(null)
  const [imgD6, setImgD6] = useState(null)

  const [uploading, setUploading] = useState(false)
  const [transferred, setTransferred] = useState(0)

  const handleNextData = () => {
    navigate("Partner-Login-Form", {
      imageData: {
        ...bankData,
        imgA1,
        imgA2,
        imgA3,
        imgA4,
        imgA5,
        imgA6,
        imgB1,
        imgB2,
        imgB3,
        imgB4,
        imgB5,
        imgB6,
        imgC1,
        imgC2,
        imgC3,
        imgC4,
        imgC5,
        imgC6,
        imgD1,
        imgD2,
        imgD3,
        imgD4,
        imgD5,
        imgD6,
      },
    })
  }

  const uploadImage = ({ file, handleImg }) => {
    const fileName = file.substring(file.lastIndexOf("/") + 1)
    const uploadUri = Platform.OS === "ios" ? file.replace("file://", "") : file

    setUploading(true)
    setTransferred(0)

    // Create a storage ref
    const storageRef = firebase.storage().ref(`/images/partners/${fileName}`)

    // Upload file
    const task = storageRef.put(uploadUri)

    // Update progress bar
    task.on(
      "state_changed",
      function progress(snapshot) {
        const percentage =
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log("progress", percentage)
      },
      function error(err) {
        console.log("err:")
        Alert.alert(err)
      },
      function complete() {
        Alert.alert(
          "Photo uploaded!",
          "Your photo has been uploaded to Firebase Cloud Storage!"
        )
        setUploading(false)
        handleImg(null)
      }
    )
  }

  const selectImage = async (handleImg) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.cancelled) {
      handleImg(result.uri)
    }
  }

  const selectVideo = async (handleVideo) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.cancelled) {
      handleVideo(result.uri)
    }
  }

  useEffect(() => {
    ;(async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== "granted") {
          Alert.alert(
            "Sorry, we need camera roll permissions to make this work!"
          )
        }
      }
    })()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={bg} />
      <Text style={styles.textLogo}>PRETTY LAND</Text>
      <Text style={styles.textFormInfo}>เพิ่มรูปภาพ และวิดีโอ</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {workType1 === "Y" && (
          <View style={styles.inputControl}>
            <Text
              style={{ marginBottom: 5, fontWeight: "bold", color: "blue" }}
            >
              ประเภท Pretty/Mc
            </Text>
            <View style={styles.formControl}>
              <GetIcon type="ad" name="picture" />
              <TextInput
                value={imgA1}
                onChangeText={(value) => setImgA1(value)}
                style={styles.textInput}
                placeholder="ที่อยู่ URL รูปภาพ1"
              />
              <Button title="เลือกรูป" onPress={() => selectImage(setImgA1)} />
            </View>
            {imgA1 && (
              <View style={{ marginTop: 5 }}>
                <Image source={{ uri: imgA1, width: 300, height: 250 }} />
                <Button
                  title="upload"
                  onPress={() =>
                    uploadImage({ file: imgA1, handleImg: setImgA1 })
                  }
                />
              </View>
            )}
            <View style={styles.formControl}>
              <GetIcon type="ad" name="picture" />
              <TextInput
                value={imgA2}
                onChangeText={(value) => setImgA2(value)}
                style={styles.textInput}
                placeholder="ที่อยู่ URL รูปภาพ2"
              />
            </View>
            <View style={styles.formControl}>
              <GetIcon type="ad" name="picture" />
              <TextInput
                value={imgA3}
                onChangeText={(value) => setImgA3(value)}
                style={styles.textInput}
                placeholder="ที่อยู่ URL รูปภาพ3"
              />
            </View>
            <View style={styles.formControl}>
              <GetIcon type="ad" name="picture" />
              <TextInput
                value={imgA4}
                onChangeText={(value) => setImgA4(value)}
                style={styles.textInput}
                placeholder="ที่อยู่ URL รูปภาพ4"
              />
            </View>
            <View style={styles.formControl}>
              <GetIcon type="ad" name="picture" />
              <TextInput
                value={imgA5}
                onChangeText={(value) => setImgA5(value)}
                style={styles.textInput}
                placeholder="ที่อยู่ URL รูปภาพ5"
              />
            </View>
            <View style={styles.formControl}>
              <GetIcon type="ad" name="videocamera" />
              <TextInput
                value={imgA6}
                onChangeText={(value) => setImgA6(value)}
                style={styles.textInput}
                placeholder="ที่อยู่ URL วิดีโอ"
              />
              <Button
                title="เลือกวิดีโอ"
                onPress={() => selectVideo(setImgA6)}
              />
            </View>
            {imgA6 && (
              <View style={{ marginTop: 5 }}>
                <Video
                  ref={video}
                  style={{ width: 300, height: 250 }}
                  source={{ uri: imgA6 }}
                  useNativeControls
                  resizeMode="contain"
                  isLooping
                />
              </View>
            )}
          </View>
        )}
        {workType2 === "Y" && (
          <View style={styles.inputControl}>
            <Text
              style={{ marginBottom: 5, fontWeight: "bold", color: "blue" }}
            >
              ประเภท Pretty Entertain
            </Text>
            <View style={styles.formControl}>
              <GetIcon type="ad" name="picture" />
              <TextInput
                value={imgB1}
                onChangeText={(value) => setImgB1(value)}
                style={styles.textInput}
                placeholder="ที่อยู่ URL รูปภาพ1"
              />
            </View>
            <View style={styles.formControl}>
              <GetIcon type="ad" name="picture" />
              <TextInput
                value={imgB2}
                onChangeText={(value) => setImgB2(value)}
                style={styles.textInput}
                placeholder="ที่อยู่ URL รูปภาพ2"
              />
            </View>
            <View style={styles.formControl}>
              <GetIcon type="ad" name="picture" />
              <TextInput
                value={imgB3}
                onChangeText={(value) => setImgB3(value)}
                style={styles.textInput}
                placeholder="ที่อยู่ URL รูปภาพ3"
              />
            </View>
            <View style={styles.formControl}>
              <GetIcon type="ad" name="picture" />
              <TextInput
                value={imgB4}
                onChangeText={(value) => setImgB4(value)}
                style={styles.textInput}
                placeholder="ที่อยู่ URL รูปภาพ4"
              />
            </View>
            <View style={styles.formControl}>
              <GetIcon type="ad" name="picture" />
              <TextInput
                value={imgB5}
                onChangeText={(value) => setImgB5(value)}
                style={styles.textInput}
                placeholder="ที่อยู่ URL รูปภาพ5"
              />
            </View>
            <View style={styles.formControl}>
              <GetIcon type="ad" name="videocamera" />
              <TextInput
                value={imgB6}
                onChangeText={(value) => setImgB6(value)}
                style={styles.textInput}
                placeholder="ที่อยู่ URL วิดีโอ"
              />
            </View>
          </View>
        )}
        {workType3 === "Y" && (
          <View style={styles.inputControl}>
            <Text
              style={{ marginBottom: 5, fontWeight: "bold", color: "blue" }}
            >
              ประเภท Coyote
            </Text>
            <View style={styles.formControl}>
              <GetIcon type="ad" name="picture" />
              <TextInput
                value={imgC1}
                onChangeText={(value) => setImgC1(value)}
                style={styles.textInput}
                placeholder="ที่อยู่ URL รูปภาพ1"
              />
            </View>
            <View style={styles.formControl}>
              <GetIcon type="ad" name="picture" />
              <TextInput
                value={imgC2}
                onChangeText={(value) => setImgC2(value)}
                style={styles.textInput}
                placeholder="ที่อยู่ URL รูปภาพ2"
              />
            </View>
            <View style={styles.formControl}>
              <GetIcon type="ad" name="picture" />
              <TextInput
                value={imgC3}
                onChangeText={(value) => setImgC3(value)}
                style={styles.textInput}
                placeholder="ที่อยู่ URL รูปภาพ3"
              />
            </View>
            <View style={styles.formControl}>
              <GetIcon type="ad" name="picture" />
              <TextInput
                value={imgC4}
                onChangeText={(value) => setImgC4(value)}
                style={styles.textInput}
                placeholder="ที่อยู่ URL รูปภาพ4"
              />
            </View>
            <View style={styles.formControl}>
              <GetIcon type="ad" name="picture" />
              <TextInput
                value={imgC5}
                onChangeText={(value) => setImgC5(value)}
                style={styles.textInput}
                placeholder="ที่อยู่ URL รูปภาพ5"
              />
            </View>
            <View style={styles.formControl}>
              <GetIcon type="ad" name="videocamera" />
              <TextInput
                value={imgC6}
                onChangeText={(value) => setImgC6(value)}
                style={styles.textInput}
                placeholder="ที่อยู่ URL วิดีโอ"
              />
            </View>
          </View>
        )}
        {workType4 === "Y" && (
          <View style={styles.inputControl}>
            <Text
              style={{ marginBottom: 5, fontWeight: "bold", color: "blue" }}
            >
              ประเภท Pretty Massage
            </Text>
            <View style={styles.formControl}>
              <GetIcon type="ad" name="picture" />
              <TextInput
                value={imgD1}
                onChangeText={(value) => setImgD1(value)}
                style={styles.textInput}
                placeholder="ที่อยู่ URL รูปภาพ1"
              />
            </View>
            <View style={styles.formControl}>
              <GetIcon type="ad" name="picture" />
              <TextInput
                value={imgD2}
                onChangeText={(value) => setImgD2(value)}
                style={styles.textInput}
                placeholder="ที่อยู่ URL รูปภาพ2"
              />
            </View>
            <View style={styles.formControl}>
              <GetIcon type="ad" name="picture" />
              <TextInput
                value={imgD3}
                onChangeText={(value) => setImgD3(value)}
                style={styles.textInput}
                placeholder="ที่อยู่ URL รูปภาพ3"
              />
            </View>
            <View style={styles.formControl}>
              <GetIcon type="ad" name="picture" />
              <TextInput
                value={imgD4}
                onChangeText={(value) => setImgD4(value)}
                style={styles.textInput}
                placeholder="ที่อยู่ URL รูปภาพ4"
              />
            </View>
            <View style={styles.formControl}>
              <GetIcon type="ad" name="picture" />
              <TextInput
                value={imgD5}
                onChangeText={(value) => setImgD5(value)}
                style={styles.textInput}
                placeholder="ที่อยู่ URL รูปภาพ5"
              />
            </View>
            <View style={styles.formControl}>
              <GetIcon type="ad" name="videocamera" />
              <TextInput
                value={imgD6}
                onChangeText={(value) => setImgD6(value)}
                style={styles.textInput}
                placeholder="ที่อยู่ URL วิดีโอ"
              />
            </View>
          </View>
        )}
      </ScrollView>
      <Button
        title="เพิ่มข้อมูลถัดไป"
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
          marginTop: 20,
          borderRadius: 25,
          width: 250,
          paddingHorizontal: 15,
          height: 45,
          borderWidth: 0.5,
        }}
        onPress={() => handleNextData()}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
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
    backgroundColor: "white",
    width: 200,
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
    borderColor: "#00716F",
    backgroundColor: "white",
    marginTop: 5,
    height: 40,
    borderRadius: 50,
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
})

export default RegisterImageUpload
