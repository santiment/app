import React from 'react'
import Card from '../components/LabsCard'
import MobileHeader from '../components/MobileHeader/MobileHeader'
import { DesktopOnly, MobileOnly } from '../components/Responsive'
import styles from './Labs.module.scss'

const cards = [
  {
    title: 'Historical balance',
    description: (
      <div>
        Look up any wallet’s history of Ethereum and ERC20 holdings. Choose up
        to 5 assets for a detailed breakdown.
      </div>
    ),
    link: '/labs/balance',
    className: styles.historicalBalance,
    bgClassName: styles.historicalBalanceBg
  },
  {
    title: 'Santrends',
    description: (
      <div>
        Explore the social volume of any word/phrase on crypto social media over
        time.
      </div>
    ),
    link: '/labs/trends',
    className: styles.trends,
    bgClassName: styles.trendsBg
  },
  {
    title: 'Graphs',
    description: (
      <div>
        Our advanced on-chain, social and development metrics for all crypto
        projects in Santiment’s database.
      </div>
    ),
    href: 'https://graphs.santiment.net/',
    className: styles.dashboard,
    bgClassName: styles.dashboardBg
  }
  // {
  //   title: 'Buidl heroes',
  //   description: (
  //     <div>
  //       Compare the development activity of all Ethereum, EOS and DeFi projects
  //       over time.
  //     </div>
  //   ),
  //   link: '/labs/buidl-heroes',
  //   className: styles.dashboard,
  //   bgClassName: styles.buidlBg
  // }
]

const Labs = () => (
  <div className='page'>
    <DesktopOnly>
      <h1 className={styles.heading}>Labs</h1>
    </DesktopOnly>
    <MobileOnly>
      <MobileHeader title='Labs' />
    </MobileOnly>
    <div className={styles.flexRow}>
      {cards.map(card => (
        <Card key={card.title} {...card} />
      ))}
    </div>
  </div>
)

export default Labs
