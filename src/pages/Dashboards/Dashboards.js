import React from 'react'
import cx from 'classnames'
import SocialTool from './dashboards/SocialTool/SocialTool'
import EthStakingPoolsPage from './dashboards/EthStakingPools/EthStakingPools'
import EthTokenTrading from './dashboards/EthTokenTrading/EthTokenTrading'
import Eth2 from './dashboards/Eth2/Eth2'
import Stablecoins from './dashboards/Stablecoins/Stablecoins'
import UniswapProtocol from './dashboards/Uniswap/Uniswap'
import DecentralizedExchanges from './dashboards/DecentralizedExchanges/DecentralizedExchanges'
import BtcLocked from './dashboards/BtcLocked/BtcLocked'
import NFT from './dashboards/NFT/NFT'
import Nav from './Nav/Nav'
import { useNav } from './hooks'
import { DASHBOARDS_TITLES } from './constants'
import styles from './Dashboards.module.scss'

const Dashboards = (props) => {
  const { history, match, location, isDesktop } = props
  const navSettings = useNav({ history, match, location })
  const { activeItem } = navSettings

  let content = null

  if (activeItem) {
    const { title } = activeItem

    if (title === DASHBOARDS_TITLES.SOCIAL_TOOL)
      content = <SocialTool {...props} isDesktop={isDesktop} />
    if (title === DASHBOARDS_TITLES.ETH_TOKEN_TRADING) content = <EthTokenTrading {...props} />
    if (title === DASHBOARDS_TITLES.ETH_2_STAKING) content = <Eth2 {...props} />
    if (title === DASHBOARDS_TITLES.ETH_STAKING) content = <EthStakingPoolsPage {...props} />
    if (title === DASHBOARDS_TITLES.STABLECOINS) content = <Stablecoins {...props} />
    if (title === DASHBOARDS_TITLES.UNISWAP_PROTOCOL) content = <UniswapProtocol {...props} />
    if (title === DASHBOARDS_TITLES.DECENTRALIZED_EXCHANGES)
      content = <DecentralizedExchanges {...props} />
    if (title === DASHBOARDS_TITLES.BTC_LOCKED) content = <BtcLocked {...props} />
    if (title === DASHBOARDS_TITLES.NFT_INFLUENCERS_TRX) content = <NFT {...props} />
  }

  return (
    <section className={cx(styles.wrapper, 'row')}>
      <Nav navSettings={navSettings} />
      <main className='fluid'>{content}</main>
    </section>
  )
}

export default Dashboards
