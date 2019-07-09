import React from 'react'
import { PRICE_CHANGE_TYPES } from '../../../utils/constants'
import styles from './../signal/TriggerForm.module.scss'

const getMovingType = type => {
  switch (type.value) {
    case PRICE_CHANGE_TYPES.MOVING_UP: {
      return 'up'
    }
    case PRICE_CHANGE_TYPES.MOVING_DOWN: {
      return 'down'
    }
    default: {
      return ''
    }
  }
}

export const TriggerTimeWindowExplanation = ({
  percent,
  timeType,
  timeValue,
  type
}) => {
  const movingType = getMovingType(type)

  return (
    <div className={styles.timeWindowExplanation}>
      {movingType &&
        timeType &&
        `${percent}% price ${movingType} compared to ${timeValue}${
          timeType.value
        } ago`}
    </div>
  )
}
