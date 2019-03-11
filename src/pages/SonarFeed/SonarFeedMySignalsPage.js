import React from 'react'
import SonarFeedRecommendations from './SonarFeedRecommendations'
import SignalCardsGrid from '../../components/SignalCard/SignalCardsGrid'

const SonarFeedMySignalsPage = ({ signals }) => {
  return (
    <div>
      {signals ? (
        <SignalCardsGrid signals={signals} />
      ) : (
        <SonarFeedRecommendations />
      )}
    </div>
  )
}

export default SonarFeedMySignalsPage
