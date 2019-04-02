import React from 'react'
import { LineChart, Line, CartesianGrid } from 'recharts'
import { graphql } from 'react-apollo'
import { SOCIAL_GAINERS_LOSERS_STATUS_QUERY } from './gainersLosersQuery'
import { getTimeRangeByDuration } from '../../utils/utils'

const GainersLosersGraph = ({ socialGainersLosersStatus }) => (
  <LineChart
    width={300}
    height={50}
    data={socialGainersLosersStatus}
    margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
  >
    <CartesianGrid strokeDasharray='3 3' />
    <Line
      type='monotone'
      dataKey='change'
      stroke='var(--grey-dark)'
      dot={null}
    />
  </LineChart>
)

export default graphql(SOCIAL_GAINERS_LOSERS_STATUS_QUERY, {
  options: ({ slug, timeWindow }) => ({
    variables: {
      slug,
      ...getTimeRangeByDuration(timeWindow)
    }
  }),
  props: ({ data: { socialGainersLosersStatus = [] } }) => ({
    socialGainersLosersStatus
  })
})(GainersLosersGraph)
