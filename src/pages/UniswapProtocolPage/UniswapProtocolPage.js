import React from 'react'
import cx from 'classnames'
import { Helmet } from 'react-helmet'
import CommonFooter from '../ProMetrics/ProMetricsFooter/CommonFooter'
import MobileHeader from '../../components/MobileHeader/MobileHeader'
import { DesktopOnly, MobileOnly } from '../../components/Responsive'
import { Block } from '../StablecoinsPage/StablecoinsPageStructure'
import ResearchesBlock from '../../components/ResearchesBlock'
import LeftPageNavigation from '../../components/LeftPageNavigation/LeftPageNavigation'
import UniswapHistoricalBalance from '../../ducks/Studio/Tabs/UniswapHistoricalBalance/UniswapHistoricalBalance'
import styles from './UniswapProtocolPage.module.scss'

const ANCHORS = {
  Overview: {
    label: ' Uniswap Protocol',
    key: 'overview'
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

      <div className={styles.body}>
        <DesktopOnly>
          <LeftPageNavigation anchors={ANCHORS} />
        </DesktopOnly>

        <div className={styles.inner}>
          <Block
            title='Uniswap Protocol'
            className={styles.firstBlock}
            tag={ANCHORS.Overview.key}
          >
            Protocol Balance
          </Block>
        </div>
      </div>

      <ResearchesBlock className={styles.researchers} />

      <CommonFooter />
    </div>
  )
}

// <UniswapHistoricalBalance/>

export default UniswapProtocolPage
