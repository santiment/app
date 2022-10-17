import React from 'react'
import cx from 'classnames'
import SocialTool from './dashboards/SocialTool/SocialTool'
import EthStakingPoolsPage from './dashboards/EthStakingPools/EthStakingPools'
import EthTokenTrading from './dashboards/EthTokenTrading/EthTokenTrading'
import Nav from './Nav/Nav'
import { useNav } from './hooks'
import { DASHBOARDS_TITLES } from './constants'
import styles from './Dashboards.module.scss'

const Dashboards = (props) => {
  const { history, match, location } = props
  const navSettings = useNav({ history, match, location })
  const { activeItem } = navSettings

  let content = null

  if (activeItem) {
    const { title } = activeItem
    if (title === DASHBOARDS_TITLES.SOCIAL_TOOL) content = <SocialTool {...props} />
    if (title === DASHBOARDS_TITLES.ETH_TOKEN_TRADING) content = <EthTokenTrading {...props} />
    if (title === DASHBOARDS_TITLES.ETH_2_STAKING) content = <></>
    if (title === DASHBOARDS_TITLES.ETH_STAKING) content = <EthStakingPoolsPage {...props} />
    if (title === DASHBOARDS_TITLES.STABLECOINS) content = <></>
    if (title === DASHBOARDS_TITLES.UNISWAP_PROTOCOL) content = <></>
    if (title === DASHBOARDS_TITLES.DECENTRALIZED_EXCHANGES) content = <></>
    if (title === DASHBOARDS_TITLES.BTC_LOCKED) content = <></>
    if (title === DASHBOARDS_TITLES.NFT_INFLUENCERS_TRX) content = <></>
  }

  return (
    <section className={cx(styles.wrapper, 'row')}>
      <Nav navSettings={navSettings} />
      <main className='fluid'>{content}</main>
    </section>
  )
}

export default Dashboards
