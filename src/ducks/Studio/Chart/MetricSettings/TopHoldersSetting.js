import React, { useState } from 'react'
import Setting from './Setting'
import Input from './Input'

const TopHoldersSetting = ({ metric }) => {
  const [movingAverage, setMovingAverage] = useState(0)

  function onChange (value) {
    setMovingAverage(value)
  }

  return (
    <Setting isDropdown={false}>
      Top Holders
      <Input type='number' onChange={onChange} value={movingAverage} />
    </Setting>
  )
}

export default TopHoldersSetting
