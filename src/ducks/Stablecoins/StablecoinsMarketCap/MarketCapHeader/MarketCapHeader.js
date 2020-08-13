import React from 'react'
import Tabs from '@santiment-network/ui/Tabs'
import styles from './MarketCapHeader.module.scss'

const makeInterval = val => ({
  value: val,
  label: val.toUpperCase()
})

export const MARKET_CAP_HOUR_INTERVAL = makeInterval('1h')

const INTERVALS = [
  MARKET_CAP_HOUR_INTERVAL,
  makeInterval('1d'),
  makeInterval('1w'),
  makeInterval('1m'),
  makeInterval('1y')
]

const TABS = INTERVALS.map(({ label }) => label)

const MarketCapHeader = ({ interval, setInterval }) => {
  console.log('a!', TABS, interval)
  return (
    <div className={styles.container}>
      Stablecoins Market Cap
      <div>
        <Tabs
          options={TABS}
          defaultSelectedIndex={interval}
          onSelect={tab => {
            const foundTab = TABS.find(({ label }) => label === tab)
            if (foundTab) {
              setInterval(foundTab.value)
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
