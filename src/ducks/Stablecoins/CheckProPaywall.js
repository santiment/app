import React from 'react'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import MakeProSubscriptionCard from '../../pages/feed/GeneralFeed/MakeProSubscriptionCard/MakeProSubscriptionCard'

const CheckProPaywall = ({ children, shouldCheck }) => {
  const { isPro } = useUserSubscriptionStatus()

  if (!isPro && shouldCheck) {
    return <MakeProSubscriptionCard />
  }

  return children
}

export default CheckProPaywall
