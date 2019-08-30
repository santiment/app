import React, { useState } from 'react'
import Input from '@santiment-network/ui/Input'
import cx from 'classnames'
import GetHistoricalBalance from '../GetHistoricalBalance'
import HistoricalBalanceChart from '../chart/HistoricalBalanceChart'
import AssetsField from '../AssetsField'
import BalanceChartHeader from './BalanceChartHeader'
import Loadable from 'react-loadable'
import { getIntervalByTimeRange } from '../../../utils/dates'
import { isPossibleEthAddress } from '../../Signals/utils/utils'
import { mapAssetsToFlatArray } from '../page/HistoricalBalancePage'
import styles from './BalanceView.module.scss'
import { mapStateToQS } from '../../../utils/utils'

const LoadableChartSettings = Loadable({
  loader: () => import('./BalanceViewChartSettings'),
  loading: () => <div />
})

const DEFAULT_TIME_RANGE = '6m'

const BalanceView = ({
  address = '',
  assets = [],
  onChangeQuery,
  classes = {}
}) => {
  const [walletAndAssets, setWalletAndAssets] = useState({
    address,
    assets
  })

  const setWalletsAndAssetsWrapper = data => {
    setWalletAndAssets(data)
    onChangeQuery(data)
  }

  const [chartSettings, setChartSettings] = useState({
    timeRange: DEFAULT_TIME_RANGE,
    ...getIntervalByTimeRange(DEFAULT_TIME_RANGE)
  })

  const handleWalletChange = event => {
    setWalletsAndAssetsWrapper({
      ...walletAndAssets,
      [event.target.name]: event.target.value
    })
  }

  const handleAssetsChange = assets => {
    const newState = {
      ...walletAndAssets,
      assets
    }
    setWalletsAndAssetsWrapper(newState)
  }

  const { address: stateAddress, assets: stateAssets } = walletAndAssets

  const onTimerangeChange = timeRange => {
    const { from, to } = getIntervalByTimeRange(timeRange)

    setChartSettings({
      ...chartSettings,
      timeRange,
      from: from.toISOString(),
      to: to.toISOString()
    })
  }

  const onCalendarChange = ([from, to]) => {
    setChartSettings({
      ...chartSettings,
      from: from.toISOString(),
      to: to.toISOString()
    })
  }

  const { timeRange, from, to } = chartSettings

  return (
    <div className={cx(styles.container, classes.balanceViewContainer)}>
      <BalanceViewWalletAssets
        address={stateAddress}
        assets={stateAssets}
        handleAssetsChange={handleAssetsChange}
        handleWalletChange={handleWalletChange}
        classes={classes}
      />
      <div className={cx(styles.chart, classes.balanceViewChart)}>
        <BalanceChartHeader assets={stateAssets} address={stateAddress}>
          <LoadableChartSettings
            defaultTimerange={timeRange}
            onTimerangeChange={onTimerangeChange}
            onCalendarChange={onCalendarChange}
            from={from}
            to={to}
            classes={styles}
            queryString={mapStateToQS({ address, assets })}
          />
        </BalanceChartHeader>

        <GetHistoricalBalance
          assets={mapAssetsToFlatArray(assets)}
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
              <>
                {loading && (
                  <StatusDescription label={'Calculating balance...'} />
                )}
                {<HistoricalBalanceChart data={data} />}
              </>
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
  handleWalletChange,
  classes = {}
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
          isError={!isPossibleEthAddress(address)}
          name='address'
          placeholder='Paste the address'
          onChange={handleWalletChange}
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
