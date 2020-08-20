import React from 'react'
import { WhaleAssets } from './utils'
import WhalesTrend from './WhalesTrend'
import styles from './WhaleTrendsList.module.scss'
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions'
import MakeProSubscriptionCard from '../../../pages/feed/GeneralFeed/MakeProSubscriptionCard/MakeProSubscriptionCard'

const WhaleTrendsList = () => {
  const { isPro } = useUserSubscriptionStatus()

  if (!isPro) {
    return <MakeProSubscriptionCard />
  }

  return (
    <div className={styles.container}>
      {WhaleAssets.map(item => (
        <WhalesTrend item={item} />
      ))}
    </div>
  )
}

export default WhaleTrendsList
