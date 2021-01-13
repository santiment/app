import React from 'react'
import cx from 'classnames'
import { Helmet } from 'react-helmet'
import gql from 'graphql-tag'
import { withRenderQueueProvider } from '../../components/DashboardMetricChart/renderQueue'
import { DesktopOnly } from '../../components/Responsive'
import { Block } from '../StablecoinsPage/StablecoinsPageStructure'
import LeftPageNavigation from '../../components/LeftPageNavigation/LeftPageNavigation'
import SharePage from '../../components/SharePage/SharePage'
import { useRestrictedInfo } from '../UniswapProtocolPage/hooks'
import DistributionBtcOnEth from '../../ducks/BtcDistribution/DistributionBtcOnEth/DistributionBtcOnEth'
import TotalBtcOnEth from '../../ducks/BtcDistribution/TotalBtcOnEth/TotalBtcOnEth'
import BtcStatistics from '../../ducks/BtcDistribution/BtcStatistics/BtcStatistics'
import DashboardLayout from '../../ducks/Dashboards/DashboardLayout'
import externalStyles from './../StablecoinsPage/StablecoinsPage.module.scss'
import styles from './ETH2Dashboard.module.scss'
import EthTotalStacked from '../../ducks/Eth2.0/TotalStacked/EthTotalStacked'

const ANCHORS = {
  TotalStacked: {
    label: 'Total Stacked',
    key: 'total-stacked'
  }
}

const METRIC_BOUNDARIES_QUERY = gql`
  query {
    getMetric(metric: "balance_per_owner") {
      metadata {
        isRestricted
      }
    }
  }
`

const ETH2Dashboard = () => {
  const isProChecking = useRestrictedInfo(METRIC_BOUNDARIES_QUERY)

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
            <h3 className={externalStyles.title}>ETH 2.0 - Santiment Data</h3>
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
            isPaywalActive={isProChecking}
            tag={ANCHORS.TotalStacked.key}
          >
            <EthTotalStacked />
          </Block>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default withRenderQueueProvider(ETH2Dashboard)
