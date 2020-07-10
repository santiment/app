import React from 'react'
import GetSignals from '../../ducks/Signals/common/getSignals'
import PageLoader from '../../components/Loader/PageLoader'
import SignalCardsGrid from '../../components/SignalCard/SignalCardsGrid'
import SonarFeedRecommendations from './SonarFeedRecommendations'
import styles from './SonarFeedPage.module.scss'

const SignalsList = ({ filters, showRecommendations = true, showNew }) => {
  return (
    <GetSignals
      filters={filters}
      render={({ data: { signals = [], userId } = {}, isLoading }) => {
        const hasSignals = signals && signals.length > 0

        if (isLoading) {
          return <PageLoader className={styles.loader} />
        }

        return (
          <>
            {hasSignals ? (
              <SignalCardsGrid
                signals={signals}
                ownerId={userId}
                showNew={showNew}
              />
            ) : (
              showRecommendations && <SonarFeedRecommendations showButton />
            )}
          </>
        )
      }}
    />
  )
}

export default SignalsList
