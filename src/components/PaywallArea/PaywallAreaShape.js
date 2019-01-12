import React from 'react'

const PaywallAreaShape = ({
  x,
  y,
  width,
  height,
  fill,
  fillOpacity,
  viewBox,
  strokeWidth,
  stroke,
  withGlitch
}) => {
  return (
    <svg
      width={withGlitch ? width + 20 : width}
      height={height}
      x={x}
      y={y}
      fill={fill}
      fillOpacity={fillOpacity}
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        width={withGlitch ? width + 20 : width}
        height={height}
        mask='url(#mask-stripe)'
        fill={'#ffad4d'}
        fillOpacity={0.1}
        strokeWidth={strokeWidth}
        stroke={stroke}
      />
    </svg>
  )
}

export default PaywallAreaShape
