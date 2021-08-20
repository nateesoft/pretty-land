/**
 *
 * WaterMark
 *
 */

import React from "react"
import PropTypes from "prop-types"
import ReactWaterMark from "react-watermark-component"
import { AppConfig } from "../../../Constants"

const options = {
  chunkWidth: 200,
  chunkHeight: 60,
  textAlign: "left",
  textBaseline: "bottom",
  globalAlpha: 0.17,
  rotateAngle: -0.26,
  fillStyle: "#666"
}

function WaterMark(props) {
  if (AppConfig.env !== "production") {
    return (
      <ReactWaterMark
        waterMarkText="DEMO VERSION"
        openSecurityDefense
        options={options}
      >
        {props.children}
      </ReactWaterMark>
    )
  } else {
    return props.children
  }
}

WaterMark.propTypes = {
  children: PropTypes.any
}

export default WaterMark
