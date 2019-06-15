import React from 'react'
import LibCalendar from 'react-calendar'
import styles from './Calendar.module.scss'

const Calendar = props => {
  return (
    <LibCalendar
      className={styles.wrapper}
      tileClassName={styles.tile}
      {...props}
    />
  )
}

export default Calendar
