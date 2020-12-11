import React, { useState } from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { Section } from './index'
import SocialGrid from '../../../components/SocialGrid'
import { INDEX_PAGE_GROUPS } from '../../../components/SocialGrid/topics'
import Santrends from '../../../components/Trends/Trends'
import styles from './Trends.module.scss'

const RECENT_SOCIAL_TRENDS = INDEX_PAGE_GROUPS[0]

const TabType = {
  SOCIAL_TRENDS: 'Social Trends',
  SANTRENDS: 'Santrends',
}

const TabTypeContent = {
  [TabType.SOCIAL_TRENDS]: {
    href: '/labs/trends/explore/',
    widget: (
      <>
        <h4 className={styles.title}>{RECENT_SOCIAL_TRENDS.title}</h4>
        <p className={styles.text}>{RECENT_SOCIAL_TRENDS.description}</p>
        <SocialGrid
          className={styles.socialgrid}
          topics={RECENT_SOCIAL_TRENDS.topics}
        />
      </>
    ),
    description:
      'Navigate visually through the noise. Similar to Google Trends, Santiment developed this search platform to explore how keywords and topics fluctuate over time. See the total social volume and social dominance among various crypto-related discussion forums, and compare directly to others. See what Google Trends is unable to see.',
  },

  [TabType.SANTRENDS]: {
    href: '/labs/trends/',
    widget: <Santrends className={styles.santrends} />,
    description: (
      <>
        We removed the noise even more. Get top 10 emerging trends for recent
        time intervals. Use this “hot list” to see what the “hottest” topics are
        in a ranked format.{' '}
        <i>
          Hint: if any of the coins (except BTC and ETH) make to the top 3 - the
          top might be near. Crowd is <b>“all in”</b>
        </i>
      </>
    ),
  },
}

const Tab = ({ tab, tabState }) => (
  <span
    className={cx(styles.tab, tab !== tabState[0] && styles.tab_inactive)}
    onClick={() => tabState[1](tab)}
  >
    {tab}
  </span>
)

const Tabs = ({ tabState }) => (
  <>
    <Tab tab={TabType.SOCIAL_TRENDS} tabState={tabState} />
    <Tab tab={TabType.SANTRENDS} tabState={tabState} />
  </>
)

const Trends = ({ ...props }) => {
  const tabState = useState(TabType.SOCIAL_TRENDS)
  const activeTab = tabState[0]
  const { href, description, widget } = TabTypeContent[activeTab]

  return (
    <Section title={<Tabs tabState={tabState} />} className={styles.wrapper}>
      <div className={styles.description}>{description}</div>
      <Link to={href} className={styles.link}>
        Start researching {activeTab}
      </Link>
      {widget}
    </Section>
  )
}

export default Trends
