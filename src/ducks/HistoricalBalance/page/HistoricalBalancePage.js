import React, { Component } from 'react'
import * as qs from 'query-string'
import BalanceView from '../balanceView/BalanceView'
import styles from './HistoricalBalancePage.module.scss'
import ShowIf from '../../../components/ShowIf'
import SignalMasterModalForm from '../../Signals/signalModal/SignalMasterModalForm'
import { ETH_WALLET_METRIC } from '../../Signals/utils/constants'
import { Icon } from '@santiment-network/ui'
import { Tooltip } from 'recharts'
import HelpPopup from '../../../components/HelpPopup/HelpPopup'

export const mapQSToState = ({ location }) => {
  const { address, assets } = qs.parse(location.search, {
    arrayFormat: 'bracket'
  })

  return {
    address: address || '',
    assets: assets || []
  }
}

export default class HistoricalBalancePage extends Component {
  state = {
    ...mapQSToState(this.props)
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    return {
      ...mapQSToState(nextProps)
    }
  }

  render () {
    const { address, assets } = this.state

    return (
      <div className={styles.historicalBalancePage + ' page'}>
        <div className={styles.header}>
          <div className={styles.title}>
            <span>Historycal balance</span>
            <span className={styles.questionIcon}>
              <HelpPopup>
                Enter any ERC-20 wallet's address and choose up to 5 assets for
                a detailed breakdown of the wallet's balance over time.
              </HelpPopup>
            </span>
          </div>

          <ShowIf beta>
            <div className={styles.newTrigger}>
              <SignalMasterModalForm
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
                  ethAddress: address
                }}
              />
            </div>
          </ShowIf>
        </div>
        <BalanceView
          onChangeQuery={this.handleChangeQuery}
          address={address}
          assets={assets}
        />
      </div>
    )
  }

  mapStateToUrlQuery = ({ address, assets }) =>
    '?' + qs.stringify({ address, assets }, { arrayFormat: 'bracket' })

  updateSearchQuery = newState => {
    this.props.history.push({
      search: this.mapStateToUrlQuery(newState)
    })
  }

  handleChangeQuery = newState => {
    this.updateSearchQuery(newState)
  }
}
