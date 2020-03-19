import React from 'react'
import { Line } from 'recharts'

export const SOCIAL_TWITTER_INTERVALS = ['24h', '7d']
export const TWITTER_FOLLOWERS_TYPE = 'twitter_followers'

export const Submetrics = {
  [TWITTER_FOLLOWERS_TYPE]: SOCIAL_TWITTER_INTERVALS.map(interval => {
    return {
      key: `${TWITTER_FOLLOWERS_TYPE}_${interval}`,
      keyAlias: TWITTER_FOLLOWERS_TYPE,
      queryKey: TWITTER_FOLLOWERS_TYPE,
      category: 'Social',
      node: 'line',
      Component: Line,
      label: `Twitter Changes (${interval})`,
      shortLabel: `Twitter ${interval} changes`,
      description: (
        <>
          Shows the number changes of followers on the project's official
          Twitter account over time.
        </>
      ),
      reqMeta: {
        interval,
        transform: { type: 'changes' }
      }
    }
  })
}
