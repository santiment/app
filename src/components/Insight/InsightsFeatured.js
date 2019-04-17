import React from 'react'
import { graphql } from 'react-apollo'
import InsightCardSmall from './InsightCardSmall'
import { FEATURED_INSIGHTS_QUERY } from './../../queries/InsightsGQL'
import { creationDateSort } from '../../pages/Insights/utils'

const InsightsTrends = ({ data: { insights = [] }, ...props }) => {
  return insights
    .sort(creationDateSort)
    .map(({ id, ...insight }) => (
      <InsightCardSmall key={id} {...props} id={id} {...insight} />
    ))
}

export default graphql(FEATURED_INSIGHTS_QUERY, {
  fetchPolicy: 'cache-and-network'
})(InsightsTrends)
