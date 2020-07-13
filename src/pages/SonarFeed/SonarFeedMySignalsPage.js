import React from 'react'
import { RecommendedSignals } from './SonarFeedRecommendations'
import { mapQSToState } from '../../utils/utils'
import SignalsList from './SignalsList'

const SonarFeedMySignalsPage = props => {
  const filters = mapQSToState(props)

  return (
    <>
      <SignalsList filters={filters} {...props} />
      <RecommendedSignals />
    </>
  )
}

export default SonarFeedMySignalsPage
