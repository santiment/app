import React from 'react'
import cx from 'classnames'
import Info from '../shared/Info/Info'
import Section from '../shared/Section/Section'
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

const TOTAL_CLAIMS_METRICS = [
  Metric.uniswap_total_claims_amount,
  Metric.uniswap_total_claims_percent,
]

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
        <Section id='uniswap_top_exchanges'>
          <div>
            <TopExchangesTable slug='uniswap' />
          </div>
        </Section>
        <Section id='uniswap_uni_balances' title='UNI Flow Balances'>
          <div>
            <CheckProPaywall shouldCheck={!isPro}>
              <UniswapFlowBalances />
            </CheckProPaywall>
          </div>
        </Section>
        <Section id='uniswap_top_token_transactions'>
          <div>
            <UniswapTopTransactions />
          </div>
        </Section>
        <Section
          id='uniswap_uni_price'
          title='UNI Price, Age Consumed, Active Addresses (24h)'
          description='Daily active addresses signal the overall level of speculative (and utilitarian)
            interest in a digital asset. As a result, sustained price rallies tend to necessitate a
            strong uptick in active addresses. Spikes in Age Consumed point to a substantial amount
            of previously idle coins moving addresses, suggesting a shift in the behavior of
            long-term investors. These shifts are often strong indicators of upcoming price
            volatility in either direction'
        >
          <div>
            <UniMetricsChart />
          </div>
        </Section>
        <Section id='uniswap_token_distributor' title='Token Distributor'>
          <div>
            <CheckProPaywall shouldCheck={areClaimsRestricted}>
              <UniswapMetrics />
            </CheckProPaywall>
          </div>
        </Section>
        <Section
          id='uniswap_uni_token_claims'
          title='UNI Token Claims'
          description='0x090d4613473dee047c3f2706764f49e0821d256e'
        >
          <div className={styles.overviewWrapper}>
            <UniswapHistoricalBalance
              className={styles.balance__chart}
              headerClassName={styles.balance__header}
              axesTicks={BALANCE_CHART_TICKS}
              padding={BALANCE_CHART_PADDING}
              height={448}
            />
            <ChartWidget height={448} metrics={TOTAL_CLAIMS_METRICS} />
          </div>
        </Section>
        <Section id='uniswap_top_claimers'>
          <div>
            <CheckProPaywall shouldCheck={areClaimsRestricted}>
              <TopClaimersTable />
            </CheckProPaywall>
          </div>
        </Section>
        <Section id='uniswap_uni_claims' title='UNI Claims: Overview'>
          <div>
            <CheckProPaywall shouldCheck={areClaimsRestricted}>
              <ClaimersWidgets />
            </CheckProPaywall>
          </div>
        </Section>
        <Section id='uniswap_who_claimed' title='Who claimed UNI?'>
          <div>
            <UniswapWhoClaimed />
          </div>
        </Section>
      </main>
    </section>
  )
}

export default UniswapProtocol
