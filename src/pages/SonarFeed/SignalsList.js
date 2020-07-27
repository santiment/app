import React from 'react'
import { connect } from 'react-redux'
import { useSignals } from '../../ducks/Signals/common/getSignals'
import PageLoader from '../../components/Loader/PageLoader'
import SignalCardsGrid from '../../components/SignalCard/SignalCardsGrid'
import SonarFeedRecommendations from './SonarFeedRecommendations'

const SignalsList = ({
  filters,
  userId,
  showRecommendations = true,
  showNew
}) => {
  const { data: signals = [], loading } = useSignals({ filters, skip: !userId })
  const hasSignals = signals && signals.length > 0

  if (loading) {
    return <PageLoader />
  }

  return (
    <>
      {hasSignals ? (
        <SignalCardsGrid signals={signals} ownerId={userId} showNew={showNew} />
      ) : (
        showRecommendations && <SonarFeedRecommendations showButton />
      )}
    </>
  )
}

const mapStateToProps = ({ user }) => ({
  userId: user && user.data ? user.data.id : undefined
})

export default connect(mapStateToProps)(SignalsList)
