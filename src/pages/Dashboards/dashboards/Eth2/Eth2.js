import React from 'react'
import cx from 'classnames'
import EthStakingRoi from '../../../../ducks/Eth2.0/EthStakingRoi/EthStakingRoi'
import EthTotalStaked from '../../../../ducks/Eth2.0/TotalStaked/EthTotalStaked'
import EthStakedAmountByLabel from '../../../../ducks/Eth2.0/EthStakedAmountByLabel/EthStakedAmountByLabel'
import EthStakedAddressesByLabel from '../../../../ducks/Eth2.0/EthStakedAddressesByLabel/EthStakedAddressesByLabel'
import EthUnlabeledStackerInflow from '../../../../ducks/Eth2.0/EthUnlabeledStackerInflow/EthUnlabeledStackerInflow'
import EthTopStakers from '../../../../ducks/Eth2.0/EthTopStakers/EthTopStakers'
import Info from '../shared/Info/Info'
import Section from '../shared/Section/Section'
import { withRenderQueueProvider } from '../../../../ducks/renderQueue/viewport'
import dashboardsStyles from '../dashboards.module.scss'

const Eth2 = () => (
  <section className={cx(dashboardsStyles.wrapper, 'column')}>
    <Info title='Ethereum 2.0 Staking Analytics' description='' />
    <main className={cx(dashboardsStyles.content, 'column')}>
      <Section id='eth_2_roi' title='Staking Roi'>
        <div>
          <EthStakingRoi />
        </div>
      </Section>
      <Section id='eth_2_total_staked' title='Total Staked'>
        <div>
          <EthTotalStaked />
        </div>
      </Section>
      <Section id='eth_2_staked_amount_label' title='Staked amount by Label'>
        <div>
          <EthStakedAmountByLabel />
        </div>
      </Section>
      <Section id='eth_2_staked_addresses_label' title='Number of Staked Addresses by Label'>
        <div>
          <EthStakedAddressesByLabel />
        </div>
      </Section>
      <Section id='eth_2_staker_inflow' title='Unlabeled Staker Inflow Sources'>
        <div>
          <EthUnlabeledStackerInflow />
        </div>
      </Section>
      <Section id='eth_2_top_stakers' title='Top Stakers'>
        <div>
          <EthTopStakers />
        </div>
      </Section>
    </main>
  </section>
)

export default withRenderQueueProvider(Eth2)
