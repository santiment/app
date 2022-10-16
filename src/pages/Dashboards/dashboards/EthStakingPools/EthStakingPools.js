import React from 'react'
import cx from 'classnames'
import Info from '../shared/Info/Info'
import EthStakingPools from '../../../../ducks/Eth2.0/EthStakingPools/EthStakingPools'
import DistributionBtcOnEth from './DistributionBtcOnEth/DistributionBtcOnEth'
import { withRenderQueueProvider } from '../../../../ducks/renderQueue/viewport'
import dashboardsStyles from '../dashboards.module.scss'

const EthStakingPoolsPage = () => (
  <section className={cx(dashboardsStyles.wrapper, 'column')}>
    <Info
      title='Ethereum Staking Pools'
      description='Information all about staking metrics and statistics for the new Ethereum 2.0.'
    />
    <main className={cx(dashboardsStyles.content, 'column')}>
      <div id='eth_validators'>
        <h4 className='h4 txt-b mrg-xxl mrg--b'>Number of Validators</h4>
        <div>
          <EthStakingPools />
        </div>
      </div>
      <div id='eth_staked_usd'>
        <h4 className='h4 txt-b mrg-xxl mrg--b'>Total Staked in USD</h4>
        <div>
          <EthStakingPools metric='eth2_staking_pools_usd' />
        </div>
      </div>
      <div id='eth_staking_pool_distributions'>
        <h4 className='h4 txt-b mrg-xxl mrg--b'>Staking Pool Distributions</h4>
        <div>
          <DistributionBtcOnEth metric='eth2_staking_pools_validators_count_over_time' />
        </div>
      </div>
      <div id='eth_staking_pool_distributions_delta'>
        <h4 className='h4 txt-b mrg-xxl mrg--b'>Staking Pool Distributions Delta</h4>
        <div>
          <DistributionBtcOnEth metric='eth2_staking_pools_validators_count_over_time_delta' />
        </div>
      </div>
    </main>
  </section>
)

export default withRenderQueueProvider(EthStakingPoolsPage)
