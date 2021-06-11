import React, { useState, useEffect } from "react"
import {
  SafeAreaView,
  FlatList,
  View,
  StyleSheet,
  Image,
  RefreshControl,
  ImageBackground,
} from "react-native"
import { ListItem, Text } from "react-native-elements"
import ProgressCircle from "react-native-progress-circle"
import DropDownPicker from "react-native-dropdown-picker"

import bgImage from "../../../../assets/bg.png"
import CardNotfound from "../../../components/CardNotfound"
import { getCountryList } from "../../../data/apis"

import firebase from "../../../../util/firebase"
import { snapshotToArrayProvinceGroup } from "../../../../util"
import { AppConfig } from "../../../Constants"

const AllTaskListScreen = ({ navigation, route }) => {
  const { userId } = route.params
  const [refreshing, setRefreshing] = useState(false)
  const [filterList, setFilterList] = useState([])

  const [openSelectCountry, setOpenSelectCountry] = useState(false)
  const [country, setCountry] = useState("")
  const [countryList, setCountryList] = useState(getCountryList())
  const [profile, setProfile] = useState({})

  const handleRefresh = () => {
    console.log("handleRefresh")
  }

  const onPressOptions = (item) => {
    navigation.navigate("All-Customer-Post-List", {
      profile,
      item: { ...item },
    })
  }

  const renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      onPress={() => onPressOptions(item)}
      containerStyle={{
        borderRadius: 8,
        marginVertical: 5,
        backgroundColor: null,
      }}
    >
      <ListItem.Content style={{ margin: 10 }}>
        <ListItem.Title
          style={{
            fontSize: 20,
            marginBottom: 5,
            paddingHorizontal: 5,
            fontWeight: "bold",
          }}
        >
          จังหวัด: {item.provinceName}
        </ListItem.Title>
        {profile.type1 && (
          <ListItem.Title
            style={{
              marginLeft: 15,
              marginBottom: 5,
              paddingHorizontal: 5,
            }}
          >
            {AppConfig.PartnerType.type1} ({item.partner1})
          </ListItem.Title>
        )}
        {profile.type2 && (
          <ListItem.Title
            style={{
              marginLeft: 15,
              marginBottom: 5,
              paddingHorizontal: 5,
            }}
          >
            {AppConfig.PartnerType.type2} ({item.partner2})
          </ListItem.Title>
        )}
        {profile.type3 && (
          <ListItem.Title
            style={{
              marginLeft: 15,
              marginBottom: 5,
              paddingHorizontal: 5,
            }}
          >
            {AppConfig.PartnerType.type3} ({item.partner3})
          </ListItem.Title>
        )}
        {profile.type4 && (
          <ListItem.Title
            style={{
              marginLeft: 15,
              marginBottom: 5,
              paddingHorizontal: 5,
            }}
          >
            {AppConfig.PartnerType.type4} ({item.partner4})
          </ListItem.Title>
        )}
      </ListItem.Content>
      <ProgressCircle
        percent={30}
        radius={17}
        borderWidth={1.5}
        color="f580084"
        shadowColor="#FFF"
        bgColor="#FFF"
      >
        <Image source={require("../../../../assets/icons/pl.png")} />
      </ProgressCircle>
    </ListItem>
  )

  useEffect(() => {
    const ref = firebase.database().ref(`members/${userId}`)
    const listener = ref.on("value", (snapshot) => {
      setProfile({ ...snapshot.val() })
    })
    return () => ref.off("value", listener)
  }, [])

  useEffect(() => {
    const ref = firebase.database().ref(`group_posts`)
    const listener = ref.on("value", (snapshot) => {
      const postsList = snapshotToArrayProvinceGroup(snapshot)
      setFilterList(postsList)
    })

    return () => ref.off("value", listener)
  }, [])

  return (
    <ImageBackground
      source={bgImage}
      style={styles.imageBg}
      resizeMode="stretch"
    >
      <SafeAreaView style={{ height: "100%" }}>
        <View style={styles.container}>
          <Text style={styles.textTopic}>งานว่าจ้างทั้งหมดในระบบ</Text>
          <Text style={styles.textTopicDetail}>ที่ตรงกับความต้องการ</Text>
          <DropDownPicker
            placeholder="เลือกจังหวัด"
            open={openSelectCountry}
            setOpen={setOpenSelectCountry}
            value={country}
            setValue={setCountry}
            items={countryList}
            setItems={setCountryList}
            textStyle={{ fontSize: 18 }}
            zIndex={20}
            searchable={false}
            selectedItemContainerStyle={{ backgroundColor: "#facaff" }}
          />
          {filterList.length === 0 && (
            <CardNotfound text="ไม่พบข้อมูลโพสท์ในระบบ" />
          )}
          {filterList.length > 0 && (
            <FlatList
              keyExtractor={(item) => item.provinceId.toString()}
              data={filterList}
              renderItem={renderItem}
              style={{
                height: 600,
                borderWidth: 1,
                borderColor: "#eee",
                padding: 5,
              }}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => handleRefresh()}
                />
              }
            />
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  textTopic: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginTop: 10,
  },
  textTopicDetail: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginBottom: 15,
    marginTop: 10,
  },
  btnNewPost: {
    backgroundColor: "#35D00D",
    margin: 5,
    borderRadius: 75,
    height: 45,
    width: 250,
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
})

export default AllTaskListScreen
