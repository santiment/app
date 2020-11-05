import React, { useState } from 'react'
import cx from 'classnames'
import Calendar from '../../../Studio/AdvancedView/Calendar'
import { getPreviousDays } from './utils'
import styles from './index.module.scss'

const MAX_DATE = new Date()
MAX_DATE.setHours(23, 59, 59, 59)

const DaysSelector = ({ onDayChange, className }) => {
  const [selectedDate, setSelectedDate] = useState([MAX_DATE])
  const [previousDays] = useState(getPreviousDays(7, MAX_DATE))

  function onDateChange (date) {
    const customDate = new Date(date)
    customDate.setHours(23, 59, 59, 59)
    setSelectedDate([customDate])
    onDayChange(customDate)
  }

  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={styles.days}>
        {previousDays.map(({ label, date }, idx) => {
          const isSelected = date.getDate() === selectedDate[0].getDate()
          return (
            <div
              className={cx(styles.day, isSelected && styles.selected)}
              key={idx}
              onClick={() => (isSelected ? {} : onDateChange(date))}
            >
              {label}
            </div>
          )
        })}
      </div>
      <Calendar
        dates={selectedDate}
        onChange={onDateChange}
        className={styles.calendar}
        maxDate={MAX_DATE}
      />
    </div>
  )
}

export default DaysSelector
