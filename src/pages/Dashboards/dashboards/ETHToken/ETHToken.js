import React from 'react'
import gql from 'graphql-tag'
import { Block } from '../../../StablecoinsPage/StablecoinsPageStructure'
import VolumeOfEthTrades from '../../../../ducks/EthTradingAnalysis/VolumeOfEthTrades/VolumeOfEthTrades'
import LabelBalances from '../../../../ducks/Labels/LabelBalances/LabelBalances'
import Header from '../Header/Header'
import { useRestrictedInfo } from '../../../UniswapProtocolPage/hooks'
import { withRenderQueueProvider } from '../../../../ducks/renderQueue/viewport'
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

const EthToken = ({ submenu, shareLinkText, description }) => {
  const isLabelsProChecking = useRestrictedInfo(LABEL_METRIC_BOUNDARIES_QUERY)

  return (
    <div className='column fluid'>
      <Header shareLinkText={shareLinkText} description={description} />
      <div className={dashboardsStyles.content}>
        <Block
          title={submenu[1].title}
          tag={submenu[1].key}
          className={dashboardsStyles.firstBlock}
        >
          <VolumeOfEthTrades metric='eth_trade_volume_by_token' />
        </Block>
        <Block title={submenu[2].title} tag={submenu[2].key}>
          <VolumeOfEthTrades metric='stablecoin_trade_volume_by_token' />
        </Block>
        <Block title={submenu[3].title} tag={submenu[3].key}>
          <VolumeOfEthTrades metric='token_eth_price_by_dex_5m' />
        </Block>
        <Block title={submenu[5].title} tag={submenu[5].key} isPaywalActive={isLabelsProChecking}>
          <LabelBalances />
        </Block>
      </div>
    </div>
  )
}

export default withRenderQueueProvider(EthToken)
