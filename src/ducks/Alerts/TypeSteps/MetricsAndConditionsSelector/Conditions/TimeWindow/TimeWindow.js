import React from 'react'
import Input from '@santiment-network/ui/Input'

import ConditionSelect from '../ConditionSelect/ConditionSelect'

import { TIME_WINDOW_UNITS } from '../../../../../Signals/utils/constants'

import styles from './TimeWindow.module.scss'

const TimeWindow = ({ timeWindowUnit, timeWindow, handleFormValueChange }) => (
  <div className={styles.wrapper}>
    <Input
      name='timeWindow'
      type='number'
      min={0}
      placeholder='Time window'
      value={timeWindow}
      onChange={e => handleFormValueChange('timeWindow')(e.target.value)}
    />
    <ConditionSelect
      isClearable={false}
      placeholder='Unit'
      options={TIME_WINDOW_UNITS}
      value={timeWindowUnit}
      handleFormValueChange={handleFormValueChange('timeWindowUnit')}
    />
  </div>
)

export default TimeWindow
