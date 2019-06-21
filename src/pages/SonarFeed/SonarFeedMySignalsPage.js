import React from 'react'
import SonarFeedRecommendations from './SonarFeedRecommendations'
import SignalCardsGrid from '../../components/SignalCard/SignalCardsGrid'
import GetSignals from './../../ducks/Signals/GetSignals'

const SonarFeedMySignalsPage = ({ match, setLoadingSignalId }) => {
  let triggerId
  if (match && match.params && match.params.id) {
    triggerId = match.params.id
  }
  setLoadingSignalId && setLoadingSignalId(triggerId)

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
