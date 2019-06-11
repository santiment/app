import React from 'react'
import { Input } from '@santiment-network/ui'
import GetHistoricalBalance from './GetHistoricalBalance'
import HistoricalBalanceChart from './HistoricalBalanceChart'
import AssetsField from './AssetsField'
import styles from './BalanceView.module.scss'
import SignalMasterModalForm from '../Signals/SignalModal/SignalMasterModalForm'
import ShowIf from '../../components/ShowIf'

class BalanceView extends React.Component {
  state = {
    address: this.props.address || '',
    assets: this.props.assets || []
  }

  render () {
    const { address, assets } = this.state
    return (
      <div className={styles.BalanceExtension}>
        <div className={styles.InputWrapper}>
          <label htmlFor='address'>Wallet address</label>
          <div className={styles.InputWithAction}>
            <Input
              value={address}
              id='address'
              autoComplete='nope'
              type='text'
              name='address'
              placeholder='Paste the address'
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className={styles.InputWrapper}>
          <label htmlFor='slug'>Asset</label>
          <AssetsField
            defaultSelected={assets}
            onChange={this.handleAssetsChange}
          />
          <div className={styles.hint}>Up to 5 assets</div>
          <div className={styles.hint}>
            This tool is beta. We give no guarantee data is correct
          </div>
        </div>

        <ShowIf beta>
          {assets && assets.length === 1 && (
            <SignalMasterModalForm canRedirect={false} asset={assets[0]} />
          )}
        </ShowIf>

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
                {loading && <span>Calculating balance...</span>}
                {<HistoricalBalanceChart data={data} />}
              </div>
            )
          }}
        />
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
