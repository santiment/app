import React from 'react'
import { Input } from '@santiment-network/ui'
import cx from 'classnames'
import GetHistoricalBalance from '../GetHistoricalBalance'
import HistoricalBalanceChart from '../chart/HistoricalBalanceChart'
import AssetsField from '../AssetsField'
import styles from './BalanceView.module.scss'
import {
  ETH_WALLET_AMOUNT_UP,
  ETH_WALLET_METRIC
} from '../../Signals/utils/constants'
import SignalMasterModalForm from '../../Signals/signalModal/SignalMasterModalForm'
import ShowIf from '../../../components/ShowIf'

class BalanceView extends React.Component {
  state = {
    address: this.props.address || '',
    assets: this.props.assets || []
  }

  render () {
    const { address, assets } = this.state

    return (
      <div className={styles.container}>
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
              onChange={this.handleChange}
            />
          </div>
          <div className={cx(styles.InputWrapper, styles.address)}>
            <label className={styles.label} htmlFor='slug'>
              Asset (maximum 5)
            </label>
            <AssetsField
              defaultSelected={assets}
              onChange={this.handleAssetsChange}
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
                classes={styles}
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

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.props.onChangeQuery(this.state)
    })
  }

  handleAssetsChange = assets => {
    this.setState({ assets: assets.map(asset => asset.value) }, () => {
      this.props.onChangeQuery(this.state)
    })
  }
}

export default BalanceView
