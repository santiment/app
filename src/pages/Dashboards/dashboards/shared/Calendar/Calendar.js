import React, { useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import AdvancedCalendar from '../../../../../ducks/Studio/AdvancedView/Calendar'
import { getTimePeriod } from '../../../../TrendsExplore/utils'
import { addDays, checkIsToday } from '../../../../../utils/dates'
import styles from './Calendar.module.scss'

const MAX_DATE = new Date()

const Calendar = ({ setTrendPeriod }) => {
  const [trendDate, setTrendDate] = useState([MAX_DATE])

  function onTrendCalendarChange(date) {
    setTrendDate([date])
    let period
    if (!checkIsToday(date)) {
      period = getTimePeriod(date)
      period.interval = '1d'
    }
    setTrendPeriod(period)
  }

  return (
    <>
      <button
        className={cx(styles.action, 'btn-2 row hv-center mrg-s mrg--r expl-tooltip')}
        onClick={() => onTrendCalendarChange(addDays(trendDate, -1))}
        aria-label='Previous day'
      >
        <Icon type='arrow-left-big' />
      </button>
      <button
        className={cx(styles.action, 'btn-2 row hv-center expl-tooltip')}
        disabled={checkIsToday(trendDate[0])}
        onClick={() => onTrendCalendarChange(addDays(trendDate, 1))}
        aria-label='Next day'
      >
        <Icon type='arrow-right-big' />
      </button>
      <AdvancedCalendar
        dates={trendDate}
        onChange={onTrendCalendarChange}
        className='row justify v-center mrg-m mrg--l'
        maxDate={MAX_DATE}
        isFullDate
      />
    </>
  )
}

export default Calendar
