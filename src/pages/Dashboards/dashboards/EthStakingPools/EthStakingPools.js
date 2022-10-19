import React from 'react'
import cx from 'classnames'
import EthStakingPools from '../../../../ducks/Eth2.0/EthStakingPools/EthStakingPools'
import Info from '../shared/Info/Info'
import Section from '../shared/Section/Section'
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
      <Section id='eth_validators' title='Number of Validators'>
        <div>
          <EthStakingPools />
        </div>
      </Section>
      <Section id='eth_staked_usd' title='Total Staked in USD'>
        <div>
          <EthStakingPools metric='eth2_staking_pools_usd' />
        </div>
      </Section>
      <Section id='eth_staking_pool_distributions' title='Staking Pool Distributions'>
        <div>
          <DistributionBtcOnEth metric='eth2_staking_pools_validators_count_over_time' />
        </div>
      </Section>
      <Section id='eth_staking_pool_distributions_delta' title='Staking Pool Distributions Delta'>
        <div>
          <DistributionBtcOnEth metric='eth2_staking_pools_validators_count_over_time_delta' />
        </div>
      </Section>
    </main>
  </section>
)

export default withRenderQueueProvider(EthStakingPoolsPage)
