import React from "react"
import styled from "styled-components"

const Container = styled.div`
  background-image: url("assets/bg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`
const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: space-between;
`
const Item = styled.div`
  width: 46%;
  height: 40vh;
  border: 1px solid;
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
  return (
    <Container>
      <ItemContainer>
        <Item>
          <ItemBottom>
            <div>พริตตี้ Event / Mc</div>
            <div style={{ fontSize: 12 }}>จำนวน 0 งาน</div>
          </ItemBottom>
        </Item>
        <Item>
          <ItemBottom>
            <div>โคโยตี้ / งานเต้น</div>
            <div style={{ fontSize: 12 }}>จำนวน 0 งาน</div>
          </ItemBottom>
        </Item>
        <Item>
          <ItemBottom>
            <div>พริตตี้ En / Env</div>
            <div style={{ fontSize: 12 }}>จำนวน 0 งาน</div>
          </ItemBottom>
        </Item>
        <Item>
          <ItemBottom>
            <div>พริตตี้ นวดแผนไทย</div>
            <div style={{ fontSize: 12 }}>จำนวน 0 งาน</div>
          </ItemBottom>
        </Item>
      </ItemContainer>
    </Container>
  )
}
