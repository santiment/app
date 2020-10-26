import React from 'react'
import TotalBtcCard from './TotalBtcCard'
import BtcCirculationSupply from './BtcCirculationSupply'
import styles from './BtcStatistics.module.scss'

const BtcStatistics = ({ settings }) => {
  return (
    <div className={styles.container}>
      <TotalBtcCard settings={settings} />
      <BtcCirculationSupply settings={settings} />
    </div>
  )

  /*
  const [ethData, loadingEth] = useAggregatedMetric({...settings, slug: 'ethereum'}, 'daily_avg_marketcap_usd')
  const [btcData, loadingBtc] = useAggregatedMetric({...settings, slug: 'bitcoin'}, 'daily_avg_marketcap_usd')

  return <div className={styles.container}>
    BTC
  </div> */
}

export default BtcStatistics
