import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { graphql } from 'react-apollo'
import Loader from '@santiment-network/ui/Loader/Loader'
import Dropdown from '@santiment-network/ui/Dropdown'
import { linearScale } from '@santiment-network/chart/scales'
import { HISTOGRAM_DATA_QUERY } from './gql'
import Calendar from './Calendar'
import { millify } from '../../../utils/formatting'
import { usdFormatter } from '../../SANCharts/utils'
import styles from './Histogram.module.scss'

const chart = {
  height: 342,
  top: 0
}

function rangeFormatter ([from, to]) {
  return usdFormatter(from) + ' - ' + usdFormatter(to)
}

const Frame = ({ range, value = '205.8k', ticker = 'BTC', width }) => {
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

const Histogram = ({ title, slug, from, to, ticker, hasSort }) => {
  const [dates, setDates] = useState()
  const [data, loading] = useHistogramData({ slug, from, to })
  const [sorter, setSorter] = useState(TIME)

  function onCalendarChange (newDates) {
    setDates(newDates)
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        Price movement
        {loading && <Loader className={styles.inlineLoader} />}
        <Calendar selectRange dates={dates} onChange={onCalendarChange} />
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

      <div className={styles.static}>
        <div className={styles.scroll}>
          {data.sort(Sorter[sorter]).map(({ index, distribution, width }) => (
            <Frame
              {...distribution}
              key={index}
              ticker={ticker}
              width={width}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

Histogram.Icon = 'H'

Histogram.defaultProps = {
  date: Date.now(),
  slug: 'bitcoin',
  distributions: []
}

function formatHistogramData (data) {
  const { length } = data

  let max = 0

  for (let i = 0; i < length; i++) {
    const { value } = data[i]
    if (value > max) {
      max = value
    }
  }

  const scaler = linearScale(chart, max, 0)

  return data.map((distribution, index) => {
    return {
      index,
      distribution,
      width: scaler(distribution.value)
    }
  })
}

function useHistogramData ({ slug, from, to }) {
  const [histogramData, setHistogramData] = useState([])
  const { data, loading, error } = useQuery(HISTOGRAM_DATA_QUERY, {
    variables: {
      slug,
      from,
      to
    }
  })

  useEffect(
    () => {
      if (data) {
        setHistogramData(
          formatHistogramData(data.getMetric.histogramData.values.data)
        )
      }
    },
    [data]
  )

  return [histogramData, loading]
}

export default Histogram
