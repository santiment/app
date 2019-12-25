import React from 'react'

const ActiveLine = ({ cy }) => (
  <line y1={cy} y2={cy} x1='0' x2='100%' stroke='var(--casper)' />
)

export default ActiveLine
