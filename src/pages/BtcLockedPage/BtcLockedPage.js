import React from 'react'
import cx from 'classnames'
import { Helmet } from 'react-helmet'
import gql from 'graphql-tag'
import { withRenderQueueProvider } from '../../ducks/renderQueue/viewport'
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
import styles from './BtcLockedPage.module.scss'

const ANCHORS = {
  TotalSupply: {
    label: 'Total Supply',
    key: 'total-supply'
  },
  Distribution: {
    label: 'Distribution of Bitcoin on Ethereum',
    key: 'distribution-on-eth'
  },
  TotalBtcOnEth: {
    label: 'Total BTC on Ethereum',
    key: 'total-on-eth'
  }
}

const METRIC_BOUNDARIES_QUERY = gql`
  query {
    getMetric(metric: "total_supply") {
      metadata {
        isRestricted
      }
    }
  }
`

const BtcLockedPage = () => {
  const isProChecking = useRestrictedInfo(METRIC_BOUNDARIES_QUERY)

  return (
    <DashboardLayout>
      <Helmet
        title={'BTC Dashboard | Sanbase'}
        meta={[
          {
            property: 'og:title',
            content: 'BTC Dashboard | Sanbase'
          },
          {
            property: 'og:description',
            content: 'Bitcoin Locked on Ethereum'
          }
        ]}
      />

      <div className={externalStyles.header}>
        <div className={cx(externalStyles.inner, externalStyles.content)}>
          <div className={externalStyles.pageDescription}>
            <h3 className={externalStyles.title}>Bitcoin Locked on Ethereum</h3>
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
            title='Total Supply'
            isPaywalActive={isProChecking}
            tag={ANCHORS.TotalSupply.key}
          >
            <BtcStatistics />
          </Block>

          <Block
            title='Distribution of Bitcoin on Ethereum'
            tag={ANCHORS.Distribution.key}
          >
            <DistributionBtcOnEth />
          </Block>

          <Block title='Total BTC on Ethereum' tag={ANCHORS.TotalBtcOnEth.key}>
            <TotalBtcOnEth />
          </Block>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default withRenderQueueProvider(BtcLockedPage)
