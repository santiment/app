import React from 'react'
import SignalCardsGrid from '../../components/SignalCard/SignalCardsGrid'
import SignalMasterModalForm from '../../ducks/Signals/signalModal/SignalMasterModalForm'
import { useFeaturedUserTriggers } from '../../ducks/Signals/common/useFeaturedUserTriggers'
import EmptySection from '../../components/EmptySection/EmptySection'
import PageLoader from '../../components/Loader/PageLoader'
import styles from './SonarFeedRecommendations.module.scss'

const SonarFeedRecommendations = ({
  showButton,
  description = 'Start to add alerts you want to track or just interested in'
}) => {
  return (
    <div className={styles.wrapper}>
      <EmptySection className={styles.empty}>
        <div className={styles.description}>{description}</div>
        {showButton && <SignalMasterModalForm label='Add first alert' />}
      </EmptySection>
    </div>
  )
}

export const RecommendedSignals = ({ showTitle = true, showNew }) => {
  const [signals, loading] = useFeaturedUserTriggers()

  if (!signals) {
    return null
  }

  if (loading) {
    return <PageLoader className={styles.loader} />
  }

  const mapped = signals.map(({ trigger, userId }) => ({
    ...trigger,
    userId: userId
  }))

  const hasSignals = mapped && mapped.length > 0

  return (
    hasSignals && (
      <>
        {showTitle && <h4 className={styles.subtitle}>Recommended for you</h4>}
        <SignalCardsGrid signals={mapped} showNew={showNew} />
      </>
    )
  )
}

export default SonarFeedRecommendations
