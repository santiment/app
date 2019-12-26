import React from 'react'

const ActiveLine = ({ cy }) => (
  <line y1={cy} y2={cy} x1='5px' x2='calc(100% - 4px)' stroke='var(--casper)' />
)

export default ActiveLine
