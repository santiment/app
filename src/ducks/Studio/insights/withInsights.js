import React from 'react'
import { InsightsProvider } from './context'

export const withInsights = Component => props => (
  <InsightsProvider>
    <Component {...props} />
  </InsightsProvider>
)
