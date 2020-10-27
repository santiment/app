import React from 'react'
import TotalBtcCard from './TotalBtcCard'
import BtcCirculationSupply from './BtcCirculationSupply'
import PercentOfEthMarketcap from './PercentOfEthMarketcap'
import styles from './BtcStatistics.module.scss'

const BtcStatistics = ({ settings }) => {
  return (
    <div className={styles.container}>
      <TotalBtcCard settings={settings} />
      <BtcCirculationSupply settings={settings} />
      <PercentOfEthMarketcap settings={settings} />
    </div>
  )
}

export default BtcStatistics
