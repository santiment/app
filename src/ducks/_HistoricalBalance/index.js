import React from 'react'
import cx from 'classnames'
import Chart from './Chart'
import AddressSetting from './Setting/Address'
import styles from './index.module.scss'

const HistoricalBalance = ({ ...props }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.settings}>
        <AddressSetting></AddressSetting>
        <AddressSetting></AddressSetting>
        {/* <Setting title='Assets (maximum 5)' Input={WalletAddress}></Setting> */}
      </div>
      <Chart></Chart>
    </div>
  )
}

export default HistoricalBalance
