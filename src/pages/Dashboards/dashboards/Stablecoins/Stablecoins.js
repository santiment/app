import React from 'react'
import cx from 'classnames'
import Info from '../shared/Info/Info'
import StablecoinsMarketCap from '../../../../ducks/Stablecoins/StablecoinsMarketCap/StablecoinsMarketCap'
import WhaleTrendsList from '../../../../ducks/Stablecoins/WhaleTrendsList/WhaleTrendsList'
import FlowToExchangesList from '../../../../ducks/Stablecoins/FlowToExchanges/FlowToExchangesList'
import TopExchangesTable from '../../../../components/Tables/TopExchanges'
import NetExchangeFlow from '../../../../ducks/Stablecoins/NetExchangeFlow/NetExchangeFlow'
import StablecoinsTransactions from '../../../../ducks/Stablecoins/StablecoinsTransactions/StablecoinsTransactions'
import StablecoinHolderDistribution from '../../../../ducks/Stablecoins/HolderDistribution/StablecoinHolderDistribution'
import TransactionsDominance from '../../../../ducks/Stablecoins/TransactionsDominance/TransactionsDominance'
import NetworkActivity from '../../../../ducks/Stablecoins/NetworkActivity/NetworkActivity'
import CurrentPageReport from '../../../../ducks/Stablecoins/StablecoinsReport/CurrentPageReport'
import CheckProPaywall from '../../../../ducks/Stablecoins/CheckProPaywall'
import { BlockWithRanges } from '../../../StablecoinsPage/StablecoinsPageStructure'
import { withRenderQueueProvider } from '../../../../ducks/renderQueue/viewport'
import { getTimerangePeriod } from '../../../../utils/dates'
import { isStage } from '../../../../utils/utils'
import dashboardsStyles from '../dashboards.module.scss'

const Stablecoins = () => (
  <section className={cx(dashboardsStyles.wrapper, 'column')}>
    <Info
      title='Stablecoins'
      description='Real-time information on the biggest stablecoins’ market size, whale behavior, speculative demand and more.'
    />
    <main className={cx(dashboardsStyles.content, 'column')}>
      <CurrentPageReport />
      <div id='stablecoins_overview'>
        <h4 className='h4 txt-b mrg-xxl mrg--b'>Stablecoins Overview</h4>
        <div>
          <StablecoinsMarketCap />
        </div>
      </div>
      <div id='stablecoins_whale_trends'>
        <h4 className='h4 txt-b mrg-s mrg--b'>Whale Trends</h4>
        <p className={cx(dashboardsStyles.description, 'body-2 mrg-xxl mrg--b')}>
          Recent activity of each stablecoins’ top 100 non-exchange addresses
        </p>
        <div>
          <CheckProPaywall>
            <WhaleTrendsList />
          </CheckProPaywall>
        </div>
      </div>
      <div id='stablecoins_flow_exchanges'>
        <h4 className='h4 txt-b mrg-s mrg--b'>Flow to Exchanges</h4>
        <p className={cx(dashboardsStyles.description, 'body-2 mrg-xxl mrg--b')}>
          Estimated level of interest to swap stablecoins for more volatile cryptocurrencies{' '}
        </p>
        <div>
          <CheckProPaywall>
            <FlowToExchangesList />
          </CheckProPaywall>
        </div>
      </div>
      <div id='stablecoins_top_exchanges'>
        <div>
          <TopExchangesTable isStablecoinPage selector={{ watchlistId: isStage ? 1115 : 3985 }} />
        </div>
      </div>
      <div id='stablecoins_net_exchange'>
        <h4 className='h4 txt-b mrg-xxl mrg--b'>Stablecoin Net Exchange Flow</h4>
        <div>
          <NetExchangeFlow />
        </div>
      </div>
      <div id='stablecoins_largest_transactions'>
        <h4 className='h4 txt-b mrg-s mrg--b'>Largest Transactions to Exchanges</h4>
        <p className={cx(dashboardsStyles.description, 'body-2 mrg-xxl mrg--b')}>
          Select an asset to view their largest transactions in the last 24 hours
        </p>
        <div>
          <StablecoinsTransactions {...getTimerangePeriod('24h')} />
        </div>
      </div>
      <div id='stablecoins_holder_distribution'>
        <h4 className='h4 txt-b mrg-s mrg--b'>Holder Distribution</h4>
        <p className={cx(dashboardsStyles.description, 'body-2 mrg-xxl mrg--b')}>
          Number of addresses sorted by their stablecoin balance
        </p>
        <div>
          <StablecoinHolderDistribution />
        </div>
      </div>

      <BlockWithRanges
        className={dashboardsStyles.rangePadding}
        title='Transaction Activity'
        tag='stablecoins_transaction_activity'
        el={TransactionsDominance}
        description='Total amount of stablecoins moving between network addresses'
      />
      <BlockWithRanges
        className={dashboardsStyles.rangePadding}
        title='Network Activity'
        tag='stablecoins_network_activity'
        description='On-chain indicators of stablecoin utility and adoption'
        el={NetworkActivity}
      />
    </main>
  </section>
)

export default withRenderQueueProvider(Stablecoins)
