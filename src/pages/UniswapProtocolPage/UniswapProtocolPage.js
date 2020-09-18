import React from 'react'
import cx from 'classnames'
import { Helmet } from 'react-helmet'
import CommonFooter from '../ProMetrics/ProMetricsFooter/CommonFooter'
import ClaimersWidgets from '../../components/ClaimersWidgets'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import { DesktopOnly, MobileOnly } from '../../components/Responsive'
import { Block, BlockHeader } from '../StablecoinsPage/StablecoinsPageStructure'
import ResearchesBlock from '../../components/ResearchesBlock'
import LeftPageNavigation from '../../components/LeftPageNavigation/LeftPageNavigation'
import UniswapHistoricalBalance from '../../ducks/Studio/Tabs/UniswapHistoricalBalance/UniswapHistoricalBalance'
import UniswapTopTransactions from '../../ducks/UniswapProtocol/UniswapTopTransactions/UniswapTopTransactions'
import UniswapMetrics from '../../ducks/UniswapProtocol/UniswapMetrics/UniswapMetrics'
import UniswapPieChart from '../../ducks/UniswapProtocol/UniswapPieChart/UniswapPieChart'
import SharePage from '../../components/SharePage/SharePage'
import {
  FeesDistributionChart,
  FeesDistributionTitle
} from '../../ducks/Studio/FeesDistribution/FeesDistribution'
import styles from './UniswapProtocolPage.module.scss'

const ANCHORS = {
  Overview: {
    label: 'Uniswap Protocol',
    key: 'overview'
  },
  Exchanges: {
    label: 'How much went to exchanges?',
    key: 'how-much-on-exchanges'
  },
  TopTransactions: {
    label: 'Top Token Transactions',
    key: 'top-transactions'
  },
  Claimers: {
    label: 'UNI Token Claims',
    key: 'claimers'
  },
  FeesDistribution: {
    label: 'Fees Distribution',
    key: 'fees-distribution'
  }
}

const UniswapProtocolPage = ({ history, isDesktop }) => {
  return (
    <div className={cx('page', styles.container)}>
      <Helmet
        title={'Uniswap Protocol | Sanbase'}
        meta={[
          {
            property: 'og:title',
            content: ' Uniswap Protocol | Sanbase'
          },
          {
            property: 'og:description',
            content: 'Real-time information of Uniswap Protocol'
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
            <h3 className={styles.title}>Uniswap Protocol Dashboard</h3>

            <SharePage />
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <DesktopOnly>
          <LeftPageNavigation anchors={ANCHORS} />
        </DesktopOnly>

        <div className={styles.inner}>
          <Block className={styles.firstBlock} tag={ANCHORS.Overview.key}>
            <UniswapHistoricalBalance
              classes={{
                chart: styles.balanceChart,
                balanceChartHeader: styles.balanceChartHeader
              }}
              title={
                <BlockHeader
                  title={
                    'Uniswap: Token Distributor 0x090d4613473dee047c3f2706764f49e0821d256e'
                  }
                  className={styles.balanceTitle}
                />
              }
              settings={{
                showAlertBtn: true
              }}
            />
          </Block>

          <Block
            title='How much went to exchanges? How much on CEXes vs DEXes'
            description='From addresses that claimed UNI token'
            tag={ANCHORS.Exchanges.key}
          >
            <UniswapPieChart />
          </Block>

          <Block
            title='Top Token Transactions, 30d'
            tag={ANCHORS.TopTransactions.key}
          >
            <UniswapTopTransactions />
          </Block>

          <Block
            tag={ANCHORS.Claimers.key}
            title='UNI Token Claims'
            description=''
            isPaywalActive={true}
          >
            <UniswapMetrics />
            <ClaimersWidgets />
          </Block>

          <Block
            tag={ANCHORS.FeesDistribution.key}
            title={<FeesDistributionTitle />}
          >
            <FeesDistributionChart />
          </Block>
        </div>
      </div>

      <ResearchesBlock className={styles.researchers} />

      <CommonFooter />
    </div>
  )
}

export default UniswapProtocolPage
