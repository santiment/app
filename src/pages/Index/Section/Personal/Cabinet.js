import React from 'react'
import Accordion from '../../Accordion'
import { ProUpgradeBanner } from '../../../feed/GeneralFeed/MakeProSubscriptionCard/MakeProSubscriptionCard'
import { useUserSubscriptionStatus } from '../../../../stores/user/subscriptions'
import Reports from './Cabinet/Reports'
import CabinetTitle from './Cabinet/CabinetTitle/CabinetTitle'
import { ReportsImg, SheetsTemplatesImg } from './Cabinet/images'
import SheetsTemplates from './Cabinet/SheetsTemplates/SheetsTemplates'
import styles from './Cabinet.module.scss'

const cabinets = [
  {
    title: (
      <CabinetTitle
        img={ReportsImg}
        title={'Weekly Reports'}
        description={
          'Check out our latest premium reports about crypto activity in the market'
        }
      />
    ),
    content: (
      <div className={styles.reports}>
        <Reports />
      </div>
    )
  },
  {
    title: (
      <CabinetTitle
        img={<div className={styles.img}>{SheetsTemplatesImg}</div>}
        title={
          "Expand your comprehension of where markets are heading by using Santiment's PRO templates"
        }
        description={
          'Sansheets uses Santiment data to provide context on cryptocurrency price fluctuations, compare which assets have the best upside or lowest risk, and automatically update with precise bullish and bearish signals based on the metrics you rely on most'
        }
      />
    ),
    content: <SheetsTemplates />
  }
]

const Cabinet = () => {
  const { isPro, loading } = useUserSubscriptionStatus()

  if (loading) return null

  if (!isPro) {
    return <ProUpgradeBanner classes={styles} />
  }

  return cabinets.map(({ title, content }) => (
    <Accordion key={title} title={title} showArrow={false} classes={styles}>
      {content}
    </Accordion>
  ))
}

export default Cabinet
