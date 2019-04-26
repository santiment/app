import React from 'react'
import { LineChart, Line } from 'recharts'
import { graphql } from 'react-apollo'
import { SOCIAL_GAINERS_LOSERS_STATUS_QUERY } from './gainersLosersQuery'
import { getIntervalByTimeRange } from '../../utils/dates'

const GainersLosersGraph = ({ socialGainersLosersStatus }) => (
  <LineChart
    width={300}
    height={50}
    data={socialGainersLosersStatus}
    margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
  >
    <Line
      type='monotone'
      dataKey='change'
      stroke='var(--grey-dark)'
      dot={null}
    />
  </LineChart>
)

export default graphql(SOCIAL_GAINERS_LOSERS_STATUS_QUERY, {
  options: ({ slug, timeWindow }) => {
    const { from, to } = getIntervalByTimeRange(timeWindow)
    return {
      variables: {
        slug,
        from: from.toISOString(),
        to: to.toISOString(),
        timeWindow
      }
    }
  },
  props: ({ data: { socialGainersLosersStatus = [] } }) => ({
    socialGainersLosersStatus
  })
})(GainersLosersGraph)
