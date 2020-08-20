import React from 'react'
import { ExchangesAssets } from './utils'
import FlowToExchanges from './FlowToExchanges'
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions'
import MakeProSubscriptionCard from '../../../pages/feed/GeneralFeed/MakeProSubscriptionCard/MakeProSubscriptionCard'
import styles from './FlowToExchangesList.module.scss'

const FlowToExchangesList = () => {
  const { isPro } = useUserSubscriptionStatus()

  if (!isPro) {
    return <MakeProSubscriptionCard />
  }

  return (
    <div className={styles.container}>
      {ExchangesAssets.map(item => (
        <FlowToExchanges item={item} />
      ))}
    </div>
  )
}

export default FlowToExchangesList
