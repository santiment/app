import React from 'react'
import cx from 'classnames'
import { useWalletAssets } from './hooks'
import Chart from './Chart'
import AddressSetting from './Setting/Address'
import styles from './index.module.scss'

const settings = {
  address: '0x609ba2969E9A807C8f450e37909F10f88E5Fc931',
  from: '2020-07-04T21:00:00.000Z',
  to: '2020-10-05T20:59:59.999Z',
  interval: '3h',
}

const HistoricalBalance = ({ ...props }) => {
  const walletAssets = useWalletAssets(settings.address)
  const chartAssets = walletAssets.slice(0, 1)

  return (
    <div className={styles.wrapper}>
      <div className={styles.settings}>
        <AddressSetting></AddressSetting>
        <AddressSetting></AddressSetting>
        {/* <Setting title='Assets (maximum 5)' Input={WalletAddress}></Setting> */}
      </div>
      <Chart settings={settings} chartAssets={chartAssets}></Chart>
    </div>
  )
}

export default HistoricalBalance
