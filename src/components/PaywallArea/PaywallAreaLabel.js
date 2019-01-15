import React from 'react'

const PaywallAreaLabel = ({ viewBox, withGlitch }) => {
  if (viewBox.width === 0) {
    return ''
  }
  const width = 14
  const height = 10
  const offsetX = withGlitch ? 0 : width * 0.5
  return (
    <svg
      x={viewBox.x + viewBox.width * 0.5 - offsetX}
      y={viewBox.y + viewBox.height * 0.5 - height * 0.5}
      width={width}
      height={height}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M13.7188 1.72625C13.7188 0.957289 12.8162 0.572192 12.2884 1.11593L10.3672 3.09499L7.6081 0.252804C7.28089 -0.0842683 6.75036 -0.0842677 6.42315 0.252804L3.66406 3.09499L1.74287 1.11593C1.21503 0.572191 0.3125 0.95729 0.3125 1.72625V9.13687C0.3125 9.61357 0.687636 10 1.15039 10H12.8809C13.3436 10 13.7188 9.61357 13.7188 9.13687V1.72625Z'
        fill='#FFAD4D'
      />
    </svg>
  )
}

export default PaywallAreaLabel
