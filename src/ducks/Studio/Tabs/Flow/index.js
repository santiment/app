import React, { useState } from 'react'
import AnimatedChord from './AnimatedChord'
import { getDateByDayIndex } from './utils'
import { usePeriodMatrix } from './hooks'
import Calendar from '../../AdvancedView/Calendar'
import {
  getTimeIntervalFromToday,
  DAY,
  ONE_DAY_IN_MS
} from '../../../../utils/dates'
import styles from './index.module.scss'

const DEFAULT_DAYS_AMOUNT = 7
const { from, to } = getTimeIntervalFromToday(-DEFAULT_DAYS_AMOUNT + 1, DAY)
const DEFAULT_DATES = [from, to]

const FlowBalances = ({ slug, ticker, defaultDates, defaultDaysAmount }) => {
  const [dates, setDates] = useState(defaultDates)
  const [daysAmount, setDaysAmount] = useState(defaultDaysAmount)
  const [dayIndex, setDayIndex] = useState(0)
  const { periodMatrix, isLoading } = usePeriodMatrix(slug, dates, daysAmount)

  function onCalendarChange (dates) {
    setDaysAmount(Math.floor((dates[1] - dates[0]) / ONE_DAY_IN_MS) + 1)
    setDayIndex(0)
    setDates(dates)
  }

  return (
    <div className={styles.wrapper}>
      <Calendar
        selectRange
        dates={dates}
        onChange={onCalendarChange}
        className={styles.calendar}
        maxDate={to}
      />

      <div className={styles.title}>
        {ticker} Flow Balances on {getDateByDayIndex(dates, dayIndex)}
      </div>
      <AnimatedChord
        periodMatrix={periodMatrix}
        dayIndex={dayIndex}
        daysAmount={daysAmount}
        isLoading={isLoading}
        setDayIndex={setDayIndex}
      />
    </div>
  )
}

FlowBalances.defaultProps = {
  defaultDates: DEFAULT_DATES,
  defaultDaysAmount: DEFAULT_DAYS_AMOUNT
}

export default FlowBalances
