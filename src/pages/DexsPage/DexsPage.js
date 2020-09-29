import React from 'react'
import cx from 'classnames'
import { Helmet } from 'react-helmet'
import CommonFooter from '../ProMetrics/ProMetricsFooter/CommonFooter'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import { DesktopOnly, MobileOnly } from '../../components/Responsive'
import { Block } from '../StablecoinsPage/StablecoinsPageStructure'
import ResearchesBlock from '../../components/ResearchesBlock'
import LeftPageNavigation from '../../components/LeftPageNavigation/LeftPageNavigation'
import SharePage from '../../components/SharePage/SharePage'
import styles from './DexsPage.module.scss'
import CurrentPageReport from '../../ducks/Stablecoins/StablecoinsReport/CurrentPageReport'
import DexTradesTotalNumber from '../../ducks/Dexs/DexTradesTotalNumber/DexTradesTotalNumber'
import DexTradesSegmentedByDEX from '../../ducks/Dexs/DexTradesSegmentedByDEX/DexTradesSegmentedByDEX'

const ANCHORS = {
  TotalNumber: {
    label: 'Total Number of DEX Trades',
    key: 'total-number'
  },
  TradesSegmented: {
    label: 'Trades segmented by DEX',
    key: 'segmented-trades'
  }
}

const DEX_PREDICATE = ({ name }) =>
  name.toLowerCase().indexOf('dex') >= 0 ||
  name.toLowerCase().indexOf('decentralized') >= 0

const DexsPage = ({ history }) => {
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
          <Block
            className={styles.firstBlock}
            tag={ANCHORS.TotalNumber.key}
            title='Total Number of DEX Trades'
          >
            <DexTradesTotalNumber />
          </Block>

          <Block
            tag={ANCHORS.TradesSegmented.key}
            title='Number of Trades Segmented by DEX'
          >
            <DexTradesSegmentedByDEX />
          </Block>
        </div>
      </div>

      <ResearchesBlock className={styles.researchers} />

      <CommonFooter />
    </div>
  )
}

export default DexsPage
