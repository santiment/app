import React from 'react'
import Loader from '@santiment-network/ui/Loader/Loader'
import SonarFeedRecommendations from './SonarFeedRecommendations'
import SignalCardsGrid from '../../components/SignalCard/SignalCardsGrid'
import GetSignals from './../../ducks/Signals/GetSignals'
import styles from './SonarFeedPage.module.scss'

const SonarFeedMySignalsPage = ({ match, setLoadingSignalId }) => {
  let triggerId
  if (match && match.params && match.params.id) {
    triggerId = match.params.id
  }
  setLoadingSignalId && setLoadingSignalId(triggerId)

  return (
    <GetSignals
      render={({ signals, isError, isLoading }) => {
        const hasSignals = signals && signals.length > 0

        if (isLoading) {
          return <Loader className={styles.loader} />
        }

        return (
          <>
            {!hasSignals && <SonarFeedRecommendations showButton />}
            {hasSignals && <SignalCardsGrid signals={signals} />}
          </>
        )
      }}
    />
  )
}

export default SonarFeedMySignalsPage
