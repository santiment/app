import React from 'react'
import cx from 'classnames'
import StoriesList from '../../components/Stories/StoriesList'
import Studio from '../../ducks/Studio'
import { parseUrl } from '../../ducks/Studio/url'
import withBoundaries from './withBoundaries'
import paywallBoundaries from './paywallBoundaries'

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
