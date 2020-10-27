import React from 'react'
import cx from 'classnames'
import { Helmet } from 'react-helmet'
import gql from 'graphql-tag'
import CommonFooter from '../ProMetrics/ProMetricsFooter/CommonFooter'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import { withRenderQueueProvider } from '../../components/DashboardMetricChart/renderQueue'
import { DesktopOnly, MobileOnly } from '../../components/Responsive'
import {
  BlockWithRanges,
  ProOnlyBlock as Block
} from '../StablecoinsPage/StablecoinsPageStructure'
import ResearchesBlock from '../../components/ResearchesBlock'
import LeftPageNavigation from '../../components/LeftPageNavigation/LeftPageNavigation'
import SharePage from '../../components/SharePage/SharePage'
import { useRestrictedInfo } from '../UniswapProtocolPage/hooks'
import DistributionBtcOnEth from '../../ducks/BtcDistribution/DistributionBtcOnEth/DistributionBtcOnEth'
import TotalBtcOnEth from '../../ducks/BtcDistribution/TotalBtcOnEth/TotalBtcOnEth'
import BtcStatistics from '../../ducks/BtcDistribution/BtcStatistics/BtcStatistics'
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

const BtcLockedPage = ({ history }) => {
  const isProChecking = useRestrictedInfo(METRIC_BOUNDARIES_QUERY)

  return (
    <div className={cx('page', externalStyles.container)}>
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

      <MobileOnly>
        <MobileHeader
          showBack={true}
          goBack={history.goBack}
          classes={externalStyles}
        />
      </MobileOnly>

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
          <BlockWithRanges
            className={cx(externalStyles.firstBlock, styles.firstBlock)}
            title='Total Supply'
            isPaywalActive={isProChecking}
            tag={ANCHORS.TotalSupply.key}
            el={BtcStatistics}
          />

          <Block
            title='Distribution of Bitcoin on Ethereum'
            isPaywalActive={isProChecking}
            tag={ANCHORS.Distribution.key}
          >
            <DistributionBtcOnEth />
          </Block>

          <Block
            title='Total BTC on Ethereum'
            isPaywalActive={isProChecking}
            tag={ANCHORS.TotalBtcOnEth.key}
          >
            <TotalBtcOnEth />
          </Block>
        </div>
      </div>

      <ResearchesBlock className={externalStyles.researchers} />

      <CommonFooter />
    </div>
  )
}

export default withRenderQueueProvider(BtcLockedPage)
