import React from 'react'
import Card from '../components/LabsCard'
import styles from './Labs.module.scss'

const cards = [
  {
    title: 'Historical balance',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
    link: '/labs/balance',
    className: styles.historicalBalance,
    bgClassName: styles.historicalBalanceBg
  },
  {
    title: 'Social trends',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
    link: '/labs/trends',
    className: styles.trends,
    bgClassName: styles.trendsBg
  },
  {
    title: 'Dashboards',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
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
