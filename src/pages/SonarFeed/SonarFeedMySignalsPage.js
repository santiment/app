import React from 'react'
import { connect } from 'react-redux'
import PageLoader from '../../components/Loader/PageLoader'
import SonarFeedRecommendations from './SonarFeedRecommendations'
import SignalCardsGrid from '../../components/SignalCard/SignalCardsGrid'
import GetSignals from './../../ducks/Signals/GetSignals'
import { checkIsLoggedIn } from '../UserSelectors'
import styles from './SonarFeedPage.module.scss'

const SonarFeedMySignalsPage = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <SonarFeedRecommendations showButton />
  }

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

const mapStateToProps = state => {
  return {
    isLoggedIn: checkIsLoggedIn(state)
  }
}

export default connect(mapStateToProps)(SonarFeedMySignalsPage)
