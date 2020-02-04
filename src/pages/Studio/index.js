import React from 'react'
import Studio from '../../ducks/Studio'
import withBoundaries from './withBoundaries'
import { parseUrl } from '../../ducks/Studio/url'

export default withBoundaries(
  ({ settings, options, metrics, events, ...props }) => {
    const sharedState = parseUrl()
    Object.assign(sharedState.settings, settings)
    Object.assign(sharedState.options, options)
    sharedState.metrics = sharedState.metrics || metrics
    sharedState.events = sharedState.events || events

    return <Studio {...props} {...sharedState} />
  }
)
