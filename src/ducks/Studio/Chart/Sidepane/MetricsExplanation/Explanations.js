import React from 'react'
import MetricHighLow from '../../../../../components/MetricHighLow'
import { Metric } from '../../../../dataHub/metrics'
import styles from './Explanations.module.scss'

const RANGE_HOURS = [
  {
    range: '7d',
    hours: 24 * 7
  },
  {
    range: '1m',
    hours: 24 * 30
  },
  {
    range: '3m',
    hours: 24 * 90
  },
  {
    range: '6m',
    hours: 24 * 180
  }
]

const HighLow = props => (
  <MetricHighLow
    {...props}
    className={styles.highLow}
    rangeHours={RANGE_HOURS}
  />
)

export const Explanation = Object.assign(Object.create(null), {
  [Metric.social_volume_total.key]: ({ slug }) => (
    <HighLow slug={slug} metric='social_volume_total' label='Social Volume' />
  ),
  [Metric.social_dominance_total.key]: ({ slug }) => (
    <HighLow
      slug={slug}
      metric='social_dominance_total'
      label='Social Dominance'
    />
  ),
  [Metric.velocity.key]: ({ slug }) => (
    <HighLow slug={slug} metric='velocity' label='Token Velocity' />
  ),
  [Metric.daily_active_addresses.key]: ({ slug }) => (
    <HighLow slug={slug} metric='daily_active_addresses' label='DAA' />
  ),
  [Metric.network_growth.key]: ({ slug }) => (
    <HighLow slug={slug} metric='network_growth' label='Network Growth' />
  )
})

export default ({ metric, ...rest }) => {
  const Component = Explanation[metric.key]
  return Component ? <Component {...rest} /> : null
}
