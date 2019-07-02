import React, { useState, useEffect } from 'react'
import Input from '@santiment-network/ui/Input'
import cx from 'classnames'
import isEqual from 'lodash.isequal'
import GetHistoricalBalance from '../GetHistoricalBalance'
import HistoricalBalanceChart from '../chart/HistoricalBalanceChart'
import AssetsField from '../AssetsField'
import { ASSETS_BY_WALLET_QUERY } from '../common/queries'
import {
  ETH_WALLET_AMOUNT_UP,
  ETH_WALLET_METRIC
} from '../../Signals/utils/constants'
import SignalMasterModalForm from '../../Signals/signalModal/SignalMasterModalForm'
import ShowIf from '../../../components/ShowIf'
import { graphql } from 'react-apollo'
import styles from './BalanceView.module.scss'

const BalanceView = ({ address = '', assets = [], onChangeQuery }) => {
  console.log(assets)
  const [state, setState] = useState({
    address: address,
    assets: assets
  })

  useEffect(() => {
    onChangeQuery(state)
  }, state)

  console.log(state.assets)

  if (!isEqual(state.assets, assets)) {
    setState({ ...state, assets: assets })
  }

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const handleAssetsChange = assets => {
    setState({ ...state, assets: assets.map(asset => asset.value) })
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
            defaultSelected={stateAssets}
            onChange={handleAssetsChange}
          />
        </div>
      </div>
      <div className={styles.chart}>
        <div className={styles.addTrigger}>
          <ShowIf beta>
            <SignalMasterModalForm
              label='Generate signal'
              enabled={address && assets && assets.length === 1}
              canRedirect={false}
              metaFormSettings={{
                target: {
                  value: {
                    value: assets[0],
                    label: assets[0]
                  }
                },
                metric: {
                  value: { ...ETH_WALLET_METRIC }
                },
                type: {
                  value: { ...ETH_WALLET_AMOUNT_UP }
                },
                ethAddress: address
              }}
              buttonParams={{
                variant: 'ghost',
                border: true
              }}
            />
          </ShowIf>
        </div>

        <GetHistoricalBalance
          assets={assets}
          wallet={address}
          render={({ data, error }) => {
            if (error) return `Error!: ${error}`
            if (!data || Object.keys(data).length === 0) {
              return <HistoricalBalanceChart data={{}} />
            }
            const loading =
              Object.keys(data).filter(name => {
                return (data[name] || {}).loading
              }).length > 0
            return (
              <div>
                {loading && (
                  <span className={styles.centered}>
                    Calculating balance...
                  </span>
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

const mapDataToProps = ({
  data: { assetsHeldByAddress, loading, error } = {}
} = {}) => {
  if (loading || error || !assetsHeldByAddress) {
    return {}
  }

  return {
    assets: assetsHeldByAddress.map(asset => asset.slug)
  }
}

const enhance = graphql(ASSETS_BY_WALLET_QUERY, {
  props: mapDataToProps,
  skip: ({ address }) => {
    return !address
  },
  options: ({ address }) => {
    return {
      variables: {
        address: address
      },
      fetchPolicy: 'cache-first'
    }
  }
})
export default enhance(BalanceView)
