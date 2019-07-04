import React, { Component } from 'react'
import * as qs from 'query-string'
import BalanceView from '../balanceView/BalanceView'
import HelpPopup from '../../../components/HelpPopup/HelpPopup'
import MobileHeader from '../../../components/MobileHeader/MobileHeader'
import styles from './HistoricalBalancePage.module.scss'

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
    const { isDesktop } = this.props
    const { address, assets } = this.state

    return (
      <div className={styles.historicalBalancePage + ' page'}>
        {isDesktop && (
          <div className={styles.header}>
            <div className={styles.title}>
              <BalancePageExplanation />
            </div>
          </div>
        )}
        {!isDesktop && <MobileHeader title={<BalancePageExplanation />} />}
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

const BalancePageExplanation = () => (
  <div>
    <span>Historical balance</span>
    <span className={styles.questionIcon}>
      <HelpPopup>
        Enter any ERC-20 wallet's address and choose up to 5 assets for a
        detailed breakdown of the wallet's balance over time.
      </HelpPopup>
    </span>
  </div>
)
