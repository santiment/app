import React from 'react'
import cx from 'classnames'
import VolumeOfEthTrades from '../../../../ducks/EthTradingAnalysis/VolumeOfEthTrades/VolumeOfEthTrades'
import CheckProPaywall from '../../../../ducks/Stablecoins/CheckProPaywall'
import LabelBalances from '../../../../ducks/Labels/LabelBalances/LabelBalances'
import Info from '../shared/Info/Info'
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
        <div id='eth_token_volume_against_eth'>
          <h4 className='h4 txt-b mrg-xxl mrg--b'>Volume against ETH Based tokens (DEXs)</h4>
          <div>
            <VolumeOfEthTrades metric='eth_trade_volume_by_token' />
          </div>
        </div>
        <div id='eth_token_volume_against_usd'>
          <h4 className='h4 txt-b mrg-xxl mrg--b'>Volume against USD Based tokens (Stablecoins)</h4>
          <div>
            <VolumeOfEthTrades metric='stablecoin_trade_volume_by_token' />
          </div>
        </div>
        <div id='eth_token_token_against_eth'>
          <h4 className='h4 txt-b mrg-xxl mrg--b'>
            Token Price against ETH Based Tokens segmented by DEXs
          </h4>
          <div>
            <VolumeOfEthTrades metric='token_eth_price_by_dex_5m' />
          </div>
        </div>
        <div id='eth_token_label_balance'>
          <h4 className='h4 txt-b mrg-xxl mrg--b'>Label Balance</h4>
          <div>
            {isLabelsProChecking ? (
              <CheckProPaywall>
                <LabelBalances />
              </CheckProPaywall>
            ) : (
              <LabelBalances />
            )}
          </div>
        </div>
      </main>
    </section>
  )
}

export default withRenderQueueProvider(EthTokenTrading)
