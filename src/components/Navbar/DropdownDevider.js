import React from 'react'

const DropdownDevider = ({ style, ...props }) => {
  return (
    <div
      {...props}
      style={{
        height: 1,
        background: '#ebeef5',
        ...style
      }}
    />
  )
}

export default DropdownDevider
