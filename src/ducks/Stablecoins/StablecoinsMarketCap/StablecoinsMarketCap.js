import React, { useState } from 'react'
import MarketCapHeader, {
  MARKET_CAP_HOUR_INTERVAL
} from './MarketCapHeader/MarketCapHeader'
import styles from './StablecoinsMarketCap.module.scss'

const StablecoinsMarketCap = () => {
  const [interval, setInterval] = useState(MARKET_CAP_HOUR_INTERVAL.label)

  return (
    <div className={styles.container}>
      <MarketCapHeader interval={interval} setInterval={setInterval} />
    </div>
  )
}

export default StablecoinsMarketCap
