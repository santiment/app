import React, { useMemo, useState, useEffect } from 'react'
import ScreenerChartTitle from './ScreenerChartTitle'
import Range from '../WatchlistOverview/WatchlistAnomalies/Range'
import { INFOGRAPHIC_CURRENCIES } from './utils'
import styles from './ProjectsChart.module.scss'

const CURRENCY_RANGES = Object.values(INFOGRAPHIC_CURRENCIES)

export const useInfographicRanges = ({
  type,
  onChangeSettings,
  ranges,
  defaultCurrency = INFOGRAPHIC_CURRENCIES.USD
}) => {
  const [currency, setCurrency] = useState(defaultCurrency)

  const currentRanges = useMemo(() => ranges[currency], [currency, ranges])

  useEffect(
    () => {
      onChangeSettings(type, { currency })
    },
    [currency]
  )

  return { currency, setCurrency, currentRanges }
}

export const InfographicTitleRanges = ({
  setIntervalIndex,
  title,
  type,
  label,
  intervalIndex,
  ranges
}) => {
  return (
    <>
      <ScreenerChartTitle type={type} title={`${title}, %`} />
      <Range
        className={styles.selector}
        range={label}
        changeRange={() => {
          setIntervalIndex(
            ranges.length === 1 ? 0 : (intervalIndex + 1) % ranges.length
          )
        }}
      />
    </>
  )
}

export const PriceInfographicTitleRanges = ({
  label,
  type,
  title,
  setIntervalIndex,
  ranges,
  intervalIndex,
  currency,
  setCurrency,
  currencyRanges = CURRENCY_RANGES
}) => {
  return (
    <>
      <InfographicTitleRanges
        title={title}
        type={type}
        intervalIndex={intervalIndex}
        label={label}
        ranges={ranges}
        setIntervalIndex={setIntervalIndex}
      />

      <Range
        className={styles.selector}
        range={currency.toUpperCase()}
        disabled={currencyRanges.length === 1}
        changeRange={() => {
          const currentIndex = currencyRanges.indexOf(currency)
          const target =
            currencyRanges[(currentIndex + 1) % currencyRanges.length]

          setCurrency(target)
        }}
      />
    </>
  )
}
