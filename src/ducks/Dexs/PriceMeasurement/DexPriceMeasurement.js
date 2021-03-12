import React, { useMemo, useState } from 'react'
import cx from 'classnames'
import Range from '../../Watchlists/Widgets/WatchlistOverview/WatchlistAnomalies/Range'
import styles from './DexPriceMeasurement.module.scss'

export const DEX_BY_USD = { slug: 'multi-collateral-dai', label: 'USD' }
export const DEX_PRICE_SELECTORS = [
  DEX_BY_USD,
  { slug: 'ethereum', label: 'ETH' },
  { slug: 'bitcoin', label: 'BTC' }
]

export const useDexMeasurement = defaultMeasurement => {
  const [measurement, setMeasurement] = useState(
    defaultMeasurement || DEX_BY_USD
  )

  return { measurement, setMeasurement }
}

const DexPriceMeasurement = ({
  ranges = DEX_PRICE_SELECTORS,
  onSelect,
  defaultSelected,
  className
}) => {
  const defaultIndex = useMemo(
    () => {
      return ranges.findIndex(({ slug }) => slug === defaultSelected.slug)
    },
    [ranges, defaultSelected]
  )

  const [sortedByIndex, setSortedByIndex] = useState(defaultIndex)

  const { label } = DEX_PRICE_SELECTORS[sortedByIndex]

  return (
    <div className={cx(styles.container, className)}>
      Metrics measurement:
      <Range
        className={styles.selectors}
        btnClassName={styles.btn}
        range={label}
        changeRange={() => {
          const index = (sortedByIndex + 1) % ranges.length
          setSortedByIndex(index)

          onSelect(DEX_PRICE_SELECTORS[index])
        }}
        variant='ghost'
      />
    </div>
  )
}

export default DexPriceMeasurement
