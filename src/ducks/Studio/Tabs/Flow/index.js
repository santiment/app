import React, { useState, useEffect } from 'react'
import { Chord } from '@nivo/chord'
import { LABELS } from './matrix'
import { getDateByDayIndex } from './utils'
import { usePeriodMatrix, useDayMatrix } from './hooks'
import Calendar from '../../AdvancedView/Calendar'
import {
  getTimeIntervalFromToday,
  DAY,
  ONE_DAY_IN_MS
} from '../../../../utils/dates'
import styles from './index.module.scss'

const MARGIN = { top: 60, right: 60, bottom: 90, left: 60 }

const DEFAULT_DAYS_AMOUNT = 30
const { from, to } = getTimeIntervalFromToday(-DEFAULT_DAYS_AMOUNT + 1, DAY)
const DEFAULT_DATES = [from, to]

const FlowBalances = ({ slug, ticker }) => {
  const [dates, setDates] = useState(DEFAULT_DATES)
  const [daysAmount, setDaysAmount] = useState(DEFAULT_DAYS_AMOUNT)
  const [dayIndex, setDayIndex] = useState(0)
  const periodMatrix = usePeriodMatrix(slug, dates, daysAmount)
  const matrix = useDayMatrix(periodMatrix, dayIndex)

  useEffect(
    () => {
      if (daysAmount === 1) return

      const interval = setInterval(
        () => setDayIndex(index => ++index % daysAmount),
        1500
      )
      return () => clearInterval(interval)
    },
    [daysAmount]
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
        className={styles.contextCalendar}
      />
      <div className={styles.title}>
        {ticker} Flow Balances on {getDateByDayIndex(dates, dayIndex)}
      </div>
      <Chord
        enableLabel
        isInteractive
        animate
        width={700}
        height={700}
        matrix={matrix}
        keys={LABELS}
        margin={MARGIN}
        valueFormat='.2f'
        padAngle={0.02}
        innerRadiusRatio={0.95}
        arcOpacity={1}
        arcBorderWidth={1}
        arcBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
        ribbonOpacity={0.5}
        ribbonBorderWidth={1}
        ribbonBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
        label='id'
        labelOffset={25}
        labelRotation={-180}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1]] }}
        colors={{ scheme: 'nivo' }}
        arcHoverOpacity={1}
        arcHoverOthersOpacity={0.2}
        ribbonHoverOpacity={1}
        ribbonHoverOthersOpacity={0.2}
        motionStiffness={300}
        motionDamping={40}
      />
    </div>
  )
}

export default FlowBalances
