import React, { useState } from 'react'
import cx from 'classnames'
import { useWalletAssets } from './hooks'
import Chart from './Chart'
import AddressSetting from './Setting/Address'
import { withSizes } from '../../components/Responsive'
import styles from './index.module.scss'

const SETTINGS = {
  address: '0x609ba2969E9A807C8f450e37909F10f88E5Fc931',
  from: '2020-07-04T21:00:00.000Z',
  to: '2020-10-05T20:59:59.999Z',
  interval: '3h',
}

const HistoricalBalance = ({ isDesktop }) => {
  const [settings, setSettings] = useState(SETTINGS)
  const { walletAssets, isLoading, isError } = useWalletAssets(settings.address)
  const chartAssets = walletAssets.slice(0, 1)

  function onAddressChange(address) {
    setSettings({
      ...settings,
      address,
    })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.settings}>
        <AddressSetting
          address={settings.address}
          isLoading={isLoading}
          isError={isError}
          onAddressChange={onAddressChange}
        ></AddressSetting>
        <AddressSetting></AddressSetting>
      </div>
      <Chart
        isDesktop={isDesktop}
        settings={settings}
        chartAssets={chartAssets}
      ></Chart>
    </div>
  )
}

export default withSizes(HistoricalBalance)
