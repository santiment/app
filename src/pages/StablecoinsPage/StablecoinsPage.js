import React from 'react'
import cx from 'classnames'
import { Helmet } from 'react-helmet'
import CommonFooter from '../ProMetrics/ProMetricsFooter/CommonFooter'
import StablecoinsMarketCap from '../../ducks/Stablecoins/StablecoinsMarketCap/StablecoinsMarketCap'
import StablecoinHolderDistribution from '../../ducks/Stablecoins/HolderDistribution/StablecoinHolderDistribution'
import StablecoinsTransactions from '../../ducks/Stablecoins/StablecoinsTransactions/StablecoinsTransactions'
import WhaleTrendsList from '../../ducks/Stablecoins/WhaleTrendsList/WhaleTrendsList'
import FlowToExchangesList from '../../ducks/Stablecoins/FlowToExchanges/FlowToExchangesList'
import TransactionsDominance from '../../ducks/Stablecoins/TransactionsDominance/TransactionsDominance'
import NetworkActivity, {
  ProjectsPreparedChart
} from '../../ducks/Stablecoins/NetworkActivity/NetworkActivity'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import { DesktopOnly, MobileOnly } from '../../components/Responsive'
import { getIntervalDates } from '../../ducks/Stablecoins/StablecoinsMarketCap/utils'
import { Block, BlockWithRanges } from './StablecoinsPageStructure'
import StablecoinsReport from '../../ducks/Stablecoins/StablecoinsReport/StablecoinsReport'
import ResearchesBlock from '../../components/ResearchesBlock'
import LeftPageNavigation from '../../components/LeftPageNavigation/LeftPageNavigation'
import styles from './StablecoinsPage.module.scss'

const ANCHORS = {
  Overview: {
    label: 'Stablecoins Overview',
    key: 'overview'
  },
  WhaleTrends: {
    label: 'Whale Trends',
    key: 'whale-trends'
  },
  FlowToExchanges: {
    label: 'Flow to Exchanges',
    key: 'flow-to-exchanges'
  },
  LargestTransactions: {
    label: 'Largest Transactions to Exchanges',
    key: 'largest-transactions'
  },
  HolderDistribution: {
    label: 'Holder Distribution',
    key: 'holder-distribution'
  },
  TransactionDominance: {
    label: 'Transaction Activity',
    key: 'transaction-activity'
  },
  NetworkActivity: {
    label: 'Network Activity',
    key: 'network-activity'
  }
}

const StablecoinsPage = ({ history, isDesktop }) => {
  return (
    <div className={cx('page', styles.container)}>
      <Helmet
        title={'Stablecoin Hub | Sanbase'}
        meta={[
          {
            property: 'og:title',
            content: 'Stablecoin Hub | Sanbase'
          },
          {
            property: 'og:description',
            content:
              'Real-time information on the biggest stablecoins’ market size, whale behavior, speculative demand and more.'
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
            <h3 className={styles.title}>Stablecoin Financial</h3>
            <div className={styles.description}>
              Real-time information on the biggest stablecoins’ market size,
              whale behavior, speculative demand and more.
            </div>
          </div>

          <StablecoinsReport />
        </div>
      </div>

      <div className={styles.body}>
        <DesktopOnly>
          <LeftPageNavigation anchors={ANCHORS} />
        </DesktopOnly>

        <div className={styles.inner}>
          <Block
            title='Stablecoins Market Cap'
            className={styles.firstBlock}
            tag={ANCHORS.Overview.key}
          >
            <StablecoinsMarketCap />
          </Block>

          <Block
            title='Stablecoin Whale Trends (last 30 days)'
            tag={ANCHORS.WhaleTrends.key}
            description='Recent activity of each stablecoins’ top 100 non-exchange addresses'
            isPaywalActive
          >
            <WhaleTrendsList />
          </Block>

          <Block
            tag={ANCHORS.FlowToExchanges.key}
            title='Stablecoins to Exchanges (last 24h)'
            description='Estimated level of interest to swap stablecoins for more volatile cryptocurrencies'
            isPaywalActive
          >
            <FlowToExchangesList />
          </Block>

          <Block
            tag={ANCHORS.LargestTransactions.key}
            title='Largest Stablecoin Transactions (last 24h)'
            description='Select an asset to view their largest transactions in the last 24 hours'
          >
            <StablecoinsTransactions {...getIntervalDates('24h')} />
          </Block>

          <Block
            tag={ANCHORS.HolderDistribution.key}
            title={isDesktop ? 'Stablecoin Holder Distribution' : null}
            description='Number of addresses sorted by their stablecoin balance'
          >
            <StablecoinHolderDistribution />
          </Block>

          <BlockWithRanges
            tag={ANCHORS.TransactionDominance.key}
            title='Transaction Activity'
            el={TransactionsDominance}
            description='Total amount of stablecoins moving between network addresses'
          />

          <BlockWithRanges
            tag={ANCHORS.NetworkActivity.key}
            title='Stablecoin Network Activity'
            description='On-chain indicators of stablecoin utility and adoption'
            el={NetworkActivity}
          />

          <div className={styles.block}>
            <ProjectsPreparedChart
              data={[
                convertToSlug('Chainlink (LINK)', 'chainlink', 329321412),
                convertToSlug(
                  'Crypto.com coin (CRO)',
                  'crypto-com-coin',
                  10936123
                ),
                convertToSlug('Ren (REN)', 'ren', 4328574),
                convertToSlug('Decentraland (MANA)', 'decentraland', 3068572),
                convertToSlug('CyberVein (CVT)', 'cybervein', 2722030),
                convertToSlug('OmiseGo (OMG)', 'omisego', 2357038),
                convertToSlug('Aave (LEND)', 'aave', 2152456),
                convertToSlug(
                  'Basic Attention Token (BAT)',
                  'basic-attention-token',
                  1852073
                ),
                convertToSlug(
                  'Paxos Standard (PAX)',
                  'paxos-standard',
                  1823382
                ),
                convertToSlug('Huobi Token (HT)', 'huobi-token', 1702875)
              ]}
              logScale={true}
            />

            <div className={styles.divider} />

            <ProjectsPreparedChart
              data={[
                convertToSlug('Zipper (ZIP)', 'zip', 35945),
                convertToSlug(
                  'Raiden Network (RDN)',
                  'raiden-network-token',
                  37224
                ),
                convertToSlug('Like (LIKE)', 'likecoin', 37898),
                convertToSlug('Dragonchain (DRGN)', 'dragonchain', 40054),
                convertToSlug('Unibright (UBT)', 'unibright', 41761),
                convertToSlug(
                  'Digix Gold Token (DGX)',
                  'digix-gold-token',
                  43221
                ),
                convertToSlug('Gnosis (GNO)', 'gnosis-gno', 45681),
                convertToSlug(
                  'Darwinia Network (RING)',
                  'darwinia-network',
                  46798
                ),
                convertToSlug('Quantstamp (QSP)', 'quantstamp', 47292),
                convertToSlug('Uquid Coin (UQC)', 'uquid_coin', 48634)
              ]}
              logScale={false}
            />

            <div className={styles.divider} />

            <ProjectsPreparedChart
              data={[
                convertToSlug('Sushi (SUSHI)', 'sushi', 42.45800133),
                convertToSlug('Revain (RVN)', 'ravencoin', 37.63525561),
                convertToSlug('Tether USDT', 'tether', 10.44027058),
                convertToSlug(
                  'Paxos Standard (PAX)',
                  'paxos-standard',
                  6.246489428
                ),
                convertToSlug('TrueUSD (TUSD)', 'trueusd', 5.571750337),
                convertToSlug('Ankr (ANKR)', 'ankr', 3.106246106),
                convertToSlug('Aave (LEND)', 'aave', 2.744941541),
                convertToSlug('Hex (HEX)', 'hex', 1.595294849),
                convertToSlug('0x (ZRX)', '0x', 1.19507457),
                convertToSlug(
                  'Golem (GNT)',
                  'golem-network-tokens',
                  1.192379948
                )
              ]}
              logScale={false}
            />

            <div className={styles.divider} />

            <ProjectsPreparedChart
              data={[
                convertToSlug(
                  'DFI.Money (YFII)',
                  'yearn-finance-ii',
                  20.22919424
                ),
                convertToSlug('HUSD (HUSD)', 'husd', 6.150894806),
                convertToSlug('Sushi (SUSHI)', 'sushi', 4.744016806),
                convertToSlug('Binace USD (BUSD)', 'binance-usd', 2.932775879),
                convertToSlug('Ren (REN)', 'ren', 1.473829977),
                convertToSlug('Tellor (TRB)', 'tellor', 1.246536979),
                convertToSlug('YF Link (YFL)', 'yflink', 0.9642297251),
                convertToSlug('Fantom (FTM)', 'fantom', 0.9027607271),
                convertToSlug(
                  'Paxos Standard (PAX)',
                  'paxos-standard',
                  0.8108980299
                ),
                convertToSlug('Ampleforth (AMPL)', 'ampleforth', 0.4814114298)
              ]}
              logScale={false}
            />

            <div className={styles.divider} />

            <ProjectsPreparedChart
              data={[
                convertToSlug(
                  'Multi-collateral Dai (DAI)',
                  'multi-collateral-dai',
                  -16.19601376
                ),
                convertToSlug('Swipe (SXP)', 'swipe', -2.242554375),
                convertToSlug('Aave (LEND)', 'aave', -1.808526948),
                convertToSlug('TrueUSD (TUSD)', 'trueusd', -1.694926717),
                convertToSlug(
                  'Synthetix (SNX)',
                  'synthetix-network-token',
                  -1.40981214
                ),
                convertToSlug(
                  'Band Protocol (BAND)',
                  'band-protocol',
                  -0.9091782731
                ),
                convertToSlug('DxChain (DX)', 'dxchain-token', -0.8429130423),
                convertToSlug(
                  'Decentraland (MANA)',
                  'decentraland',
                  -0.8371415127
                ),
                convertToSlug('Revain (RVN)', 'ravencoin', -0.6826694561),
                convertToSlug(
                  'Yearn Finance (YFI)',
                  'yearn-finance',
                  -0.6471655931
                )
              ]}
              logScale={false}
            />

            <div className={styles.divider} />

            <ProjectsPreparedChart
              data={[
                convertToSlug(
                  'DFI.Money (YFII)',
                  'yearn-finance-ii',
                  1.485080272
                ),
                convertToSlug('UMA (UMA)', 'uma', 1.109847684),
                convertToSlug(
                  'Nexus Mutual (NXM)',
                  'nexus-mutual',
                  0.9833616381
                ),
                convertToSlug('Melon (MLN)', 'melon', 0.6614902294),
                convertToSlug(
                  'Machine Xchange (MXC)',
                  'machine-xchange-coin',
                  0.5793182087
                ),
                convertToSlug('Sushi (SUSHI)', 'sushi', 0.5718338033),
                convertToSlug('Akropolis (AKRO)', 'akropolis', 0.5359122545),
                convertToSlug(
                  'Origin Protocol (OGN)',
                  'origin-protocol',
                  0.5166396057
                ),
                convertToSlug('Balancer (BAL)', 'balancer', 0.4747475174),
                convertToSlug('Fantom (FTM)', 'fantom', 0.4686678488)
              ]}
              logScale={false}
            />

            <div className={styles.divider} />

            <ProjectsPreparedChart
              data={[
                convertToSlug(
                  'DFI.Money (YFII)',
                  'yearn-finance-ii',
                  1.524809773
                ),
                convertToSlug('Hyperion (HYN)', 'hyperion', 0.8357187509),
                convertToSlug(
                  'Origin Protocol (OGN)',
                  'origin-protocol',
                  0.6242630419
                ),
                convertToSlug('Sushi (SUSHI)', 'sushi', 0.5718338033),
                convertToSlug('Livepeer (LPT)', 'livepeer', 0.3767345379),
                convertToSlug('Maker (MKR)', 'maker', 0.3401529145),
                convertToSlug('Crypto.com (MCO)', 'crypto-com', 0.3383368989),
                convertToSlug(
                  'Kyber Network (KNC)',
                  'kyber-network',
                  0.3372202423
                ),
                convertToSlug('Augur (REP)', 'augur', 0.2694265005),
                convertToSlug('Holo (HOLO)', 'holo', 0.2566812127)
              ]}
              logScale={false}
            />
          </div>
        </div>
      </div>

      <ResearchesBlock className={styles.researchers} />

      <CommonFooter />
    </div>
  )
}

const convertToSlug = (ticker, slug, value) => ({ slug, value, ticker })

export default StablecoinsPage
