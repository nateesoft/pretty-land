import React from "react"
import styled from "styled-components"

const Box = styled.div`
  box-sizing: border-box;
  float: left;
  width: 50%;
  height: 50%;
`

export default function AllPosts() {
  return (
    <div style={{ border: '1px solid' }}>
      <Box>Box 1</Box>
      <Box>Box 2</Box>
      <Box>Box 3</Box>
      <Box>Box 4</Box>
    </div>
  )
}
