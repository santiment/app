import React from 'react'
import Studio from '../../ducks/Studio'
import withBoundaries from './withBoundaries'
import { parseUrl } from '../../ducks/Studio/url'
import { Metric } from '../../ducks/dataHub/metrics'
import CtaJoinPopup from '../../components/CtaJoinPopup/CtaJoinPopup'

const DEFAULT_METRICS = [
  Metric.price_usd,
  Metric.social_volume_total,
  Metric.age_destroyed
]

export default withBoundaries(
  ({ settings, options, metrics, events, ...props }) => {
    const sharedState = parseUrl()
    Object.assign(sharedState.settings, settings)
    Object.assign(sharedState.options, options)
    sharedState.metrics = sharedState.metrics || metrics || DEFAULT_METRICS
    sharedState.events = sharedState.events || events

    return <Studio topSlot={<CtaJoinPopup />} {...props} {...sharedState} />
  }
)
