import React from 'react'
import SignalCardsGrid from '../../components/SignalCard/SignalCardsGrid'
import EmptySection from '../../components/EmptySection/EmptySection'
import PageLoader from '../../components/Loader/PageLoader'
import AlertModal from '../../ducks/Alert/AlertModal'
import { useFeaturedUserTriggers } from '../../ducks/Signals/common/useFeaturedUserTriggers'
import { prepareAlertTitle } from '../../ducks/Signals/link/OpenSignalLink'
import styles from './SonarFeedRecommendations.module.scss'

const SonarFeedRecommendations = ({
  showButton,
  description = 'Start to add alerts you want to track or just interested in',
}) => {
  return (
    <div className={styles.wrapper}>
      <EmptySection className={styles.empty}>
        <div className={styles.description}>{description}</div>
        {showButton && (
          <AlertModal
            prepareAlertTitle={prepareAlertTitle}
            triggerButtonProps={{
              label: 'Add first alert',
              variant: 'fill',
              border: false,
            }}
          />
        )}
      </EmptySection>
    </div>
  )
}

export const RecommendedSignals = ({ showTitle = true, userId, shouldDisableActions }) => {
  const [signals, loading] = useFeaturedUserTriggers()

  if (!signals) {
    return null
  }

  if (loading) {
    return <PageLoader className={styles.loader} />
  }

  const mapped = signals.map(({ trigger, userId }) => ({
    ...trigger,
    userId: userId,
  }))

  const hasSignals = mapped && mapped.length > 0

  return (
    hasSignals && (
      <>
        {showTitle && <h4 className={styles.subtitle}>Recommended for you</h4>}
        <SignalCardsGrid
          userId={userId}
          signals={mapped}
          shouldDisableActions={shouldDisableActions}
        />
      </>
    )
  )
}

export default SonarFeedRecommendations
