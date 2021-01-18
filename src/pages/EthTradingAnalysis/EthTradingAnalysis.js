import React from 'react'
import cx from 'classnames'
import { Helmet } from 'react-helmet'
import { DesktopOnly } from '../../components/Responsive'
import { Block } from '../StablecoinsPage/StablecoinsPageStructure'
import LeftPageNavigation from '../../components/LeftPageNavigation/LeftPageNavigation'
import SharePage from '../../components/SharePage/SharePage'
import DashboardLayout from '../../ducks/Dashboards/DashboardLayout'
import VolumeOfEthTrades from '../../ducks/EthTradingAnalysis/VolumeOfEthTrades/VolumeOfEthTrades'
import LabelBalances from '../../ducks/Labels/LabelBalances/LabelBalances'
import { withRenderQueueProvider } from '../../ducks/renderQueue/viewport'
import { useRestrictedInfo } from '../UniswapProtocolPage/hooks'
import { LABEL_METRIC_BOUNDARIES_QUERY } from '../LabelsPage/LabelsPage'
import externalStyles from './../StablecoinsPage/StablecoinsPage.module.scss'
import styles from './EthTradingAnalysis.module.scss'

const ANCHORS = {
  VolumeAgainstEth: {
    label: 'Volume against ETH Based tokens (DEXs)',
    key: 'volume-against-eth'
  },
  VolumeAgainstUsd: {
    label: 'Volume against USD Based tokens (Stablecoins)',
    key: 'volume-against-usd'
  },
  TokenPrice: {
    label: 'Token Price against ETH Based Tokens segmented by DEXs',
    key: 'token-price'
  },

  ExchangeBalance: {
    key: 'exchange-balance',
    label: 'Exchange Balance'
  },
  LabelBalance: {
    key: 'label-balance',
    label: 'Label Balance'
  }
}

const ANCHORS_TREE = [
  {
    title: 'Trading',
    list: [
      ANCHORS.VolumeAgainstEth,
      ANCHORS.VolumeAgainstUsd,
      ANCHORS.TokenPrice
    ]
  },
  {
    title: 'Labeling',
    list: [ANCHORS.LabelBalance]
  }
]

const EthTradingAnalysis = () => {
  const isLabelsProChecking = useRestrictedInfo(LABEL_METRIC_BOUNDARIES_QUERY)

  return (
    <DashboardLayout>
      <Helmet
        title={'ETH Dashboard | Sanbase'}
        meta={[
          {
            property: 'og:title',
            content: 'ETH Token Trading Analysis | Sanbase'
          },
          {
            property: 'og:description',
            content: 'ETH Token Trading Analysis Dashboard'
          }
        ]}
      />

      <div className={externalStyles.header}>
        <div className={cx(externalStyles.inner, externalStyles.content)}>
          <div className={externalStyles.pageDescription}>
            <h3 className={cx(externalStyles.title, styles.title)}>
              ETH Token Trading Analysis{' '}
            </h3>
            <SharePage />
          </div>
        </div>
      </div>

      <div className={externalStyles.body}>
        <DesktopOnly>
          <LeftPageNavigation anchors={ANCHORS_TREE} />
        </DesktopOnly>

        <div className={externalStyles.inner}>
          <Block
            className={cx(externalStyles.firstBlock, styles.firstBlock)}
            title='Volume of Trades against ETH Based Tokens segmented by DEXs'
            tag={ANCHORS.VolumeAgainstEth.key}
          >
            <VolumeOfEthTrades metric='eth_trade_volume_by_token' />
          </Block>

          <Block
            title='Volume of Trades against USD Based Stablecoins segmented by DEXs'
            tag={ANCHORS.VolumeAgainstUsd.key}
          >
            <VolumeOfEthTrades metric='stablecoin_trade_volume_by_token' />
          </Block>

          <Block
            title='Token Price against ETH Based Tokens segmented by DEXs'
            tag={ANCHORS.TokenPrice.key}
          >
            <VolumeOfEthTrades metric='token_eth_price_by_dex_5m' />
          </Block>

          <Block
            title={ANCHORS.LabelBalance.label}
            tag={ANCHORS.LabelBalance.key}
            isPaywalActive={isLabelsProChecking}
          >
            <LabelBalances />
          </Block>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default withRenderQueueProvider(EthTradingAnalysis)
