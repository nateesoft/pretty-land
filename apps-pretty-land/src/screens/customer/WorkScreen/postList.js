import React from "react"
import { SafeAreaView, FlatList, View } from "react-native"
import { ListItem, Avatar } from "react-native-elements"
import { Button } from "react-native-elements/dist/buttons/Button"
import { Entypo } from "@expo/vector-icons"

import { getPostList } from '../../../data/apis'

const PostListScreen = ({ navigation, route }) => {
  const { partnerType } = route.params
  const filterList = getPostList().filter((item) => {
    if (partnerType === "all") {
      return item
    }
    return item.partnerType === partnerType
  })

  const onPressOptions = (item, status) => {
    if (status === "wait_customer_select_partner") {
      navigation.navigate("Partner-List-Select", { item })
    } else if (status === "wait_customer_payment") {
      navigation.navigate("Payment-Form")
    } else {
      navigation.navigate("Review-Task", { status })
    }
  }

  const createNewPost = () => {
    navigation.navigate("Create-New_Post", {
      data: {

      },
      item: {

      }
    })
  }

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <ListItem bottomDivider onPress={() => onPressOptions(item, item.status)}>
      <Avatar source={item.image} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
        <ListItem.Subtitle>Status: {item.statusText}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  )

  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={keyExtractor}
        data={filterList}
        renderItem={renderItem}
      />
      <View>
        <Button
          icon={
            <Entypo
              name="new-message"
              color="white"
              size={24}
              style={{ marginHorizontal: 8 }}
            />
          }
          title="เขียน POST ใหม่"
          buttonStyle={{
            backgroundColor: "#269325",
            margin: 5,
            borderRadius: 75,
            height: 50,
          }}
          onPress={()=>createNewPost()}
        />
      </View>
    </SafeAreaView>
  )
}

export default PostListScreen
