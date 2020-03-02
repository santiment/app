import React from 'react'
import MetricHighLow from '../../../components/MetricHighLow'

export const Explanation = Object.assign(Object.create(null), {
  socialVolume: ({ slug }) => {
    return (
      <MetricHighLow
        slug={slug}
        metric='social_volume_total'
        selectedIndex={1}
      />
    )
  }
})
