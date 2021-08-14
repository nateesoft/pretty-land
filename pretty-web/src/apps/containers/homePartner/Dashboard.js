import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useHistory } from "react-router-dom"

import { AppConfig } from "../../../Constants"
import firebase from "../../../util/firebase"
import { getConfigList } from "../../../apis"

const Container = styled.div`
  background-image: url("assets/bg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: red;
  border-radius: 10px;
`
const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: space-between;
  border-radius: 5px;
`
const Item = styled.div`
  width: 46%;
  height: 40vh;
  margin: 5px;
  border-radius: 5px;
  position: relative;
`

const ItemBottom = styled.div`
  position: absolute;
  bottom: 0;
  text-align: center;
  width: 100%;
`

export default function Dashboard() {
  const [items, setItems] = useState([])
  const history = useHistory()
  const { member } = history.location.state

  useEffect(() => {
    const ref = firebase.database().ref(`${AppConfig.env}/posts`)
    const listener = ref.on("value", (snapshot) => {
      getConfigList()
        .then((res) => setItems(res))
        .catch((err) => alert(err))
    })
    return () => {
      ref.off("value", listener)
    }
  }, [])

  return (
    <Container>
      <ItemContainer>
        {member.type1 && (
          <Item>
            {items[0] && (
              <img
                src={items[0].image_url}
                style={{
                  width: "90%",
                  height: "80%",
                  borderRadius: "5px",
                  border: "3px solid white"
                }}
                alt=""
              />
            )}
            <ItemBottom>
              <div style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
                พริตตี้ Event / Mc
              </div>
              <div style={{ color: "blue", fontSize: 12, fontWeight: "bold" }}>
                จำนวน 0 งาน
              </div>
            </ItemBottom>
          </Item>
        )}
        {member.type2 && (
          <Item>
            {items[1] && (
              <img
                src={items[1].image_url}
                style={{
                  width: "90%",
                  height: "80%",
                  borderRadius: "5px",
                  border: "3px solid white"
                }}
                alt=""
              />
            )}
            <ItemBottom>
              <div style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
                โคโยตี้ / งานเต้น
              </div>
              <div style={{ color: "blue", fontSize: 12, fontWeight: "bold" }}>
                จำนวน 0 งาน
              </div>
            </ItemBottom>
          </Item>
        )}
        {member.type3 && (
          <Item>
            {items[2] && (
              <img
                src={items[2].image_url}
                style={{
                  width: "90%",
                  height: "80%",
                  borderRadius: "5px",
                  border: "3px solid white"
                }}
                alt=""
              />
            )}
            <ItemBottom>
              <div style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
                พริตตี้ En / Env
              </div>
              <div style={{ color: "blue", fontSize: 12, fontWeight: "bold" }}>
                จำนวน 0 งาน
              </div>
            </ItemBottom>
          </Item>
        )}
        {member.type4 && (
          <Item>
            {items[3] && (
              <img
                src={items[3].image_url}
                style={{
                  width: "90%",
                  height: "80%",
                  borderRadius: "5px",
                  border: "3px solid white"
                }}
                alt=""
              />
            )}
            <ItemBottom>
              <div style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
                พริตตี้ นวดแผนไทย
              </div>
              <div style={{ color: "blue", fontSize: 12, fontWeight: "bold" }}>
                จำนวน 0 งาน
              </div>
            </ItemBottom>
          </Item>
        )}
      </ItemContainer>
    </Container>
  )
}
