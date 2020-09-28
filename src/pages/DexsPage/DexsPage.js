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

const ANCHORS = {
  Overview: {
    label: 'Overview',
    key: 'overview'
  }
}

const DEX_PREDICATE = ({ name }) =>
  name.toLowerCase().indexOf('dex') >= 0 ||
  name.toLowerCase().indexOf('decentralized')

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
              assets.
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
            tag={ANCHORS.Overview.key}
            title='Overview'
          />
        </div>
      </div>

      <ResearchesBlock className={styles.researchers} />

      <CommonFooter />
    </div>
  )
}

export default DexsPage
