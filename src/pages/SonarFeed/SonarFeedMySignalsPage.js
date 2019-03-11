import React from 'react'
import SonarFeedRecommendations from './SonarFeedRecommendations'
import SignalCardsGrid from '../../components/SignalCard/SignalCardsGrid'
import GetSignals from './../../ducks/Signals/GetSignals'

const SonarFeedMySignalsPage = ({ signals }) => {
  return (
    <GetSignals
      render={({ signals, isError, isLoading }) => {
        return (
          <div>
            {isLoading ? 'Loading...' : ''}
            {isError ? 'Error' : ''}
            {signals && <SignalCardsGrid signals={signals} />}
            {!signals && <SonarFeedRecommendations />}
          </div>
        )
      }}
    />
  )
}

export default SonarFeedMySignalsPage
