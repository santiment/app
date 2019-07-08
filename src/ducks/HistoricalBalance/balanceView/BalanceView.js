import React, { useState, useEffect } from 'react'
import Input from '@santiment-network/ui/Input'
import cx from 'classnames'
import isEqual from 'lodash.isequal'
import GetHistoricalBalance from '../GetHistoricalBalance'
import HistoricalBalanceChart from '../chart/HistoricalBalanceChart'
import AssetsField from '../AssetsField'
import BalanceChartHeader from './BalanceChartHeader'
import styles from './BalanceView.module.scss'

const BalanceView = ({ address = '', assets = [], onChangeQuery }) => {
  const [state, setState] = useState({
    address: address,
    assets: assets
  })

  if (!isEqual(state.assets, assets)) {
    setState({ ...state, assets: assets })
  }

  useEffect(() => {
    onChangeQuery(state)
  }, state)

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const handleAssetsChange = assets => {
    const newState = { ...state, assets: assets.map(asset => asset.value) }
    setState(newState)
    onChangeQuery(newState)
  }

  const { address: stateAddress, assets: stateAssets } = state

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <div className={cx(styles.InputWrapper, styles.wallet)}>
          <label className={styles.label} htmlFor='address'>
            Wallet address
          </label>
          <Input
            className={styles.walletInput}
            value={stateAddress}
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
            byAddress={stateAddress}
            defaultSelected={stateAssets}
            onChange={handleAssetsChange}
          />
        </div>
      </div>
      <div className={styles.chart}>
        <BalanceChartHeader assets={stateAssets} address={stateAddress} />

        <GetHistoricalBalance
          assets={assets}
          wallet={address}
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
                {<HistoricalBalanceChart data={data} />}
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

export default BalanceView
