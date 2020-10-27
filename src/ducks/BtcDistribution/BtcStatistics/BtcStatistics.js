import React from 'react'
import TotalBtcCard from './TotalBtcCard'
import BtcCirculationSupply from './BtcCirculationSupply'
import PercentOfEthMarketcap from './PercentOfEthMarketcap'
import styles from './BtcStatistics.module.scss'

const SETTINGS = {
  from: 'utc_now-1d',
  to: 'utc_now'
}

const BtcStatistics = () => {
  return (
    <div className={styles.container}>
      <TotalBtcCard settings={SETTINGS} />
      <BtcCirculationSupply settings={SETTINGS} />
      <PercentOfEthMarketcap settings={SETTINGS} />
    </div>
  )
}

export default BtcStatistics
