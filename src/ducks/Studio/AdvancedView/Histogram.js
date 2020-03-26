import React, { useState, useEffect } from 'react'
import Loader from '@santiment-network/ui/Loader/Loader'
import Dropdown from '@santiment-network/ui/Dropdown'
import Message from '@santiment-network/ui/Message'
import Calendar from './Calendar'
import UsageTip from './UsageTip'
import { useHistogramData } from './hooks'
import { usdFormatter } from '../../SANCharts/utils'
import { millify } from '../../../utils/formatting'
import { ONE_MONTH_IN_MS } from '../../../utils/dates'
import styles from './Histogram.module.scss'

const dropdownClasses = {
  wrapper: styles.dropdown,
  options: styles.dropdown__options
}

const TIME = 'Time'
const VALUE = 'Value'
const SORTER_OPTIONS = [TIME, VALUE]

const dateSorter = ({ index: a }, { index: b }) => a - b
const valueSorter = ({ width: a }, { width: b }) => b - a

const Sorter = {
  [TIME]: dateSorter,
  [VALUE]: valueSorter
}

function rangeFormatter ([left, right]) {
  return usdFormatter(left) + ' - ' + usdFormatter(right)
}

const Frame = ({ range, value, ticker, width }) => {
  return (
    <div className={styles.frame}>
      <div className={styles.bar} style={{ width }} />
      <div className={styles.info}>
        <span className={styles.range}>{rangeFormatter(range)}: </span>
        {millify(value, 1)} {ticker}
      </div>
    </div>
  )
}

const Histogram = ({ title, slug, ticker, date, datesRange, hasSort }) => {
  const [dates, setDates] = useState([date])
  const [sorter, setSorter] = useState(TIME)
  const [from, to] = dates
  const [data, loading, error] = useHistogramData({ slug, from, to })

  useEffect(
    () => {
      const to = new Date(date)
      to.setHours(23, 59, 59, 0)

      setDates([date, to])
    },
    [date]
  )

  useEffect(
    () => {
      if (datesRange) {
        setDates(datesRange)
      }
    },
    [datesRange]
  )

  function onCalendarChange (newDates) {
    setDates(newDates)
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        Price movement
        <Calendar
          className={styles.calendar}
          selectRange
          dates={dates}
          onChange={onCalendarChange}
        />
      </h2>

      {hasSort && (
        <div className={styles.sorter}>
          Sort by
          <Dropdown
            selected={sorter}
            options={SORTER_OPTIONS}
            classes={dropdownClasses}
            onSelect={setSorter}
          />
        </div>
      )}

      <UsageTip />

      <div className={styles.static}>
        <div className={styles.scroller}>
          <div className={styles.scroll}>
            {error ? (
              <Message variant='error'>
                Selected date is outside of the allowed interval
              </Message>
            ) : (
              data
                .sort(Sorter[sorter])
                .map(({ index, distribution, width }) => (
                  <Frame
                    {...distribution}
                    key={index}
                    ticker={ticker}
                    width={width}
                  />
                ))
            )}
          </div>
        </div>

        {loading && <Loader className={styles.loader} />}
      </div>
    </div>
  )
}

Histogram.Icon = 'H'

Histogram.defaultProps = {
  date: new Date(Date.now() - ONE_MONTH_IN_MS * 3),
  slug: 'bitcoin',
  distributions: []
}

export default Histogram
