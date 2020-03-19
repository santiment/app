import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import Loader from '@santiment-network/ui/Loader/Loader'
import Dropdown from '@santiment-network/ui/Dropdown'
import { linearScale } from '@santiment-network/chart/scales'
import { HISTOGRAM_DATA_QUERY } from './gql'
import { millify } from '../../../utils/formatting'
import styles from './Histogram.module.scss'

const Frame = ({ frame = '<1d', value = '205.8k', ticker = 'BTC', width }) => {
  console.log(width)
  return (
    <div className={styles.frame}>
      <div className={styles.bar} style={{ width }} />
      <div className={styles.info}>
        <span className={styles.range}>{frame}: </span>
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

const dateSorter = ({ index: a }, { index: b }) => b - a
const valueSorter = ({ value: a }, { value: b }) => b - a

const Sorter = {
  [TIME]: dateSorter,
  [VALUE]: valueSorter
}

const Histogram = ({ ticker, loading, distributions }) => {
  const [sorter, setSorter] = useState(TIME)

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        Histogram
        {loading && <Loader className={styles.inlineLoader} />}
      </h2>

      <div className={styles.sorter}>
        Sort by
        <Dropdown
          selected={sorter}
          options={SORTER_OPTIONS}
          classes={dropdownClasses}
          onSelect={setSorter}
        />
      </div>
      <div className={styles.static}>
        <div className={styles.scroll}>
          {distributions
            .sort(Sorter[sorter])
            .map(({ index, timeFrame, value, width }) => (
              <Frame
                key={index}
                frame={timeFrame}
                value={value}
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
  interval: '1d',
  slug: 'bitcoin',
  distributions: []
}

function formatHistogramData ({ values: { data: distributions } }) {
  let currentFrame = 1

  const min = Math.min(...distributions)
  const max = Math.max(...distributions)

  const chart = {
    height: 342,
    top: 0
  }
  const scaler = linearScale(chart, max, min * 0.8)

  return distributions.map((value, index) => {
    const timeFrame =
      currentFrame === 1
        ? `<${currentFrame++}d`
        : `${currentFrame}d-${++currentFrame}d`

    return {
      index,
      value,
      timeFrame,
      width: scaler(value)
    }
  })
}

export default graphql(HISTOGRAM_DATA_QUERY, {
  options: ({ slug, from, to }) => ({
    variables: {
      interval: '1d',
      slug,
      from,
      to
    }
  }),
  props: ({ data: { loading, getMetric } }) => {
    if (!getMetric) return { loading }

    return {
      distributions: formatHistogramData(getMetric.histogramData),
      loading
    }
  }
})(Histogram)
