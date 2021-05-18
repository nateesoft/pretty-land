import React from "react"
import {
  SafeAreaView,
  FlatList,
  View,
  StyleSheet,
  Image,
  RefreshControl,
} from "react-native"
import { ListItem, Text } from "react-native-elements"
import ProgressCircle from "react-native-progress-circle"
import DropDownPicker from "react-native-dropdown-picker"

import { allGroupContryWork, getCountryList } from "../../../data/apis"

const AllTaskListScreen = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = React.useState(false)

  const [openSelectCountry, setOpenSelectCountry] = React.useState(false)
  const [country, setCountry] = React.useState("")
  const [countryList, setCountryList] = React.useState(getCountryList())

  const filterList = allGroupContryWork().filter((item) => {
    return item
  })

  const handleRefresh = () => {
    console.log("refresh data list")
  }

  const onPressOptions = (item) => {
    navigation.navigate("All-Customer-Post-List", { item })
  }

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      onPress={() => onPressOptions(item)}
      containerStyle={{
        borderRadius: 8,
        marginVertical: 5,
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
          จังหวัด: {item.province}
        </ListItem.Title>
        <ListItem.Title
          style={{
            marginLeft: 15,
            marginBottom: 5,
            paddingHorizontal: 5,
          }}
        >
          {item.work1} ({item.prettyMcQty})
        </ListItem.Title>
        <ListItem.Title
          style={{
            marginLeft: 15,
            marginBottom: 5,
            paddingHorizontal: 5,
          }}
        >
          {item.work2} ({item.prettyEventQty})
        </ListItem.Title>
        <ListItem.Title
          style={{
            marginLeft: 15,
            marginBottom: 5,
            paddingHorizontal: 5,
          }}
        >
          {item.work3} ({item.coyoteQty})
        </ListItem.Title>
        <ListItem.Title
          style={{
            marginLeft: 15,
            marginBottom: 5,
            paddingHorizontal: 5,
          }}
        >
          {item.work4} ({item.prettyMassage})
        </ListItem.Title>
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

  return (
    <SafeAreaView>
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
        />
        <FlatList
          keyExtractor={keyExtractor}
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
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: "white",
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
})

export default AllTaskListScreen
