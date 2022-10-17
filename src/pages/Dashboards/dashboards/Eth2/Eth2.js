import React from 'react'
import cx from 'classnames'
import EthStakingRoi from '../../../../ducks/Eth2.0/EthStakingRoi/EthStakingRoi'
import EthTotalStaked from '../../../../ducks/Eth2.0/TotalStaked/EthTotalStaked'
import EthStakedAmountByLabel from '../../../../ducks/Eth2.0/EthStakedAmountByLabel/EthStakedAmountByLabel'
import EthStakedAddressesByLabel from '../../../../ducks/Eth2.0/EthStakedAddressesByLabel/EthStakedAddressesByLabel'
import EthUnlabeledStackerInflow from '../../../../ducks/Eth2.0/EthUnlabeledStackerInflow/EthUnlabeledStackerInflow'
import EthTopStakers from '../../../../ducks/Eth2.0/EthTopStakers/EthTopStakers'
import Info from '../shared/Info/Info'
import { withRenderQueueProvider } from '../../../../ducks/renderQueue/viewport'
import dashboardsStyles from '../dashboards.module.scss'

const Eth2 = () => (
  <section className={cx(dashboardsStyles.wrapper, 'column')}>
    <Info title='Ethereum 2.0 Staking Analytics' description='' />
    <main className={cx(dashboardsStyles.content, 'column')}>
      <div id='eth_2_roi'>
        <h4 className='h4 txt-b mrg-xxl mrg--b'>Staking Roi</h4>
        <div>
          <EthStakingRoi />
        </div>
      </div>
      <div id='eth_2_total_staked'>
        <h4 className='h4 txt-b mrg-xxl mrg--b'>Total Staked</h4>
        <div>
          <EthTotalStaked />
        </div>
      </div>
      <div id='eth_2_staked_amount_label'>
        <h4 className='h4 txt-b mrg-xxl mrg--b'>Staked amount by Label</h4>
        <div>
          <EthStakedAmountByLabel />
        </div>
      </div>
      <div id='eth_2_staked_addresses_label'>
        <h4 className='h4 txt-b mrg-xxl mrg--b'>Number of Staked Addresses by Label</h4>
        <div>
          <EthStakedAddressesByLabel />
        </div>
      </div>
      <div id='eth_2_staker_inflow'>
        <h4 className='h4 txt-b mrg-xxl mrg--b'>Unlabeled Staker Inflow Sources</h4>
        <div>
          <EthUnlabeledStackerInflow />
        </div>
      </div>
      <div id='eth_2_top_stakers'>
        <h4 className='h4 txt-b mrg-xxl mrg--b'>Top Stakers</h4>
        <div>
          <EthTopStakers />
        </div>
      </div>
    </main>
  </section>
)

export default withRenderQueueProvider(Eth2)
