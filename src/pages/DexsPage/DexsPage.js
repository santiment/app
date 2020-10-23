import React from 'react'
import cx from 'classnames'
import { Helmet } from 'react-helmet'
import gql from 'graphql-tag'
import CommonFooter from '../ProMetrics/ProMetricsFooter/CommonFooter'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import { withRenderQueueProvider } from '../../components/DashboardMetricChart/renderQueue'
import { DesktopOnly, MobileOnly } from '../../components/Responsive'
import { ProOnlyBlock as Block } from '../StablecoinsPage/StablecoinsPageStructure'
import ResearchesBlock from '../../components/ResearchesBlock'
import LeftPageNavigation from '../../components/LeftPageNavigation/LeftPageNavigation'
import SharePage from '../../components/SharePage/SharePage'
import CurrentPageReport from '../../ducks/Stablecoins/StablecoinsReport/CurrentPageReport'
import DexTradesTotalNumber, {
  DEX_AMOUNT_METRICS
} from '../../ducks/Dexs/DexTradesTotalNumber/DexTradesTotalNumber'
import DexTradesSegmentedByDEX, {
  DEX_VOLUME_METRICS
} from '../../ducks/Dexs/DexTradesSegmentedByDEX/DexTradesSegmentedByDEX'
import NumberOfTradesPerDex from '../../ducks/Dexs/NumberOfTradesPerDex/NumberOfTradesPerDex'
import { DEX_BY_USD } from '../../ducks/Dexs/PriceMeasurement/DexPriceMeasurement'
import { useRestrictedInfo } from '../UniswapProtocolPage/hooks'
import styles from './DexsPage.module.scss'

const ANCHORS = {
  VolumeSegmented: {
    label: 'Volume of DEXs Trades',
    key: 'trades-volume'
  },
  DexByVolumeTrades: {
    label: 'Volume of Trades by DEXs',
    key: 'dex-by-volume'
  },
  AmountSegmented: {
    label: 'Total Number of DEX Trades',
    key: 'trades-amount'
  },
  DexByAmountTrades: {
    label: 'Number of Trades Segmented by DEX',
    key: 'dex-by-amount'
  }
}

const DEX_PREDICATE = ({ name }) =>
  name.toLowerCase().indexOf('dex') >= 0 ||
  name.toLowerCase().indexOf('decentralized') >= 0

const METRIC_BOUNDARIES_QUERY = gql`
  query {
    getMetric(metric: "total_trade_amount_by_dex") {
      metadata {
        isRestricted
      }
    }
  }
`

const DexsPage = ({ history }) => {
  const isProChecking = useRestrictedInfo(METRIC_BOUNDARIES_QUERY)

  return (
    <div className={cx('page', styles.container)}>
      <Helmet
        title={'DEX Dashboard | Sanbase'}
        meta={[
          {
            property: 'og:title',
            content: 'DEX Dashboard | Sanbase'
          },
          {
            property: 'og:description',
            content: 'Real-time data on decentralized exchanges'
          }
        ]}
      />

      <MobileOnly>
        <MobileHeader
          showBack={true}
          goBack={history.goBack}
          classes={styles}
        />
      </MobileOnly>

      <div className={styles.header}>
        <div className={cx(styles.inner, styles.content)}>
          <div className={styles.pageDescription}>
            <h3 className={styles.title}>Decentralized Exchanges</h3>
            <div className={styles.description}>
              Track the on-chain activity on 18 decentralized exchanges, their
              daily volumes, number of trades and the usage rate of individual
              DEXes over time. This data is from the main decentralized
              exchanges namely Balancer, Bancor, Curve, dYdX, Etherdelta,
              Gnosis, IDEX, Kyber, Oasis, 0x, Tokenstore, Uniswap, AirSwap,
              DEX.Top and DDEX.
            </div>
            <SharePage />
          </div>

          <CurrentPageReport searchPredicate={DEX_PREDICATE} />
        </div>
      </div>

      <div className={styles.body}>
        <DesktopOnly>
          <LeftPageNavigation anchors={ANCHORS} />
        </DesktopOnly>

        <div className={styles.inner}>
          <Block
            className={styles.firstBlock}
            title='Volume of DEXs Trades'
            isPaywalActive={isProChecking}
            tag={ANCHORS.VolumeSegmented.key}
          >
            <DexTradesSegmentedByDEX />
          </Block>

          <Block
            tag={ANCHORS.DexByVolumeTrades.key}
            title='Volume of Trades by DEXs'
            isPaywalActive={isProChecking}
          >
            <NumberOfTradesPerDex metrics={DEX_VOLUME_METRICS} />
          </Block>

          <Block
            tag={ANCHORS.AmountSegmented.key}
            title='Total Number of DEX Trades'
            isPaywalActive={isProChecking}
          >
            <DexTradesTotalNumber measurement={DEX_BY_USD} />
          </Block>

          <Block
            tag={ANCHORS.DexByAmountTrades.key}
            title='Number of Trades Segmented by DEX'
            isPaywalActive={isProChecking}
          >
            <NumberOfTradesPerDex
              metrics={DEX_AMOUNT_METRICS}
              measurement={DEX_BY_USD}
            />
          </Block>
        </div>
      </div>

      <ResearchesBlock className={styles.researchers} />

      <CommonFooter />
    </div>
  )
}

export default withRenderQueueProvider(DexsPage)
