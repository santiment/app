import React from 'react'
import MetricHighLow from '../../../../components/MetricHighLow'
import styles from './Explanations.module.scss'

export const Explanation = Object.assign(Object.create(null), {
  socialVolume: ({ slug }) => (
    <MetricHighLow
      className={styles.highLow}
      slug={slug}
      metric='social_volume_total'
      label='Social Volume'
    />
  )
})

export default ({ metric, ...rest }) => {
  const Component = Explanation[metric.key]
  return Component ? <Component {...rest} /> : null
}
