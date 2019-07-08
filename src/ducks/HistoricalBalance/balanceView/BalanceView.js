import React, { useState, useEffect } from 'react'
import Input from '@santiment-network/ui/Input'
import cx from 'classnames'
import isEqual from 'lodash.isequal'
import GetHistoricalBalance from '../GetHistoricalBalance'
import HistoricalBalanceChart from '../chart/HistoricalBalanceChart'
import AssetsField from '../AssetsField'
import BalanceChartHeader from './BalanceChartHeader'
import styles from './BalanceView.module.scss'
import { ChartExpandView } from '../../Signals/chart/ChartExpandView'
import Loadable from 'react-loadable'
import { getIntervalByTimeRange } from '../../../utils/dates'

const LoadableChartSettings = Loadable({
  loader: () => import('./BalanceViewChartSettings'),
  loading: () => <div />
})

const DEFAULT_TIME_RANGE = '6m'

const BalanceView = ({ address = '', assets = [], onChangeQuery }) => {
  const [walletAndAssets, setWalletAndAssets] = useState({
    address: address,
    assets: assets
  })

  const [chartSettings, setChartSettings] = useState({
    timeRange: DEFAULT_TIME_RANGE,
    ...getIntervalByTimeRange(DEFAULT_TIME_RANGE)
  })

  if (!isEqual(walletAndAssets.assets, assets)) {
    setWalletAndAssets({ ...walletAndAssets, assets: assets })
  }

  useEffect(() => {
    onChangeQuery(walletAndAssets)
  }, walletAndAssets)

  const handleChange = event => {
    setWalletAndAssets({
      ...walletAndAssets,
      [event.target.name]: event.target.value
    })
  }

  const handleAssetsChange = assets => {
    const newState = {
      ...walletAndAssets,
      assets: assets.map(asset => asset.value)
    }
    setWalletAndAssets(newState)
    onChangeQuery(newState)
  }

  const { address: stateAddress, assets: stateAssets } = walletAndAssets

  const onTimerangeChange = timeRange => {
    const { from, to } = getIntervalByTimeRange(timeRange)

    setChartSettings({
      ...chartSettings,
      ...{ timeRange, from: from.toISOString(), to: to.toISOString() }
    })
  }

  const onCalendarChange = ([from, to]) => {
    setChartSettings({
      ...chartSettings,
      ...{
        from: from.toISOString(),
        to: to.toISOString()
      }
    })
  }

  const { timeRange, from, to } = chartSettings

  return (
    <div className={styles.container}>
      <BalanceViewWalletAssets
        address={stateAddress}
        assets={stateAssets}
        handleAssetsChange={handleAssetsChange}
        handleChange={handleChange}
      />
      <div className={styles.chart}>
        <BalanceChartHeader assets={stateAssets} address={stateAddress}>
          <LoadableChartSettings
            defaultTimerange={timeRange}
            onTimerangeChange={onTimerangeChange}
            onCalendarChange={onCalendarChange}
            from={from}
            to={to}
            classes={styles}
          />
        </BalanceChartHeader>

        <GetHistoricalBalance
          assets={assets}
          wallet={address}
          from={from}
          to={to}
          render={({ data, error }) => {
            if (error) return `Error!: ${error}`
            if (!data || Object.keys(data).length === 0) {
              return (
                <div>
                  <StatusDescription
                    label={
                      'Please paste the wallet address and choose supported assets in the forms above to see the historical data'
                    }
                  />
                  <HistoricalBalanceChart data={{}} />
                </div>
              )
            }
            const loading =
              Object.keys(data).filter(name => {
                return (data[name] || {}).loading
              }).length > 0
            return (
              <div>
                {loading && (
                  <StatusDescription label={'Calculating balance...'} />
                )}
                {
                  <ChartExpandView classes={styles}>
                    <HistoricalBalanceChart data={data} />
                  </ChartExpandView>
                }
              </div>
            )
          }}
        />
      </div>
    </div>
  )
}

export const StatusDescription = ({ label }) => {
  return (
    <div className={styles.descriptionContainer}>
      <div className={styles.description}>{label}</div>
    </div>
  )
}

const BalanceViewWalletAssets = ({
  address,
  assets,
  handleAssetsChange,
  handleChange
}) => {
  return (
    <div className={styles.filters}>
      <div className={cx(styles.InputWrapper, styles.wallet)}>
        <label className={styles.label} htmlFor='address'>
          Wallet address
        </label>
        <Input
          className={styles.walletInput}
          value={address}
          id='address'
          autoComplete='nope'
          type='text'
          name='address'
          placeholder='Paste the address'
          onChange={handleChange}
        />
      </div>
      <div className={cx(styles.InputWrapper, styles.address)}>
        <label className={styles.label} htmlFor='slug'>
          Asset (maximum 5)
        </label>
        <AssetsField
          byAddress={address}
          defaultSelected={assets}
          onChange={handleAssetsChange}
        />
      </div>
    </div>
  )
}

export default BalanceView
