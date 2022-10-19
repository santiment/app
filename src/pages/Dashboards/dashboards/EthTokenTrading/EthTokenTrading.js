import React from 'react'
import cx from 'classnames'
import VolumeOfEthTrades from '../../../../ducks/EthTradingAnalysis/VolumeOfEthTrades/VolumeOfEthTrades'
import CheckProPaywall from '../../../../ducks/Stablecoins/CheckProPaywall'
import LabelBalances from '../../../../ducks/Labels/LabelBalances/LabelBalances'
import Info from '../shared/Info/Info'
import Section from '../shared/Section/Section'
import { useRestrictedInfo } from '../../../UniswapProtocolPage/hooks'
import { withRenderQueueProvider } from '../../../../ducks/renderQueue/viewport'
import { LABEL_METRIC_BOUNDARIES_QUERY } from './queries'
import dashboardsStyles from '../dashboards.module.scss'

const EthTokenTrading = () => {
  const isLabelsProChecking = useRestrictedInfo(LABEL_METRIC_BOUNDARIES_QUERY)

  return (
    <section className={cx(dashboardsStyles.wrapper, 'column')}>
      <Info title='ETH Token Trading Analysis' description='' />
      <main className={cx(dashboardsStyles.content, 'column')}>
        <Section id='eth_token_volume_against_eth' title='Volume against ETH Based tokens (DEXs)'>
          <div>
            <VolumeOfEthTrades metric='eth_trade_volume_by_token' />
          </div>
        </Section>
        <Section
          id='eth_token_volume_against_usd'
          title='Volume against USD Based tokens (Stablecoins)'
        >
          <div>
            <VolumeOfEthTrades metric='stablecoin_trade_volume_by_token' />
          </div>
        </Section>
        <Section
          id='eth_token_token_against_eth'
          title='Token Price against ETH Based Tokens segmented by DEXs'
        >
          <div>
            <VolumeOfEthTrades metric='token_eth_price_by_dex_5m' />
          </div>
        </Section>
        <Section id='eth_token_label_balance' title='Label Balance'>
          <div>
            <CheckProPaywall shouldCheck={isLabelsProChecking}>
              <LabelBalances />
            </CheckProPaywall>
          </div>
        </Section>
      </main>
    </section>
  )
}

export default withRenderQueueProvider(EthTokenTrading)
