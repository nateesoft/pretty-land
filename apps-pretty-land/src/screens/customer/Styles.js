import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#cccccc",
    borderWidth: 0.5,
    borderRadius: 20,
  },
  optionsName: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginTop: 8,
  },
  optionsInfo: {
    marginTop: 3,
    marginBottom: 5,
    fontSize: 15,
  },
  optionsPhoto: {
    flex: 1,
    width: 350,
    height: 150,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: "blue",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  cardDetail: {
    flex: 1,
    alignItems: "center",
    padding: 5,
    margin: 10,
  },
  optionsNameDetail: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginBottom: 15,
    marginTop: 10,
  },
  optionsNameDetail2: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginBottom: 15,
    marginTop: 10,
  },
  categoriesItemContainer: {
    flex: 1,
    margin: 10,
    padding: 10,
    justifyContent: "center",
    height: 50,
    borderColor: "#cccccc",
    borderWidth: 0.5,
    borderRadius: 10,
    width: 350,
  },
  inputForm: {
    padding: 5,
    margin: 5,
    textAlign: "right",
  },
  viewCard: {
    width: "100%",
    backgroundColor: "pink",
    borderRadius: 20,
    padding: 5,
  },
})

export default styles
