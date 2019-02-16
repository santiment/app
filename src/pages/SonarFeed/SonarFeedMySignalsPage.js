import React from 'react'
import SonarFeedRecommendations from './SonarFeedRecommendations'
import SonarFeedSignalsGrid from './SonarFeedSignalsGrid'

const SonarFeedMySignalsPage = ({ signals }) => {
  return (
    <div>
      {signals ? (
        <SonarFeedSignalsGrid signals={signals} />
      ) : (
        <SonarFeedRecommendations />
      )}
    </div>
  )
}

export default SonarFeedMySignalsPage
