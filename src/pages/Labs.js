import React from 'react'
import Card from '../components/LabsCard'
import styles from './Labs.module.scss'

const cards = [
  {
    title: 'Historical balance',
    description:
      'look up any wallet’s history of Ethereum and ERC20 holdings. Choose up to 5 assets at a time for a detailed breakdown of the wallet’s balance over the last 15 months.',
    link: '/labs/balance',
    className: styles.historicalBalance,
    bgClassName: styles.historicalBalanceBg
  },
  {
    title: 'Social trends',
    description:
      'Explore the social volume of ANY word/phrase on crypto social media over time. Results gathered from 100s of Telegram channels, crypto subreddits, discord groups, private trading chats and more.',
    link: '/labs/trends',
    className: styles.trends,
    bgClassName: styles.trendsBg
  },
  {
    title: 'SANgraphs',
    description:
      'Our advanced on-chain, social and development metrics for all crypto projects in Santiment’s database. For those that want a full 360° overview of the crypto market and its biggest driving forces.',
    link: '/dashboards',
    className: styles.dashboard,
    bgClassName: styles.dashboardBg
  }
]

const Labs = () => (
  <div className='page'>
    <div className={styles.flexRow}>
      {cards.map(card => (
        <Card {...card} />
      ))}
    </div>
  </div>
)

export default Labs
