import React, { useEffect, useState } from "react"
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
  Platform,
  Alert,
  Button as ButtonLink,
} from "react-native"
import * as Progress from "react-native-progress"
import * as ImagePicker from "expo-image-picker"
import { Video } from "expo-av"
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"
import { Button } from "react-native-elements"
import firebase from "../../../util/firebase"
import { GetIcon } from "../../components/GetIcons"
import bg from "../../../assets/login.png"

const RegisterImageUpload = ({ navigation, route }) => {
  const { navigate } = navigation
  const { bankData } = route.params
  const video = React.useRef(null)
  const { workType1, workType2, workType3, workType4 } = bankData

  const [isUploading, setUploading] = useState(false)
  const [uploadFinish, setUploadFinish] = useState(false)

  const [image, setImage] = useState(null)

  const [imgA1, setImgA1] = useState(null)
  const [imgA2, setImgA2] = useState(null)
  const [imgA3, setImgA3] = useState(null)
  const [imgA4, setImgA4] = useState(null)
  const [imgA5, setImgA5] = useState(null)
  const [imgA6, setImgA6] = useState(null)
  const [imgA1url, setImgA1url] = useState(null)
  const [imgA2url, setImgA2url] = useState(null)
  const [imgA3url, setImgA3url] = useState(null)
  const [imgA4url, setImgA4url] = useState(null)
  const [imgA5url, setImgA5url] = useState(null)
  const [imgA6url, setImgA6url] = useState(null)

  const [imgB1, setImgB1] = useState(null)
  const [imgB2, setImgB2] = useState(null)
  const [imgB3, setImgB3] = useState(null)
  const [imgB4, setImgB4] = useState(null)
  const [imgB5, setImgB5] = useState(null)
  const [imgB6, setImgB6] = useState(null)
  const [imgB1url, setImgB1url] = useState(null)
  const [imgB2url, setImgB2url] = useState(null)
  const [imgB3url, setImgB3url] = useState(null)
  const [imgB4url, setImgB4url] = useState(null)
  const [imgB5url, setImgB5url] = useState(null)
  const [imgB6url, setImgB6url] = useState(null)

  const [imgC1, setImgC1] = useState(null)
  const [imgC2, setImgC2] = useState(null)
  const [imgC3, setImgC3] = useState(null)
  const [imgC4, setImgC4] = useState(null)
  const [imgC5, setImgC5] = useState(null)
  const [imgC6, setImgC6] = useState(null)
  const [imgC1url, setImgC1url] = useState(null)
  const [imgC2url, setImgC2url] = useState(null)
  const [imgC3url, setImgC3url] = useState(null)
  const [imgC4url, setImgC4url] = useState(null)
  const [imgC5url, setImgC5url] = useState(null)
  const [imgC6url, setImgC6url] = useState(null)

  const [imgD1, setImgD1] = useState(null)
  const [imgD2, setImgD2] = useState(null)
  const [imgD3, setImgD3] = useState(null)
  const [imgD4, setImgD4] = useState(null)
  const [imgD5, setImgD5] = useState(null)
  const [imgD6, setImgD6] = useState(null)
  const [imgD1url, setImgD1url] = useState(null)
  const [imgD2url, setImgD2url] = useState(null)
  const [imgD3url, setImgD3url] = useState(null)
  const [imgD4url, setImgD4url] = useState(null)
  const [imgD5url, setImgD5url] = useState(null)
  const [imgD6url, setImgD6url] = useState(null)

  const handleNextData = () => {
    navigate("Partner-Login-Form", {
      imageData: {
        ...bankData,
        image,
        imgA1: imgA1url,
        imgA2: imgA2url,
        imgA3: imgA3url,
        imgA4: imgA4url,
        imgA5: imgA5url,
        imgA6: imgA6url,
        imgB1: imgB1url,
        imgB2: imgB2url,
        imgB3: imgB3url,
        imgB4: imgB4url,
        imgB5: imgB5url,
        imgB6: imgB6url,
        imgC1: imgC1url,
        imgC2: imgC2url,
        imgC3: imgC3url,
        imgC4: imgC4url,
        imgC5: imgC5url,
        imgC6: imgC6url,
        imgD1: imgD1url,
        imgD2: imgD2url,
        imgD3: imgD3url,
        imgD4: imgD4url,
        imgD5: imgD5url,
        imgD6: imgD6url,
      },
    })
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

  const uploadAllImageVideo = () => {
    setUploadFinish(false)
    if (workType1 === "Y") {
      if (imgA1) {
        uploadImageAsync(imgA1, setImgA1url)
        setImage(imgA1url)
      }
      if (imgA2) {
        uploadImageAsync(imgA2, setImgA2url)
      }
      if (imgA3) {
        uploadImageAsync(imgA3, setImgA3url)
      }
      if (imgA4) {
        uploadImageAsync(imgA4, setImgA4url)
      }
      if (imgA5) {
        uploadImageAsync(imgA5, setImgA5url)
      }
      if (imgA6) {
        uploadImageAsync(imgA6, setImgA6url)
      }
    }
    if (workType2 === "Y") {
      if (imgB1) {
        uploadImageAsync(imgB1, setImgB1url)
        setImage(imgB1url)
      }
      if (imgB2) {
        uploadImageAsync(imgB2, setImgB2url)
      }
      if (imgB3) {
        uploadImageAsync(imgB3, setImgB3url)
      }
      if (imgB4) {
        uploadImageAsync(imgB4, setImgB4url)
      }
      if (imgB5) {
        uploadImageAsync(imgB5, setImgB5url)
      }
      if (imgB6) {
        uploadImageAsync(imgB6, setImgB6url)
      }
    }
    if (workType3 === "Y") {
      if (imgC1) {
        uploadImageAsync(imgC1, setImgC1url)
        setImage(imgC1url)
      }
      if (imgC2) {
        uploadImageAsync(imgC2, setImgC2url)
      }
      if (imgC3) {
        uploadImageAsync(imgC3, setImgC3url)
      }
      if (imgC4) {
        uploadImageAsync(imgC4, setImgC4url)
      }
      if (imgC5) {
        uploadImageAsync(imgC5, setImgC5url)
      }
      if (imgC6) {
        uploadImageAsync(imgC6, setImgC6url)
      }
    }
    if (workType4 === "Y") {
      if (imgD1) {
        uploadImageAsync(imgD1, setImgD1url)
        setImage(imgD1url)
      }
      if (imgD2) {
        uploadImageAsync(imgD2, setImgD2url)
      }
      if (imgD3) {
        uploadImageAsync(imgD3, setImgD3url)
      }
      if (imgD4) {
        uploadImageAsync(imgD4, setImgD4url)
      }
      if (imgD5) {
        uploadImageAsync(imgD5, setImgD5url)
      }
      if (imgD6) {
        uploadImageAsync(imgD6, setImgD6url)
      }
    }
    setUploadFinish(true)
  }

  async function uploadImageAsync(imageSource, updateUrl) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    setUploading(true)
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onload = function () {
        resolve(xhr.response)
      }
      xhr.onerror = function (e) {
        console.log(e)
        reject(new TypeError("Network request failed"))
      }
      xhr.responseType = "blob"
      xhr.open("GET", imageSource, true)
      xhr.send(null)
    })

    const fileName = imageSource.substring(imageSource.lastIndexOf("/") + 1)
    const ref = firebase.storage().ref("images/member/partner").child(fileName)
    const snapshot = await ref.put(blob)

    // We're done with the blob, close and release it
    blob.close()

    setUploading(false)
    const url = await snapshot.ref.getDownloadURL()
    updateUrl(url);
  }

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
              <ButtonLink
                title="เลือกรูป"
                onPress={() => selectImage(setImgA1)}
              />
            </View>
            {imgA1 && (
              <View style={{ marginTop: 5 }}>
                <Image source={{ uri: imgA1, width: 300, height: 250 }} />
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
              <ButtonLink
                title="เลือกรูป"
                onPress={() => selectImage(setImgA2)}
              />
            </View>
            {imgA2 && (
              <View style={{ marginTop: 5 }}>
                <Image source={{ uri: imgA2, width: 300, height: 250 }} />
              </View>
            )}
            <View style={styles.formControl}>
              <GetIcon type="ad" name="picture" />
              <TextInput
                value={imgA3}
                onChangeText={(value) => setImgA3(value)}
                style={styles.textInput}
                placeholder="ที่อยู่ URL รูปภาพ3"
              />
              <ButtonLink
                title="เลือกรูป"
                onPress={() => selectImage(setImgA3)}
              />
            </View>
            {imgA3 && (
              <View style={{ marginTop: 5 }}>
                <Image source={{ uri: imgA3, width: 300, height: 250 }} />
              </View>
            )}
            <View style={styles.formControl}>
              <GetIcon type="ad" name="picture" />
              <TextInput
                value={imgA4}
                onChangeText={(value) => setImgA4(value)}
                style={styles.textInput}
                placeholder="ที่อยู่ URL รูปภาพ4"
              />
              <ButtonLink
                title="เลือกรูป"
                onPress={() => selectImage(setImgA4)}
              />
            </View>
            {imgA4 && (
              <View style={{ marginTop: 5 }}>
                <Image source={{ uri: imgA4, width: 300, height: 250 }} />
              </View>
            )}
            <View style={styles.formControl}>
              <GetIcon type="ad" name="picture" />
              <TextInput
                value={imgA5}
                onChangeText={(value) => setImgA5(value)}
                style={styles.textInput}
                placeholder="ที่อยู่ URL รูปภาพ5"
              />
              <ButtonLink
                title="เลือกรูป"
                onPress={() => selectImage(setImgA5)}
              />
            </View>
            {imgA5 && (
              <View style={{ marginTop: 5 }}>
                <Image source={{ uri: imgA5, width: 300, height: 250 }} />
              </View>
            )}
            <View style={styles.formControl}>
              <GetIcon type="ad" name="videocamera" />
              <TextInput
                value={imgA6}
                onChangeText={(value) => setImgA6(value)}
                style={styles.textInput}
                placeholder="ที่อยู่ URL วิดีโอ"
              />
              <ButtonLink
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
              <ButtonLink
                title="เลือกรูป"
                onPress={() => selectImage(setImgB1)}
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
              <ButtonLink
                title="เลือกรูป"
                onPress={() => selectImage(setImgB2)}
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
              <ButtonLink
                title="เลือกรูป"
                onPress={() => selectImage(setImgB3)}
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
              <ButtonLink
                title="เลือกรูป"
                onPress={() => selectImage(setImgB4)}
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
              <ButtonLink
                title="เลือกรูป"
                onPress={() => selectImage(setImgB5)}
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
              <ButtonLink
                title="เลือกวิดีโอ"
                onPress={() => selectVideo(setImgB6)}
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
              <ButtonLink
                title="เลือกรูป"
                onPress={() => selectImage(setImgC1)}
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
              <ButtonLink
                title="เลือกรูป"
                onPress={() => selectImage(setImgC2)}
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
              <ButtonLink
                title="เลือกรูป"
                onPress={() => selectImage(setImgC3)}
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
              <ButtonLink
                title="เลือกรูป"
                onPress={() => selectImage(setImgC4)}
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
              <ButtonLink
                title="เลือกรูป"
                onPress={() => selectImage(setImgC5)}
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
              <ButtonLink
                title="เลือกวิดีโอ"
                onPress={() => selectImage(setImgC6)}
              />
            </View>
          </View>
        )}
        {workType4 === "Y" && (
          <View style={styles.inputControl}>
            <Text
              style={{ marginBottom: 5, fontWeight: "bold", color: "blue" }}
            >
              ประเภท Pretty นวดแผนไทย
            </Text>
            <View style={styles.formControl}>
              <GetIcon type="ad" name="picture" />
              <TextInput
                value={imgD1}
                onChangeText={(value) => setImgD1(value)}
                style={styles.textInput}
                placeholder="ที่อยู่ URL รูปภาพ1"
              />
              <ButtonLink
                title="เลือกรูป"
                onPress={() => selectImage(setImgD1)}
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
              <ButtonLink
                title="เลือกรูป"
                onPress={() => selectImage(setImgD2)}
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
              <ButtonLink
                title="เลือกรูป"
                onPress={() => selectImage(setImgD3)}
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
              <ButtonLink
                title="เลือกรูป"
                onPress={() => selectImage(setImgD4)}
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
              <ButtonLink
                title="เลือกรูป"
                onPress={() => selectImage(setImgD5)}
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
              <ButtonLink
                title="เลือกรูป"
                onPress={() => selectVideo(setImgD6)}
              />
            </View>
          </View>
        )}
      </ScrollView>
      {isUploading && (
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
        }}
        onPress={() => uploadAllImageVideo()}
      />
      {uploadFinish && (
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
            marginTop: 5,
            borderRadius: 25,
            width: 250,
            paddingHorizontal: 15,
            height: 45,
            borderWidth: 0.5,
          }}
          onPress={() => handleNextData()}
        />
      )}
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
