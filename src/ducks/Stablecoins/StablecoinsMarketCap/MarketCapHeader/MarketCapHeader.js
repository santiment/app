import React from 'react'
import Tabs from '@santiment-network/ui/Tabs'
import styles from './MarketCapHeader.module.scss'

const makeInterval = (val, label) => ({
  value: val,
  label: label
})

export const MARKET_CAP_HOUR_INTERVAL = makeInterval('1h', '1H')
export const MARKET_CAP_MONTH_INTERVAL = makeInterval('31d', '1M')

const INTERVALS = [
  MARKET_CAP_HOUR_INTERVAL,
  makeInterval('1d', '1D'),
  makeInterval('1w', '1W'),
  MARKET_CAP_MONTH_INTERVAL,
  makeInterval('365d', '1Y')
]

const TABS = INTERVALS.map(({ label }) => label)

const MarketCapHeader = ({ interval, setInterval }) => {
  return (
    <div className={styles.container}>
      Stablecoins Market Cap
      <div>
        <Tabs
          options={TABS}
          defaultSelectedIndex={interval.label}
          onSelect={tab => {
            const foundTab = INTERVALS.find(({ label }) => label === tab)
            if (foundTab) {
              setInterval(foundTab)
            }
          }}
          className={styles.tabs}
          classes={styles}
        />
      </div>
    </div>
  )
}

export default MarketCapHeader
