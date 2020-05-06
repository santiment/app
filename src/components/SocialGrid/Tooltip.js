import React from 'react'
import { getDateDayMonthYear } from '../../ducks/Chart/utils'
import styles from './Tooltip.module.scss'

const Tooltip = ({ point, datetime }) => (
  <div className={styles.wrapper}>
    <div className={styles.top}>
      <span className={styles.point}>{point}</span>
    </div>
    <div className={styles.datetime}>{getDateDayMonthYear(datetime)}</div>
  </div>
)

export default Tooltip
