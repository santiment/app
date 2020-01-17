import React from 'react'

const ActiveLine = ({ cy }) => {
  return cy !== null ? (
    <line y1={cy} y2={cy} x1='0' x2='100%' stroke='var(--casper)' />
  ) : null
}
export default ActiveLine
