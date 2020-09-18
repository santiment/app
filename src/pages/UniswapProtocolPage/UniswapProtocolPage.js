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
import styles from './UniswapProtocolPage.module.scss'

const ANCHORS = {
  Overview: {
    label: 'Uniswap Protocol',
    key: 'overview'
  },
  TopTransactions: {
    label: 'Top Token Transactions',
    key: 'top-transactions'
  },
  Claimers: {
    label: 'Claimers Widgets',
    key: 'claimers'
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
                  title={'Historical Balance'}
                  className={styles.balanceTitle}
                />
              }
              settings={{
                showAlertBtn: true
              }}
            />
          </Block>

          <Block
            title='Top Token Transactions, 30d'
            tag={ANCHORS.TopTransactions.key}
          >
            <UniswapTopTransactions />
          </Block>

          <Block
            tag={ANCHORS.Claimers.key}
            title='Claimers Widgets'
            description=''
          >
            <ClaimersWidgets />
          </Block>
        </div>
      </div>

      <ResearchesBlock className={styles.researchers} />

      <CommonFooter />
    </div>
  )
}

export default UniswapProtocolPage
