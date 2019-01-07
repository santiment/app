import React from 'react'
import { Input, Button } from '@santiment-network/ui'
import '@santiment-network/ui/styles.css'
import GetHistoricalBalance from './GetHistoricalBalance'
import HistoricalBalanceChart from './HistoricalBalanceChart'
import AssetsField from './AssetsField'
import styles from './BalanceView.module.scss'

class BalanceView extends React.Component {
  state = {
    address: this.props.address || '',
    assets: this.props.assets || [],
    history: [],
    isVisibleHistory: false
  }

  render() {
    const { address, assets, isVisibleHistory, history } = this.state
    return (
      <div className={styles.BalanceExtension}>
        <div className={styles.InputWrapper}>
          <label htmlFor="address">Wallet address</label>
          <div className={styles.InputWithAction}>
            <Input
              value={address}
              id="address"
              name="address"
              placeholder="Paste the address"
              onChange={this.handleChange} />
            {history.length > 0 &&
                <Button onClick={() =>
                    this.setState({isVisibleHistory: !isVisibleHistory})}>
                    History
                  </Button>}
                </div>
                {isVisibleHistory &&
                    <div className={styles.historyDropdown}>
                      {this.state.history.map(address => (
                        <div key={address} className={styles.addressLink} onClick={() => {
                          this.setState({address, isVisibleHistory: false})
                        }}>{address}</div>
                      ))}
                    </div>
                }
              </div>
              <div className={styles.InputWrapper}>
                <label htmlFor="slug">Asset</label>
                <AssetsField
                  defaultSelected={assets}
                  onChange={this.handleAssetsChange}
                />
                <div className={styles.hint}>Up to 5 assets</div>
              </div>
              <GetHistoricalBalance
                assets={assets}
                wallet={address}
                render={({data, error}) => {
                  if (error) return `Error!: ${error}`
                  if (!data || Object.keys(data).length === 0) return (
                    <HistoricalBalanceChart data={{}} />
                  )
                  const loading = Object.keys(data).filter(name => {
                    return ((data[name] || {}).loading)
                  }).length > 0
                  return (
                    <div>
                      {loading && <span>Calculating balance...</span>}
                      {<HistoricalBalanceChart data={data} />}
                    </div>
                  )
                }} />
            </div>
    )
  }

  handleChange = event => {
    if (event.target.name === 'address' && event.target.value.length === 42) {
      const unique = new Set([...this.state.history, event.target.value])
      this.setState({history: Array.from(unique)})
    }
    this.setState({[event.target.name]: event.target.value}, () => {
      this.props.onChangeQuery(this.state)
    })
  }

  handleAssetsChange = assets => {
    this.setState({assets: assets.map(asset => asset.value)}, () => {
      this.props.onChangeQuery(this.state)
    })
  }
}

export default BalanceView
