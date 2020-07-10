import React, { Component } from 'react'
import cx from 'classnames'
import BalanceView from '../balanceView/BalanceView'
import MobileHeader from '../../../components/MobileHeader/MobileHeader'
import HelpPopup from '../../../components/HelpPopup/HelpPopup'
import { mapQSToState, mapStateToQS } from '../../../utils/utils'
import styles from './HistoricalBalancePage.module.scss'

export const mapToState = props => {
  if (props.location) {
    const {
      address: newAddress,
      assets: newAssets,
      priceMetrics: newPriceMetrics
    } = mapQSToState(props)

    return {
      address: newAddress || '',
      assets: newAssets || [],
      priceMetrics: newPriceMetrics
    }
  } else {
    const { address, assets, priceMetrics } = props
    return {
      address,
      assets,
      priceMetrics: priceMetrics
    }
  }
}

export const initPriceMetrics = (assets, isEnabled) =>
  assets && assets.length > 0
    ? assets.map(item => ({ asset: item, enabled: isEnabled }))
    : []

const isInAssets = (assets, asset) => {
  return assets.some(item => item === asset || (item && item.slug === asset))
}

export default class HistoricalBalancePage extends Component {
  state = {
    ...mapToState(this.props)
  }

  static defaultProps = {
    showTitle: true,
    classes: {}
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const { assets, address, priceMetrics } = nextProps

    if (!assets || !address || !priceMetrics) {
      return { ...mapToState(nextProps) }
    } else {
      return prevState
    }
  }

  render () {
    const { isDesktop, showTitle, classes } = this.props

    return (
      <div
        className={cx(
          styles.historicalBalancePage,
          'page',
          classes.historicalBalancePage
        )}
      >
        {showTitle && (
          <BalancePageTitle isDesktop={isDesktop} classes={classes} />
        )}
        <BalanceView
          classes={classes}
          onChangeQuery={this.handleChangeQuery}
          queryData={this.state}
        />
      </div>
    )
  }

  mapStateToUrlQuery = ({ address, assets, priceMetrics }) => {
    return mapStateToQS({
      address,
      assets: mapAssetsToFlatArray(assets),
      priceMetrics: mapAssetsToFlatArray(priceMetrics)
    })
  }

  updateSearchQuery = data => {
    let { assets, address, priceMetrics = [] } = data
    priceMetrics = priceMetrics.filter(
      ({ asset, enabled }) => enabled && isInAssets(assets, asset)
    )

    const newState = { assets, address, priceMetrics }

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
  assetsSlugs.map(item => {
    const { slug, asset } = item
    return slug || asset || item
  })

const BalancePageExplanation = () => (
  <>
    <span>Historical balance</span>
    <span className={styles.questionIcon}>
      <HelpPopup position='bottom' align='start'>
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
      {!isDesktop && (
        <MobileHeader title={<BalancePageExplanation />} classes={styles} />
      )}
    </>
  )
}
