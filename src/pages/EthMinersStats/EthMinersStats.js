import React from 'react'
import cx from 'classnames'
import { Helmet } from 'react-helmet'
import { withRenderQueueProvider } from '../../ducks/renderQueue/viewport'
import { DesktopOnly } from '../../components/Responsive'
import { Block } from '../StablecoinsPage/StablecoinsPageStructure'
import LeftPageNavigation from '../../components/LeftPageNavigation/LeftPageNavigation'
import SharePage from '../../components/SharePage/SharePage'
import DashboardLayout from '../../ducks/Dashboards/DashboardLayout'
import EthGasUsed from '../../ducks/EthMiners/EthGasUsed'
import MinerBalanceOverTime from '../../ducks/EthMiners/MinerBalanceOverTime'
import externalStyles from './../StablecoinsPage/StablecoinsPage.module.scss'
import styles from './EthMinersStats.module.scss'

const ANCHORS = {
  GasUsed: {
    label: 'ETH Gas Used',
    key: 'gas-used'
  },
  /* MiningPools: {
    label: 'Distribution Between Mining Pools',
    key: 'pools-distribution'
  }, */
  MinerBalanceOvertime: {
    label: 'Miner Balances Over Time',
    key: 'miner-balances'
  }
}

const EthMinersStats = () => {
  return (
    <DashboardLayout>
      <Helmet
        title={'ETH Miners Stats | Sanbase'}
        meta={[
          {
            property: 'og:title',
            content: 'ETH Miners Stats | Sanbase'
          },
          {
            property: 'og:description',
            content: 'ETH Miners Stats'
          }
        ]}
      />

      <div className={externalStyles.header}>
        <div className={cx(externalStyles.inner, externalStyles.content)}>
          <div className={externalStyles.pageDescription}>
            <h3 className={externalStyles.title}>Ethereum Miners Stats</h3>
            <div className={externalStyles.description}>
              The goal of these metrics is to see how Ethereum network mining
              has been changing over time, analyze the activity of mining pools
              and real miners and their influence on the market. These are
              definitions within these metrics:
              <div className={styles.block}>
                - A <b>mining pool</b> stands for an address, which gets a
                reward from the system.
              </div>
              <div className={styles.block}>
                - A <b>miner</b> is a person who performs the mining and gets a
                reward from a mining pool.
              </div>
              <div className={styles.block}>
                You can find a detailed description of these metrics{' '}
                <a
                  className={styles.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  href={
                    'https://partners.santiment.net/blog/new-eth-mining-metrics/'
                  }
                >
                  here
                </a>
                .
              </div>
            </div>
            <SharePage />
          </div>
        </div>
      </div>

      <div className={externalStyles.body}>
        <DesktopOnly>
          <LeftPageNavigation anchors={ANCHORS} />
        </DesktopOnly>

        <div className={externalStyles.inner}>
          <Block
            className={cx(externalStyles.firstBlock, styles.firstBlock)}
            title={ANCHORS.GasUsed.label}
            tag={ANCHORS.GasUsed.key}
          >
            <EthGasUsed />
          </Block>

          <Block
            title={ANCHORS.MinerBalanceOvertime.label}
            tag={ANCHORS.MinerBalanceOvertime.key}
          >
            <MinerBalanceOverTime />
          </Block>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default withRenderQueueProvider(EthMinersStats)
