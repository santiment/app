import React from 'react'
import SignalCardsGrid from '../../components/SignalCard/SignalCardsGrid'
import SignalMasterModalForm from '../../ducks/Signals/signalModal/SignalMasterModalForm'
import GetFeaturedUserTriggers from '../../ducks/Signals/common/getFeaturedUserTriggers'
import EmptySection from '../../components/EmptySection/EmptySection'
import PageLoader from '../../components/Loader/PageLoader'
import styles from './SonarFeedRecommendations.module.scss'

const SonarFeedRecommendations = ({
  showButton,
  description = 'Start to add signals you want to track or just interested in'
}) => {
  return (
    <div className={styles.wrapper}>
      <EmptySection className={styles.empty}>
        <div className={styles.description}>{description}</div>
        {showButton && <SignalMasterModalForm label='Add first signal' />}
      </EmptySection>
    </div>
  )
}

export const RecommendedSignals = () => (
  <GetFeaturedUserTriggers
    always
    render={({ signals, isLoading }) => {
      const hasSignals = signals && signals.length > 0

      if (isLoading) {
        return <PageLoader className={styles.loader} />
      }

      const mapToCardGridSignals = signals.map(({ trigger }) => trigger)

      return (
        hasSignals && (
          <>
            <h4 className={styles.subtitle}>Recommended for you</h4>
            <SignalCardsGrid
              isUserTheAuthor={false}
              signals={mapToCardGridSignals}
            />
          </>
        )
      )
    }}
  />
)

export default SonarFeedRecommendations
