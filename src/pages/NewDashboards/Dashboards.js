import React from 'react'
import cx from 'classnames'
import SocialTool from './dashboards-new/SocialTool/SocialTool'
import EthToken from './dashboards/ETHToken/ETHToken'
import Eth2 from './dashboards/ETH2/ETH2'
import Stablecoins from './dashboards/Stablecoins/Stablecoins'
import UniswapProtocol from './dashboards/UniswapProtocol/UniswapProtocol'
import Dex from './dashboards/Dex/Dex'
import BtcLocked from './dashboards/BTCLocked/BTCLocked'
import NFTTx from './dashboards/NFTTx/NFTTx'
import Nav from './Nav/Nav'
import { useNav } from './hooks'
import { DASHBOARDS_TITLES } from './constants'
import styles from './Dashboards.module.scss'

const Dashboards = (props) => {
  const navSettings = useNav()
  const { activeItem } = navSettings

  let content = null

  const { title } = activeItem
  if (title === DASHBOARDS_TITLES.SOCIAL_TOOL) content = <SocialTool {...props} />
  if (title === DASHBOARDS_TITLES.ETH_TOKEN_TRADING) content = <></>
  if (title === DASHBOARDS_TITLES.ETH_2_STAKING) content = <></>
  if (title === DASHBOARDS_TITLES.STABLECOINS) content = <></>
  if (title === DASHBOARDS_TITLES.UNISWAP_PROTOCOL) content = <></>
  if (title === DASHBOARDS_TITLES.DECENTRALIZED_EXCHANGES) content = <></>
  if (title === DASHBOARDS_TITLES.BTC_LOCKED) content = <></>
  if (title === DASHBOARDS_TITLES.NFT_INFLUENCERS_TRX) content = <></>

  return (
    <section className={cx(styles.wrapper, 'row')}>
      <Nav navSettings={navSettings} />
      <main className='fluid'>{content}</main>
    </section>
  )
}

export default Dashboards
