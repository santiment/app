import React from 'react'
import cx from 'classnames'
import { Helmet } from 'react-helmet'
import { withRenderQueueProvider } from '../../ducks/renderQueue/viewport'
import { DesktopOnly } from '../../components/Responsive'
import { Block } from '../StablecoinsPage/StablecoinsPageStructure'
import LeftPageNavigation from '../../components/LeftPageNavigation/LeftPageNavigation'
import SharePage from '../../components/SharePage/SharePage'
import DashboardLayout from '../../ducks/Dashboards/DashboardLayout'
import EthTotalStaked from '../../ducks/Eth2.0/TotalStaked/EthTotalStaked'
import EthStakedAmountByLabel from '../../ducks/Eth2.0/EthStakedAmountByLabel/EthStakedAmountByLabel'
import EthStakedAddressesByLabel from '../../ducks/Eth2.0/EthStakedAddressesByLabel/EthStakedAddressesByLabel'
import EthUnlabeledStackerInflow from '../../ducks/Eth2.0/EthUnlabeledStackerInflow/EthUnlabeledStackerInflow'
import EthTopStakers from '../../ducks/Eth2.0/EthTopStakers/EthTopStakers'
import externalStyles from './../StablecoinsPage/StablecoinsPage.module.scss'
import styles from './ETH2Dashboard.module.scss'

const ANCHORS = {
  TotalStacked: {
    label: 'Total Stacked',
    key: 'total-stacked'
  },
  /*  StakingRoi: {
     label: 'Staking Roi',
     key: 'Staking Roi'
   }, */
  StakedAmount: {
    label: 'Staked amount by Label',
    key: 'staked-by-label'
  },
  StakedAddresses: {
    label: 'Number of Staked Addresses by Label',
    key: 'staked-addresses'
  },
  UnlabeledInflow: {
    label: 'Unlabeled Staker Inflow Sources',
    key: 'unlabeled-inflow'
  },
  TopStakers: {
    label: 'Top Stakers',
    key: 'top-stakers'
  }
}

const ETH2Dashboard = () => {
  return (
    <DashboardLayout>
      <Helmet
        title={'ETH 2.0 Dashboard | Sanbase'}
        meta={[
          {
            property: 'og:title',
            content: 'ETH 2.0 Dashboard | Sanbase'
          },
          {
            property: 'og:description',
            content: 'ETH 2.0 Dashboard'
          }
        ]}
      />

      <div className={externalStyles.header}>
        <div className={cx(externalStyles.inner, externalStyles.content)}>
          <div className={externalStyles.pageDescription}>
            <h3 className={externalStyles.title}>
              Ethereum 2.0 Staking Analytics
            </h3>
            <div className={externalStyles.description}>
              Information all about staking metrics and statistics for the new
              Ethereum 2.0
            </div>
            <SharePage />
          </div>
        </div>
      </div>

      <div className={externalStyles.body}>
        <DesktopOnly>
          <LeftPageNavigation anchors={ANCHORS} />
        </DesktopOnly>

        <div className={externalStyles.inner}>
          <Block
            className={cx(externalStyles.firstBlock, styles.firstBlock)}
            title={ANCHORS.TotalStacked.label}
            tag={ANCHORS.TotalStacked.key}
          >
            <EthTotalStaked />
          </Block>

          <Block
            title={ANCHORS.StakedAmount.label}
            tag={ANCHORS.StakedAmount.key}
          >
            <EthStakedAmountByLabel />
          </Block>

          <Block
            title={ANCHORS.StakedAddresses.label}
            tag={ANCHORS.StakedAddresses.key}
          >
            <EthStakedAddressesByLabel />
          </Block>

          <Block
            title={ANCHORS.UnlabeledInflow.label}
            tag={ANCHORS.UnlabeledInflow.key}
          >
            <EthUnlabeledStackerInflow />
          </Block>

          <Block title={ANCHORS.TopStakers.label} tag={ANCHORS.TopStakers.key}>
            <EthTopStakers />
          </Block>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default withRenderQueueProvider(ETH2Dashboard)
