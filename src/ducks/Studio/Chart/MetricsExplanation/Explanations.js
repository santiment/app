import React from 'react'
import MetricHighLow from '../../../../components/MetricHighLow'
import styles from './Explanations.module.scss'

const RANGE_HOURS = [
  {
    range: '7d',
    hours: 24 * 7
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
  social_volume_total: ({ slug }) => (
    <HighLow slug={slug} metric='social_volume_total' label='Social Volume' />
  ),
  socialDominance: ({ slug }) => (
    <HighLow
      slug={slug}
      metric='social_dominance_total'
      label='Social Dominance'
    />
  ),
  velocity: ({ slug }) => (
    <HighLow slug={slug} metric='velocity' label='Token Velocity' />
  ),
  daily_active_addresses: ({ slug }) => (
    <HighLow slug={slug} metric='daily_active_addresses' label='Daily .A.A' />
  ),
  network_growth: ({ slug }) => (
    <HighLow slug={slug} metric='network_growth' label='Network Growth' />
  )
})

export default ({ metric, ...rest }) => {
  const Component = Explanation[metric.key]
  return Component ? <Component {...rest} /> : null
}
