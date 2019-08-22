import React from 'react'
import PageLoader from '../../components/Loader/PageLoader'
import SonarFeedRecommendations from './SonarFeedRecommendations'
import SignalCardsGrid from '../../components/SignalCard/SignalCardsGrid'
import GetSignals from './../../ducks/Signals/GetSignals'
import styles from './SonarFeedPage.module.scss'

const SonarFeedMySignalsPage = () => {
  return (
    <GetSignals
      render={({ signals, isError, isLoading }) => {
        const hasSignals = signals && signals.length > 0

        if (isLoading) {
          return <PageLoader className={styles.loader} />
        }

        return (
          <>
            {hasSignals ? (
              <SignalCardsGrid signals={signals} />
            ) : (
              <SonarFeedRecommendations showButton />
            )}
          </>
        )
      }}
    />
  )
}

export default SonarFeedMySignalsPage
