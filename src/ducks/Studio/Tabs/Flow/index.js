import React, { useState, useEffect } from 'react'
import Chord from './Chord'
import { getDateByDayIndex } from './utils'
import { usePeriodMatrix, useDayMatrix } from './hooks'
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

const FlowBalances = ({ slug, ticker }) => {
  const [dates, setDates] = useState(DEFAULT_DATES)
  const [daysAmount, setDaysAmount] = useState(DEFAULT_DAYS_AMOUNT)
  const [dayIndex, setDayIndex] = useState(0)
  const { periodMatrix, isLoading } = usePeriodMatrix(slug, dates, daysAmount)
  const { matrix, isEmpty } = useDayMatrix(periodMatrix, dayIndex)

  useEffect(
    () => {
      if (isLoading || daysAmount === 1) return

      const interval = setInterval(
        () => setDayIndex(index => ++index % daysAmount),
        1500
      )
      return () => clearInterval(interval)
    },
    [daysAmount, isLoading]
  )

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
      <Chord matrix={matrix} isLoading={isLoading} isEmpty={isEmpty} />
    </div>
  )
}

export default FlowBalances
