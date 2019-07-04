import React from 'react'
import ExplanationTooltip from '../../../components/ExplanationTooltip/ExplanationTooltip'

const ConditionalWrapper = ({ isLimitReached, children }) => {
  return isLimitReached ? (
    <ExplanationTooltip text={isLimitReached ? 'max 5 tags' : null} offsetY={7}>
      {children}
    </ExplanationTooltip>
  ) : (
    children
  )
}

export default ConditionalWrapper
