import React from 'react'
import cx from 'classnames'
import Info from '../shared/Info/Info'
import TopExchangesTable from '../../../../components/Tables/TopExchanges'
import UniswapFlowBalances from '../../../../ducks/UniswapProtocol/UniswapFlowBalances'
import UniswapTopTransactions from '../../../../ducks/UniswapProtocol/UniswapTopTransactions/UniswapTopTransactions'
import UniMetricsChart from '../../../../ducks/UniswapProtocol/UniMetricsChart/UniMetricsChart'
import UniswapMetrics from '../../../../ducks/UniswapProtocol/UniswapMetrics/UniswapMetrics'
import UniswapHistoricalBalance from '../../../../ducks/Studio/Tabs/UniswapHistoricalBalance/UniswapHistoricalBalance'
import ClaimersWidgets, { ChartWidget } from '../../../../components/ClaimersWidgets'
import TopClaimersTable from '../../../../components/Tables/TopClaimers'
import UniswapWhoClaimed from '../../../../ducks/UniswapProtocol/UniswapPieChart/WhoClaimedPieChart'
import CheckProPaywall from '../../../../ducks/Stablecoins/CheckProPaywall'
import { Metric } from '../../../../ducks/dataHub/metrics'
import { useUserSubscriptionStatus } from '../../../../stores/user/subscriptions'
import { useRestrictedInfo } from '../../hooks'
import dashboardsStyles from '../dashboards.module.scss'
import styles from './Uniswap.module.scss'

const BALANCE_CHART_PADDING = {
  top: 16,
  right: 45,
  bottom: 18,
  left: 45,
}

const BALANCE_CHART_TICKS = {
  xTicks: 6,
  yTicks: 6,
}

const UniswapProtocol = () => {
  const areClaimsRestricted = useRestrictedInfo({
    metric: 'uniswap_total_claims_amount',
  })
  const { isPro } = useUserSubscriptionStatus()

  return (
    <section className={cx(dashboardsStyles.wrapper, 'column')}>
      <Info
        title='Uniswap Procotol'
        description='Real-time data on UNI token distribution, total amount of UNI claimed, amount of UNI on centralized and decentralized exchange, top UNI transactions and more.'
      />
      <main className={cx(dashboardsStyles.content, 'column')}>
        <div id='uniswap_top_exchanges'>
          <div>
            <TopExchangesTable slug='uniswap' />
          </div>
        </div>
        <div id='uniswap_uni_balances'>
          <h4 className='h4 txt-b mrg-xxl mrg--b'>UNI Flow Balances</h4>
          <div>
            {!isPro ? (
              <CheckProPaywall>
                <UniswapFlowBalances />
              </CheckProPaywall>
            ) : (
              <UniswapFlowBalances />
            )}
          </div>
        </div>
        <div id='uniswap_top_token_transactions'>
          <div>
            <UniswapTopTransactions />
          </div>
        </div>
        <div id='uniswap_uni_price'>
          <h4 className='h4 txt-b mrg-s mrg--b'>UNI Price, Age Consumed, Active Addresses (24h)</h4>
          <p className={cx(dashboardsStyles.description, 'body-2 mrg-xxl mrg--b')}>
            Daily active addresses signal the overall level of speculative (and utilitarian)
            interest in a digital asset. As a result, sustained price rallies tend to necessitate a
            strong uptick in active addresses. Spikes in Age Consumed point to a substantial amount
            of previously idle coins moving addresses, suggesting a shift in the behavior of
            long-term investors. These shifts are often strong indicators of upcoming price
            volatility in either direction
          </p>
          <div>
            <UniMetricsChart />
          </div>
        </div>
        <div id='uniswap_token_distributor'>
          <h4 className='h4 txt-b mrg-xxl mrg--b'>Token Distributor</h4>
          <div>
            {areClaimsRestricted ? (
              <CheckProPaywall>
                <UniswapMetrics />
              </CheckProPaywall>
            ) : (
              <UniswapMetrics />
            )}
          </div>
        </div>
        <div id='uniswap_uni_token_claims'>
          <h4 className='h4 txt-b mrg-s mrg--b'>UNI Token Claims</h4>
          <p className={cx(dashboardsStyles.description, 'body-2 mrg-xxl mrg--b')}>
            0x090d4613473dee047c3f2706764f49e0821d256e
          </p>
          <div className={styles.overviewWrapper}>
            <UniswapHistoricalBalance
              className={styles.balance__chart}
              headerClassName={styles.balance__header}
              axesTicks={BALANCE_CHART_TICKS}
              padding={BALANCE_CHART_PADDING}
              height={448}
            />
            <ChartWidget
              height={448}
              metrics={[Metric.uniswap_total_claims_amount, Metric.uniswap_total_claims_percent]}
            />
          </div>
        </div>
        <div id='uniswap_top_claimers'>
          <div>
            {areClaimsRestricted ? (
              <CheckProPaywall>
                <TopClaimersTable />
              </CheckProPaywall>
            ) : (
              <TopClaimersTable />
            )}
          </div>
        </div>
        <div id='uniswap_uni_claims'>
          <h4 className='h4 txt-b mrg-xxl mrg--b'>UNI Claims: Overview</h4>
          <div>
            {areClaimsRestricted ? (
              <CheckProPaywall>
                <ClaimersWidgets />
              </CheckProPaywall>
            ) : (
              <ClaimersWidgets />
            )}
          </div>
        </div>
        <div id='uniswap_who_claimed'>
          <h4 className='h4 txt-b mrg-xxl mrg--b'>Who claimed UNI?</h4>
          <div>
            <UniswapWhoClaimed />
          </div>
        </div>
      </main>
    </section>
  )
}

export default UniswapProtocol
