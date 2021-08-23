import styled from "styled-components"

export const Content = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Container = styled.div`
  width: 1024px;
  height: auto;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  grid-gap: 10px;
  padding: 10px;
  box-sizing: border-box;
`

export const Box = styled.div`
  position: relative;
  background: red;
  padding: 5px;
  text-align: center;
  overflow: hidden;
  border-radius: 10px;
  align-items: center;
`
