import React, { useState } from 'react'
import Chord from './Chord'
import { getDateByDayIndex, getDaysAmount } from './utils'
import { usePeriodMatrix, useDayMatrix, useAnimatedDayIndex } from './hooks'
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
  const { periodMatrix, isLoading } = usePeriodMatrix(slug, dates, daysAmount)
  const [dayIndex] = useAnimatedDayIndex(daysAmount, isLoading)
  const { matrix, isEmpty } = useDayMatrix(periodMatrix, dayIndex)

  function onCalendarChange (dates) {
    setDaysAmount(getDaysAmount(dates[0], dates[1]))
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

FlowBalances.defaultProps = {
  defaultDates: DEFAULT_DATES,
  defaultDaysAmount: DEFAULT_DAYS_AMOUNT
}

export default FlowBalances
