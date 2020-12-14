import React from 'react'
import Accordion from '../../Accordion'
import { ProUpgradeBanner } from '../../../feed/GeneralFeed/MakeProSubscriptionCard/MakeProSubscriptionCard'
import { useUserSubscriptionStatus } from '../../../../stores/user/subscriptions'
import styles from './Cabinet.module.scss'

const cabinets = [
  {
    title: 'Title 1',
    content: 'Content 1'
  },
  {
    title: 'Title 2',
    content: 'Content 2'
  }
]

const Cabinet = () => {
  const { isPro, loading } = useUserSubscriptionStatus()

  if (loading) return null

  if (!isPro) {
    return <ProUpgradeBanner classes={styles} />
  }

  return cabinets.map(({ title, content }) => (
    <Accordion key={title} title={title}>
      {content}
    </Accordion>
  ))
}

export default Cabinet
