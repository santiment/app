import React, { Component } from 'react'
import cx from 'classnames'
import * as qs from 'query-string'
import BalanceView from '../balanceView/BalanceView'
import HelpPopup from '../../../components/HelpPopup/HelpPopup'
import MobileHeader from '../../../components/MobileHeader/MobileHeader'
import { mapStateToQS } from '../../../utils/utils'
import styles from './HistoricalBalancePage.module.scss'

export const mapQSToState = ({ location, address, assets } = {}) => {
  if (!location) {
    return {
      address,
      assets
    }
  }

  const { newAddress = '', newAssets = [] } = qs.parse(location.search, {
    arrayFormat: 'bracket'
  })

  return {
    address: newAddress,
    assets: newAssets
  }
}

export default class HistoricalBalancePage extends Component {
  state = {
    ...mapQSToState(this.props)
  }

  static defaultProps = {
    showTitle: true,
    classes: {}
  }

  render () {
    const { isDesktop, showTitle, classes } = this.props
    const { address, assets } = this.state

    return (
      <div className={styles.historicalBalancePage + ' page'}>
        {showTitle && <BalancePageTitle isDesktop={isDesktop} />}
        <BalanceView
          classes={classes}
          onChangeQuery={this.handleChangeQuery}
          address={address}
          assets={assets}
        />
      </div>
    )
  }

  mapStateToUrlQuery = ({ address, assets: assetsSlugs }) => {
    const assets = mapAssetsToFlatArray(assetsSlugs)
    return mapStateToQS({ address, assets })
  }

  updateSearchQuery = newState => {
    const { history } = this.props
    if (history) {
      history.push({
        search: this.mapStateToUrlQuery(newState)
      })
    } else {
      this.setState(newState)
    }
  }

  handleChangeQuery = newState => {
    this.updateSearchQuery(newState)
  }
}

export const mapAssetsToFlatArray = assetsSlugs =>
  assetsSlugs.map(a => (a.slug ? a.slug : a))

const BalancePageExplanation = () => (
  <>
    <span>Historical balance</span>
    <span className={styles.questionIcon}>
      <HelpPopup position='bottom left'>
        Enter any ERC-20 wallet's address and choose up to 5 assets for a
        detailed breakdown of the wallet's balance over time.
      </HelpPopup>
    </span>
  </>
)

export const BalancePageTitle = ({ isDesktop = true, classes = {} }) => {
  return (
    <>
      {isDesktop && (
        <div className={styles.header}>
          <div className={cx(styles.title, classes.title)}>
            <BalancePageExplanation />
          </div>
        </div>
      )}
      {!isDesktop && <MobileHeader title={<BalancePageExplanation />} />}
    </>
  )
}
