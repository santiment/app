import React from 'react'
import cx from 'classnames'
import Info from '../shared/Info/Info'
import Section from '../shared/Section/Section'
import BtcStatistics from '../../../../ducks/BtcDistribution/BtcStatistics/BtcStatistics'
import DistributionBtcOnEth from '../../../../ducks/BtcDistribution/DistributionBtcOnEth/DistributionBtcOnEth'
import TotalBtcOnEth from '../../../../ducks/BtcDistribution/TotalBtcOnEth/TotalBtcOnEth'
import CheckProPaywall from '../../../../ducks/Stablecoins/CheckProPaywall'
import { useRestrictedInfo } from '../../../UniswapProtocolPage/hooks'
import { withRenderQueueProvider } from '../../../../ducks/renderQueue/viewport'
import { METRIC_BOUNDARIES_QUERY } from './queries'
import dashboardsStyles from '../dashboards.module.scss'

const BtcLocked = () => {
  const isProChecking = useRestrictedInfo(METRIC_BOUNDARIES_QUERY)

  return (
    <section className={cx(dashboardsStyles.wrapper, 'column')}>
      <Info title='Bitcoin Locked on Ethereum' description='' />
      <main className={cx(dashboardsStyles.content, 'column')}>
        <Section id='btc_total_supply' title='Total Supply'>
          <div>
            <CheckProPaywall shouldCheck={isProChecking}>
              <BtcStatistics />
            </CheckProPaywall>
          </div>
        </Section>
        <Section id='btc_distribution' title='Distribution of Bitcoin on Ethereum'>
          <div>
            <DistributionBtcOnEth />
          </div>
        </Section>
        <Section id='btc_total_eth' title='Total BTC on Ethereum'>
          <div>
            <TotalBtcOnEth />
          </div>
        </Section>
      </main>
    </section>
  )
}

export default withRenderQueueProvider(BtcLocked)
