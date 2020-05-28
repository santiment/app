import React from 'react'
import PageLoader from '../../components/Loader/PageLoader'
import SonarFeedRecommendations, {
  RecommendedSignals
} from './SonarFeedRecommendations'
import SignalCardsGrid from '../../components/SignalCard/SignalCardsGrid'
import GetSignals from '../../ducks/Signals/common/getSignals'
import styles from './SonarFeedPage.module.scss'
import { mapQSToState } from '../../utils/utils'

const SonarFeedMySignalsPage = props => {
  const filters = mapQSToState(props)
  return (
    <>
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
                <SignalCardsGrid signals={signals} ownerId={userId} />
              ) : (
                <SonarFeedRecommendations showButton />
              )}
            </>
          )
        }}
      />
      <RecommendedSignals />
    </>
  )
}

export default SonarFeedMySignalsPage
