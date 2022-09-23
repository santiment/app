import React from 'react'
import cx from 'classnames'
import gql from 'graphql-tag'
import Info from '../shared/Info/Info'
import VolumeOfEthTrades from '../../../../ducks/EthTradingAnalysis/VolumeOfEthTrades/VolumeOfEthTrades'
import ProCheck from '../shared/ProCheck/ProCheck'
import LabelBalances from '../../../../ducks/Labels/LabelBalances/LabelBalances'
import { useRestrictedInfo } from '../../../UniswapProtocolPage/hooks'
import dashboardsStyles from '../dashboards.module.scss'

const LABEL_METRIC_BOUNDARIES_QUERY = gql`
  query {
    getMetric(metric: "all_known_balance") {
      metadata {
        isRestricted
      }
    }
  }
`

const EthTokenTrading = ({ isDesktop }) => {
  const isLabelsProChecking = useRestrictedInfo(LABEL_METRIC_BOUNDARIES_QUERY)

  return (
    <section className={cx(dashboardsStyles.wrapper, 'column')}>
      <Info title='ETH Token Trading Analysis' description='' />
      <main className={cx(dashboardsStyles.content, 'column')}>
        <div id='eth_token_volume_against_eth'>
          <h4 className='h4 txt-b mrg-xxl mrg--b'>Volume against ETH Based tokens (DEXs)</h4>
          <VolumeOfEthTrades metric='eth_trade_volume_by_token' />
        </div>
        <div id='eth_token_volume_against_usd'>
          <h4 className='h4 txt-b mrg-xxl mrg--b'>Volume against USD Based tokens (Stablecoins)</h4>
          <VolumeOfEthTrades metric='stablecoin_trade_volume_by_token' />
        </div>
        <div id='eth_token_token_against_eth'>
          <h4 className='h4 txt-b mrg-xxl mrg--b'>
            Token Price against ETH Based Tokens segmented by DEXs
          </h4>
          <VolumeOfEthTrades metric='token_eth_price_by_dex_5m' />
        </div>
        <div id='eth_token_label_balance'>
          <h4 className='h4 txt-b mrg-s mrg--b'>Label Balance</h4>
          <ProCheck isPaywalActive={isLabelsProChecking}>
            <LabelBalances />
          </ProCheck>
        </div>
      </main>
    </section>
  )
}

export default EthTokenTrading
