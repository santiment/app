import React, { useState } from 'react'
import cx from 'classnames'
import { Helmet } from 'react-helmet'
import gql from 'graphql-tag'
import CommonFooter from '../ProMetrics/ProMetricsFooter/CommonFooter'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import { DesktopOnly, MobileOnly } from '../../components/Responsive'
import { Block } from '../StablecoinsPage/StablecoinsPageStructure'
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
import DexPriceMeasurement, {
  DEX_BY_USD
} from '../../ducks/Dexs/PriceMeasurement/DexPriceMeasurement'
import { useRestrictedInfo } from '../UniswapProtocolPage/hooks'
import styles from './DexsPage.module.scss'

const ANCHORS = {
  VolumeSegmented: {
    label: 'Volume of Trades Segmented by DEXs',
    key: 'trades-volume'
  },
  DexByVolumeTrades: {
    label: 'Share of DEXs by Volume of Trades',
    key: 'dex-by-volume'
  },
  AmountSegmented: {
    label: 'Total Amount of DEXs Trades',
    key: 'trades-amount'
  },
  DexByAmountTrades: {
    label: 'Share of DEXs by Amount of Trades',
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

  const [measurement, setMeasurement] = useState(DEX_BY_USD)

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
              Cryptocurrencies designed to minimize the volatility of the price
              of the stablecoin, relative to some "stable" asset or basket of
              assets. This data is from the main decentralized exchanges namely
              Balancer, Bancor, Curve, dYdX, Etherdelta, Gnosis, IDEX, Kyber,
              Oasis, 0x, Tokenstore, Uniswap, AirSwap, DEX.Top and DDEX.
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
          <Block className={cx(styles.firstBlock, styles.measurements)}>
            <DexPriceMeasurement
              onSelect={setMeasurement}
              defaultSelected={measurement}
            />
          </Block>

          <Block
            title='Volume of Trades Segmented by DEX'
            isPaywalActive={isProChecking}
            tag={ANCHORS.VolumeSegmented.key}
          >
            <DexTradesSegmentedByDEX measurement={measurement} />
          </Block>

          <Block
            tag={ANCHORS.DexByVolumeTrades.key}
            title='Share of DEXs by Volume of Trades'
            isPaywalActive={isProChecking}
          >
            <NumberOfTradesPerDex
              metrics={DEX_VOLUME_METRICS}
              measurement={measurement}
            />
          </Block>

          <Block
            tag={ANCHORS.AmountSegmented.key}
            title='Total Amount of DEX Trades'
            isPaywalActive={isProChecking}
          >
            <DexTradesTotalNumber measurement={measurement} />
          </Block>

          <Block
            tag={ANCHORS.DexByAmountTrades.key}
            title='Share of DEXs by Amount of Trades'
            isPaywalActive={isProChecking}
          >
            <NumberOfTradesPerDex
              metrics={DEX_AMOUNT_METRICS}
              measurement={measurement}
            />
          </Block>
        </div>
      </div>

      <ResearchesBlock className={styles.researchers} />

      <CommonFooter />
    </div>
  )
}

export default DexsPage
