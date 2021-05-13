import React from "react"
import {
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  View,
  Text,
  Image,
} from "react-native"
import { Col, Row, Grid } from "react-native-easy-grid"

import Img1 from "../../../../assets/img_example/img1.png"
import Img2 from "../../../../assets/img_example/img2.png"
import Img3 from "../../../../assets/img_example/img3.png"
import Img4 from "../../../../assets/img_example/img4.png"

const PartnerCategory = ({ navigation }) => {
  const [items, setItems] = React.useState([
    {
      id: 1,
      type: "1",
      title: "พริตตี้ Event",
      info: "0 รายการ",
      postQty: 0,
      img: Img1,
    },
    {
      id: 2,
      type: "2",
      title: "โคโยตี้",
      info: "10 รายการ",
      postQty: 10,
      img: Img2,
    },
    {
      id: 3,
      type: "3",
      title: "พริตตี้ Entertain",
      info: "3 รายการ",
      postQty: 3,
      img: Img3,
    },
    {
      id: 4,
      type: "4",
      title: "พริตตี้ นวดแผนไทย",
      info: "8 รายการ",
      postQty: 8,
      img: Img4,
    },
  ])
  const onPressOptions = (item) => {
    if (item.postQty === 0) {
      navigation.navigate("Create-Post-Form", { item })
    } else {
      navigation.navigate("c-Work", {
        screen: "Post-List",
        params: { partnerType: item.type },
      })
    }
  }

  const DisplayCard = ({ data }) => (
    <TouchableHighlight
      underlayColor="pink"
      onPress={() => onPressOptions(data)}
    >
      <View
        style={{
          backgroundColor: "red",
          padding: 10,
          width: "100%",
          alignItems: "center",
          borderRadius: 5,
        }}
      >
        <Image
          style={styles.optionsPhoto}
          source={data.img}
          style={{ height: 280, width: "100%", marginBottom: 3 }}
        />
        <Text style={styles.optionsName}>{data.title}</Text>
        <Text style={styles.optionsInfo}>({data.info})</Text>
      </View>
    </TouchableHighlight>
  )
  return (
    <ScrollView>
      <View style={styles.container}>
        <Grid>
          <Row style={{ marginVertical: 5 }}>
            <Col style={{ marginRight: 5 }}>
              <DisplayCard
                style={styles.cardContainer}
                key={1}
                data={items[0]}
              />
            </Col>
            <Col>
              <DisplayCard
                style={styles.cardContainer}
                key={1}
                data={items[1]}
              />
            </Col>
          </Row>
          <Row style={{ marginVertical: 5 }}>
            <Col style={{ marginRight: 5 }}>
              <DisplayCard
                style={styles.cardContainer}
                key={1}
                data={items[2]}
              />
            </Col>
            <Col>
              <DisplayCard
                style={styles.cardContainer}
                key={1}
                data={items[3]}
              />
            </Col>
          </Row>
        </Grid>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  cardContainer: {
    height: 100,
    borderWidth: 1.5,
    borderColor: "red",
    backgroundColor: "red",
  },
  optionsName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  optionsInfo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  optionsPhoto: {},
})

export default PartnerCategory
