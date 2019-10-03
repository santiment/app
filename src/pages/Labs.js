import React from 'react'
import Card from '../components/LabsCard'
import styles from './Labs.module.scss'

const cards = [
  {
    title: 'Historical balance',
    description: (
      <div>
        Look up any wallet’s history of Ethereum and ERC20 holdings.
        <br />
        <br />
        Choose up to 5 assets at a time for a detailed breakdown of the wallet’s
        balance over the last 15 months.
      </div>
    ),
    link: '/labs/balance',
    className: styles.historicalBalance,
    bgClassName: styles.historicalBalanceBg
  },
  {
    title: 'Social trends',
    description: (
      <div>
        Explore the social volume of ANY word/phrase on crypto social media over
        time.
        <br />
        <br />
        Results gathered from 100s of Telegram channels, crypto subreddits,
        discord groups, private trading chats and more.
      </div>
    ),
    link: '/labs/trends',
    className: styles.trends,
    bgClassName: styles.trendsBg
  },
  {
    title: 'SANgraphs',
    description: (
      <div>
        Our advanced on-chain, social and development metrics for all crypto
        projects in Santiment’s database.
        <br />
        <br />
        For those that want a full 360° overview of the crypto market and its
        biggest driving forces.
      </div>
    ),
    link: '/dashboards',
    className: styles.dashboard,
    bgClassName: styles.dashboardBg
  },
  {
    title: 'Sheets',
    description: (
      <div>
        Import our price, on-chain and other data points directly into Google
        Sheets. Keep track of all your positions, manage your risk and monitor
        your portfolio performance
      </div>
    ),
    link: '/sheets',
    className: styles.dashboard,
    bgClassName: styles.dashboardBg
  }
]

const Labs = () => (
  <div className='page'>
    <div className={styles.flexRow}>
      {cards.map(card => (
        <Card key={card.link} {...card} />
      ))}
    </div>
  </div>
)

export default Labs
