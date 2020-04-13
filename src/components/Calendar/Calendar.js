import React from 'react'
import cx from 'classnames'
import LibCalendar from 'react-calendar'
import styles from './Calendar.module.scss'

const Calendar = ({ className, ...props }) => {
  return (
    <LibCalendar
      className={cx(styles.wrapper, className)}
      tileClassName={styles.tile}
      {...props}
    />
  )
}

export default Calendar
