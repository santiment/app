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
        const hasSignals = signals && signals.length
        return (
          <div>
            ` {isLoading && 'Loading...'}
            {isError && 'Error'}
            {!isLoading && !hasSignals && (
              <SonarFeedRecommendations showButton />
            )}
            {!isLoading && hasSignals && <SignalCardsGrid signals={signals} />}
          </div>
        )
      }}
    />
  )
}

export default SonarFeedMySignalsPage
