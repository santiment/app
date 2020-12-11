import React from 'react'
import { Link } from 'react-router-dom'
import Section from './index'
import SocialGrid from '../../../components/SocialGrid'
import { INDEX_PAGE_GROUPS } from '../../../components/SocialGrid/topics'
import styles from './Trends.module.scss'

const RECENT_SOCIAL_TRENDS = INDEX_PAGE_GROUPS[0]

const SocialTrends = () => {
  return (
    <>
      <h4 className={styles.title}>{RECENT_SOCIAL_TRENDS.title}</h4>
      <p className={styles.text}>{RECENT_SOCIAL_TRENDS.description}</p>
      <SocialGrid topics={RECENT_SOCIAL_TRENDS.topics} />
    </>
  )
}

const Trends = ({ ...props }) => {
  return (
    <Section title='Social Trends' className={styles.wrapper}>
      <div className={styles.description}>
        Navigate visually through the noise. Similar to Google Trends, Santiment
        developed this search platform to explore how keywords and topics
        fluctuate over time. See the total social volume and social dominance
        among various crypto-related discussion forums, and compare directly to
        others. See what Google Trends is unable to see.
      </div>
      <Link to={'/labs/trends/explore/'} className={styles.link}>
        Start researching Search Trends
      </Link>
      <SocialTrends />
    </Section>
  )
}

export default Trends
