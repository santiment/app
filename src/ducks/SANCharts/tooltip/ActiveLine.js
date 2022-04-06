import React from 'react'

export const ActiveDot = ({ cy, cx, activeDotColor = 'var(--jungle-green-hover)' }) => {
  return cy !== null ? (
    <circle cx={cx} cy={cy} r={4} strokeWidth='2px' stroke={activeDotColor} fill='var(--white)' />
  ) : null
}

const ActiveLine = ({ cy }) => {
  return cy !== null ? <line y1={cy} y2={cy} x1='0' x2='100%' stroke='var(--casper)' /> : null
}
export default ActiveLine
