import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Loader from '@santiment-network/ui/Loader/Loader'
import { usePriceHistogramData } from './hooks'
import RestrictionMessage from './RestrictionMessage'
import ErrorMessage from './ErrorMessage'
import UsageTip from '../UsageTip'
import Calendar from '../Calendar'
import MoreInfoLink from '../../../../components/MoreInfoLink/MoreInfoLink'
import { usdFormatter } from '../../../SANCharts/utils'
import { millify } from '../../../../utils/formatting'
import { ONE_MONTH_IN_MS } from '../../../../utils/dates'
import styles from './index.module.scss'

const INTERVAL_ERROR_TEXT = 'allowed interval'

const formatRange = ([left, right]) =>
  `${usdFormatter(left)} - ${usdFormatter(right)}`

const Bucket = ({
  range,
  value,
  ticker,
  width,
  price,
  isRangeAfterCurrentPrice
}) => (
  <div className={styles.frame}>
    <div
      className={cx(styles.bar, isRangeAfterCurrentPrice && styles.red)}
      style={{ '--r': width }}
    />
    <div className={styles.info}>
      <span className={styles.range}>{formatRange(range)}: </span>
      {millify(value, 1)} {ticker}
      {price && (
        <div className={styles.price}>Price: {usdFormatter(price)}</div>
      )}
    </div>
  </div>
)

const PriceHistogram = ({ title, slug, ticker, date, datesRange }) => {
  const [dates, setDates] = useState([date])
  const [from, to] = dates
  const [data, loading, error] = usePriceHistogramData({ slug, from, to })

  useEffect(
    () => {
      const to = new Date(date)

      date.setHours(0, 0, 0, 0)
      to.setHours(23, 59, 59, 999)

      setDates([date, to])
    },
    [date]
  )

  useEffect(
    () => {
      if (datesRange) {
        datesRange[0].setHours(0, 0, 0, 0)
        datesRange[1].setHours(23, 59, 59, 999)
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
        Spent Coin Cost
        <Calendar
          className={styles.calendar}
          selectRange
          dates={dates}
          onChange={onCalendarChange}
        />
      </h2>

      <div className={styles.description}>
        It shows at what price the tokens that were transacted today were last
        moved.{' '}
        <MoreInfoLink href='https://academy.santiment.net/metrics/spent-coin-cost/' />
      </div>

      <UsageTip />

      <div className={styles.static}>
        <div className={styles.scroller}>
          <div className={styles.scroll}>
            {error ? (
              error.message.includes(INTERVAL_ERROR_TEXT) ? (
                <RestrictionMessage />
              ) : (
                <ErrorMessage />
              )
            ) : (
              <>
                <div>Example</div>
                <div className={styles.description}>
                  Today's on-chain volume of Santiment is 100,000 SAN tokens and
                  the average price for today is $1. If 50,000 of those tokens
                  were moved when the price was $1.5 and the other 50,000 where
                  moved when the price was $0.5 the histogram could look like:
                  <br />
                  $0-$1 - 50,000
                  <br />
                  $1-$2 - 50,000
                </div>

                {data.map(({ index, distribution, ...rest }) => (
                  <Bucket
                    key={index}
                    {...distribution}
                    {...rest}
                    ticker={ticker}
                  />
                ))}
              </>
            )}
          </div>
        </div>

        {loading && <Loader className={styles.loader} />}
      </div>
    </div>
  )
}

PriceHistogram.Icon = 'H'

PriceHistogram.defaultProps = {
  date: new Date(Date.now() - ONE_MONTH_IN_MS * 3),
  slug: 'bitcoin'
}

export default PriceHistogram
