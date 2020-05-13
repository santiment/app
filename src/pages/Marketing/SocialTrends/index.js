import React, { useState } from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import SocialTrends from './SocialTrends'
import Trends from '../../../components/Trends/Trends'
import externalStyles from '../MarketingPage.module.scss'
import tabsStyles from '../IndexIndices/IndexIndices.module.scss'

const TABS = {
  SOCIAL_TOOL: 'Social tool',
  EMERGING_TRENDS: 'Emerging trends'
}

export default () => {
  const [tab, setTab] = useState(TABS.SOCIAL_TOOL)

  return (
    <>
      <div className={tabsStyles.header}>
        <div
          className={cx(
            externalStyles.subTitle,
            tabsStyles.title,
            tab === TABS.SOCIAL_TOOL && tabsStyles.active
          )}
          onClick={() => setTab(TABS.SOCIAL_TOOL)}
        >
          Social Tool
        </div>
        <div
          className={cx(
            tabsStyles.title,
            tabsStyles.your,
            tab === TABS.EMERGING_TRENDS && tabsStyles.active
          )}
          onClick={() => setTab(TABS.EMERGING_TRENDS)}
        >
          Emerging trends
        </div>
      </div>
      {tab === TABS.SOCIAL_TOOL && (
        <>
          <div className={externalStyles.description}>
            Our previous analysis indicates that ERC-20 coins tend to be less
            correlated to Ethereum during the bull market, and exhibit higher
            correlation during the bear market. This Index charts the
            correlation of ERC-20 market cap to the ETH market cap over the last
            3 months.
          </div>
          <Link to={'/labs/trends/explore/'} className={externalStyles.link}>
            Start researching Social Tool
          </Link>
          <SocialTrends />
        </>
      )}
      {tab === TABS.EMERGING_TRENDS && <Trends />}
    </>
  )
}
