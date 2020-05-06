import React from 'react'
import { getDateDayMonthYear } from '../../ducks/Chart/utils'
// import ValueChange from '../ValueChange/ValueChange'
import styles from './Tooltip.module.scss'

const Tooltip = ({ latestPoint, currentPoint }) => {
  let point, datetime

  if (currentPoint) {
    point = currentPoint.social_volume_total.value
    datetime = getDateDayMonthYear(currentPoint.value)
  } else {
    point = latestPoint.social_volume_total
    datetime = getDateDayMonthYear(latestPoint.datetime)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <span className={styles.point}>{point}</span>
        {/* <ValueChange className={styles.point}/> */}
      </div>
      {currentPoint && <div className={styles.datetime}>{datetime}</div>}
    </div>
  )
}

export default Tooltip
